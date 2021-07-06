const mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

const User_Data = new mongoose.Schema({
    _id:{
        type:String
    },
   responseCode : {
       type:Number
   },
   firstName : {
       type:String
   },
   lastName : {
       type:String
   },
   insuranceId : {
       type:Number
   },
   responseMessage : {
       type:String
   },
   dob : {
       type:String
   },
   email : {
       type:String
   }, 
   phoneNum : {
       type:Number
   }, 
   address : {
       type:String
   },
   alternatePhone : {
       type:Number
   },
   city : {
       type:String
   },
   state : {
       type:String
   },
   country : {
       type:String
   },
   zipCode : {
       type:Number
   },
   hash: String,
   salt: String
});


User_Data.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  };
  
  User_Data.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };
  
  User_Data.methods.generateJwt = function() {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime() / 1000),
    }, process.env.MY_SECRET_JWT); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };

module.exports = User = mongoose.model('User_Data',User_Data);