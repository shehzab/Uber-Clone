const captainModel = require('../models/captainModel');
const captainService = require('../services/captainService');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    const { fullname, email, password, vehicle } = req.body;

    const isCaptainExists = await captainModel.findOne({ email });
    if (isCaptainExists) {
        return res.status(400).json({
            success: false,
            message: 'Captain already exists'
        });
    }

    const hashedPassword = await captainModel.hashPassword(password); 

    const captain = await captainService.captainModel({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType
    });

    const token = captain.generateAuthToken();

    res.status(201).json({
        success: true,
        message: 'Captain registered successfully',
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        },
        token
    });

}
