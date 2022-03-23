const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/users')
const hairStyleModel = require('./models/hairstyle')
const makeUpModel = require('./models/makeup')


const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://bernard:bernard12345@cluster0.e2kl6.mongodb.net/tagsAPI?retryWrites=true&w=majority")

app.get('/',(req,res)=>{
    userModel.find({},(err,result)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.get('/hairstyle',(req,res)=>{
    hairStyleModel.find({},(err,result)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.get('/makeup',(req,res)=>{
    makeUpModel.find({},(err,result)=>{
        if (err) {
            res.json(err)
        }else{
            res.json(result)
        }
    })
})

app.post('/addHairStyle', async(req,res)=>{
    var user = req.body
    var newUser = new hairStyleModel(user)
    await newUser.save()

    res.send("User was successfully Added")
})

app.post('/addMakeup', async(req,res)=>{
    var user = req.body
    var newUser = new makeUpModel(user)
    await newUser.save()

    res.send("User was successfully Added")
})

app.use(express.static(path.join(__dirname,"/client/build")))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,"/client/build","index.html"))
})

// sever listening on port 3001
app.listen(process.env.PORT||3001,()=>{
    console.log("Server is Running")
})