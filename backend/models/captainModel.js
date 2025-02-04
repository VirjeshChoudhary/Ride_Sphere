const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
        match : [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: [ 6, 'Password must be at least 6 characters long' ],
    },

    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    vehicle: {  // Corrected spelling
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 5, 'Plate must be at least 5 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [ 1, 'Capacity must be at least 1 characters long' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'moto', 'auto']
        }
    },
    location: {
        ltd: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return token;
}
captainSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
const captainModel = mongoose.model('captain', captainSchema);
module.exports = captainModel;