const mongoose = require('mongoose');
const insurance_Data = new mongoose.Schema({
    _id:{
        type:String
    },
    name:{
        type:String
    },
    planType:{
        type:String
    },
    years:{
        type:Number
    },
    startDate:{
        type:String
    },
    endDate:{
        type:String
    },
    totAmount:{
        type:String
    },
    premium:{
        type:String
    },
    insuranceType:{
        type:String
    },
    responseMessage:{
        type:String
    }
});
module.exports = Insurance = mongoose.model('insurance_Data',insurance_Data);