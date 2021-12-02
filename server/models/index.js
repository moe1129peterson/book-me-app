const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myFoodSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    author: {
        type: String,
        required: false
    },
    imgURL: {
        type: String,
        required: false
    }, 
    readLater: {
        type: Boolean, 
        required: false, 
        default: false
    },
    haveRead: {
        type: Boolean,
        required: false, 
        default: false
    }, 
    rating: {
        type: Number, 
        required: false
    }
}, { timestamps: true })

const Foods = mongoose.model('Foods', myFoodSchema)
module.exports = Foods