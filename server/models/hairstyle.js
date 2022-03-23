const mongoose = require('mongoose')

const hairStyleSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

const hairStyleModel = mongoose.model("hairstyle", hairStyleSchema)

module.exports = hairStyleModel