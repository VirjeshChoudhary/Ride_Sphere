const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const rideController=require('../controllers/rideController');
const authMiddleware=require('../middlewares/authMiddleware')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const Ride=require('../models/rideModel')


router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',authMiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authMiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    rideController.startRide
)

router.post('/end-ride',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

router.post('/make-payment',
    authMiddleware.authUser,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    async (req, res) => {
        try {
            const rideId = req.body.rideId;
            const ride = await Ride.findById(rideId).populate('captain').populate('user');
            if (!ride) {
                return res.status(400).json({ error: 'Ride not found' });
            }

            // Create a customer
            const customer = await stripe.customers.create({
                name: `${ride.user.fullname.firstname} ${ride.user.fullname.lastname}`,
                address: {
                    line1: 'Customer Address Line 1',
                    line2: 'Customer Address Line 2',
                    city: 'Customer City',
                    state: 'Customer State',
                    postal_code: 'Customer Postal Code',
                    country: 'IN',
                },
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'inr',
                            product_data: {
                                name: 'Ride Fare',
                            },
                            unit_amount: ride.fare * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                customer: customer.id, // Use the customer ID
                success_url: `${process.env.FRONTEND_URL}/success`,
                cancel_url: `${process.env.FRONTEND_URL}/cancel`,
            });
            res.status(200).json(session);
        } catch (error) {
            console.error('Error creating payment session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
);

module.exports=router;