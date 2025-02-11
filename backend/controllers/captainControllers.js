const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistTokenModel');
const captainModel = require('../models/captainModel');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlready = await captainModel.findOne({ email });
    if (isCaptainAlready) {
        return res.status(400).json({ message: 'Captain already exist' });
    }
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');  
    if (!captain) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const token = captain.generateAuthToken();

    res.status(200).cookie('token', token).json({ token, captain });
}

module.exports.getProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {  
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistToken.create({ token });
    // token still present if they save it in local storage or some other user access it
    res.status(200).json({ message: 'Logout successfully' });
}