//import mongoose to create a new schema
const mongoose = require('mongoose')

//create schema 
const FilmsListSchema = new mongoose.Schema({ 
    film:{
        type:String,
        required: true
    }
})

//export this schema 
module.exports = mongoose.model('films', FilmsListSchema)