const axios = require('axios');
const captainModel = require('../models/captainModel');

module.exports.getAddressCoordinate=async (address)=>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTimeALL=async(origin,destination)=>{
    if(!origin || !destination){
        throw new Error('Origin and Destination are required');
    }
    const apiKey=process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if(response.data.status=== "OK"){
            return response.data.rows[0].elements[0];
        }else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getSuggestions = async (input) => {
    if (!input) {
        throw new Error("Query is required");
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions
                .map(prediction => prediction.description)
                .filter(value => value);
        } else {
            throw new Error("Unable to fetch suggestions");
        }
    } catch (err) {
        console.error("Error fetching autocomplete suggestions:", err);
        throw err;
    }
}


module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });
    console.log(captains,"virjesh");
    
    return captains;


}


