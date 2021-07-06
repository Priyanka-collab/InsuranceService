require('dotenv').config();
var passport = require('passport');
const express = require('express');
const User = require('../model/loginModel');
const route = express.Router();


route.post('/save',async(req,res)=>{
    const{email,password,firstname,lastname,dob,phoneNum,address,alternatePhone,city,state,country,zipCode} = req.body;
    let user = new User();
    user._id=email;
    user.firstName=firstname;
    user.lastName=lastname;
    user.email=email;
    user.dob=dob;
    user.phoneNum=phoneNum;
    user.address=address;
    user.alternatePhone=alternatePhone;
    user.city=city;
    user.state=state;
    user.country=country;
    user.zipCode=zipCode;
    user.setPassword(password);
  try{
    await user.save();
    res.json(user);
    }
    catch(err){
        const duplicateKeyinMongoDb = err.name === 'MongoError' && err.code === 11000;
        if ( duplicateKeyinMongoDb ) {
            let userModel = new User();
            userModel.responseMessage = "Duplicate Key, The same key has alreaday been saved"
          return res     
            .json(userModel);
        }
    }
});

route.post('/fetch', async(req,res)=>{
    const{id} = req.body;
    try{
        const result = await User.findById(id)
        return res.json(result);
    }
    catch(err){
        let userModel = new User();
        userModel.responseMessage = "Error occured, Kindly restart the server once"
        return res.json(userModel)
    }
});

route.post('/auth',async(req,res)=>{
    passport.authenticate('local', function(err, user, info){
        var token;
    
        // If Passport throws/catches an error
        if (err) {
          res.status(404).json(err);
          return;
        }
        
        // If a user is found
        if(user){
          token = user.generateJwt();
          res.status(200);
          res.json({
            "token" : token,
            "responseMessage":"Success"
          });
        } else {
          // If user is not found
          res.status(401).json(info);
        }
      })(req, res);  

    // const{username,password} = req.body;
    // try{
    // const result = await User.findById(username)
    // if(result!=null){
    // if(result._id === username && result.password === password){
    //     result.responseMessage = "Authenticated";
    // }
    // else{
    //     result.responseMessage = "Not Authenticated";
    // }    
    // return res.json(result);
    // }
    // else {
    //     let userModel = new User();
    //     userModel.responseMessage = "User doesn't exists"
    //     return res.json(userModel)
    // }
    // }
    // catch(err){
    //     let userModel = new User();
    //     userModel.responseMessage = "Error occured, Kindly restart the server once"
    //     return res.json(userModel)
    // }
    
});

module.exports=route;