const mongoose = require('mongoose')

const makeUpSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    }
})

const makeUpModel = mongoose.model("makeUp", makeUpSchema)

module.exports = makeUpModel