const express = require('express');
const route = express.Router();
const Insurance = require('../Model/insuranceModel')

route.post('/add',async(req,res)=>{
    const{id,name,planType,years,startDate,endDate,totAmount,premium,insuranceType} = req.body;
    let insurance = {};
    insurance._id=id;
    insurance.name=name;
    insurance.planType=planType;
    insurance.years = years;
    insurance.startDate=startDate;
    insurance.endDate=endDate;
    insurance.totAmount=totAmount;
    insurance.premium=premium;
    insurance.insuranceType=insuranceType;
    try{
        let insuranceModel = new Insurance(insurance);
        const result = await Insurance.findByIdAndUpdate(insuranceModel);
        if(result!=null)
            insuranceModel.responseMessage = "Success"
        else{
            await insuranceModel.save();
            insuranceModel.responseMessage = "Success"
        }
        return res.json(insuranceModel);
        }
        catch(err){
            const duplicateKeyinMongoDb = err.name === 'MongoError' && err.code === 11000;
            if ( duplicateKeyinMongoDb ) {
                let insuranceModel = new User();
                insuranceModel.responseMessage = "Duplicate Key, The same key has alreaday been saved"
              return res.json(insuranceModel);
            }
        }
});

route.post('/check',async(req,res)=>{
    const{id}=req.body;
    try{
        const result = await Insurance.findById(id);
        return res.json(result);
    }
    catch(err){
        let insurance = new Insurance();
        insurance.responseMessage = "error while fetching the details";
        return res.json(insurance);
    }

});

route.post('/remove',async(req,res)=>{
    const{id}=req.body;
    try{
        const result = await Insurance.findByIdAndRemove(id);
        result.responseMessage = "deleted";
        return res.json(result)
    }
    catch(err){
        let insurance = new Insurance();
        insurance.responseMessage = "error while deleting the details";
        return res.json(insurance);
    }
})
route.post('/checkForActivePlans', async(req,res)=>{
    const{id1,id2,id3,id4}=req.body;
    const types = [id1,id2,id3,id4];
    let data = [];
    try{
        for(const type of types){
        let result = await Insurance.findById(type);
        if(result!=null){
            data.push(result);
        }
    }
    if(data.length==0){
        let insurance = new Insurance();
        insurance.responseMessage = "No active records";
        return res.json(insurance);
    }
    return res.json(data);
    }
    catch(err){
        let insurance = new Insurance();
        insurance.responseMessage = "error while fetching the details";
        return res.json(insurance);
    }
});

module.exports=route;