const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: [true, 'Email Already exists'],
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid Email');
            }
        }
    },
    phone: {
        type: Number,
        // min: 11,
        // max: 11,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    }
});

// Creating Model:
const StuModel = new mongoose.model("Student", studentSchema);

module.exports = StuModel;