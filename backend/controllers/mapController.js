const mapService=require('../services/mapsService');
const { validationResult } = require('express-validator');

module.exports.getCoordinates=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {address} = req.query;
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json( coordinates );
    } catch (error) {
        res.status(404).json({message : "Coordinate not found "})
    }
}


module.exports.getDistanceTime=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {origin,destination} = req.query;
      
        const distanceTime = await mapService.getDistanceTimeALL(origin,destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(404).json({message : "Distance time data not found "})
    }
}

module.exports.getSuggestion=async(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const {input} = req.query;
        const suggestion = await mapService.getSuggestions(input);
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(404).json({message : "Suggestion didin't come "})
    }
}