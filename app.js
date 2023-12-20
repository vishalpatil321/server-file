const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const server = express();


main().catch((err => console.log(err)));

async function main(){
    await mongoose.connect('mongodb://localhost:27017/kristina_web');
    console.log("db connected");
}

const userSchema = new mongoose.Schema({
    name : String,
    lname : String,
    email : String,
    msg : String,
});

const User = mongoose.model('User',userSchema);

server.use(cors());
server.use(bodyParser.json());

server.post('/kristina',async(req,res)=>{
    let user = new User();
    user.name = req.body.name;
    user.lname = req.body.lname;
    user.email = req.body.email;
    user.msg = req.body.msg;
    const doc = await user.save();

    console.log(doc)
    res.json(doc);
})

server.listen(8080,()=>{
    console.log("server is running")
})