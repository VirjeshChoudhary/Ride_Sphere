const express=require('express')
const router=express.Router();
const authMiddleware=require('../middlewares/authMiddleware');
const {query}=require('express-validator')
const mapController=require('../controllers/mapController')

router.get('/get-coordinates',
    query('address').isString().isLength({min:3})
    ,authMiddleware.authUser,mapController.getCoordinates
);

router.get('/get-distance-time',
    [query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min : 3})]
    ,authMiddleware.authUser,mapController.getDistanceTime
);

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,mapController.getSuggestion
);




module.exports=router;