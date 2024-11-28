const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    height: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    dailyCaloricIntake: {
        type: Number,
        required: true,
        min: 0
    },
    caloriesConsumed: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            calories: {
                type: Number,
                required: true,
                min: 0
            },
            mealType: {
                type: String,
                enum: ['breakfast', 'lunch', 'dinner', 'snack'],
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});


userSchema.methods.addCalorieEntry = function(calories, mealType) {
    this.caloriesConsumed.push({ calories, mealType });
    return this.save();
};

const User = mongoose.model('User ', userSchema);

module.exports = User;