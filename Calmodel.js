import mongoose, { Schema } from "mongoose";

const caloriesSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User ' // Assuming you have a User model to link to
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    foodItem: {
        type: String,
        required: true
    },
    calories: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        default: ''
    }
});

const Calories = mongoose.model('Calories', caloriesSchema);

export default Calories;