const express = require('express');
var nodemailer = require('nodemailer');
const Insurance = require('../Model/insuranceModel')
const User = require('../Model/insuranceModel')
const route = express.Router();

var mail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: '************',
      pass: '************'
    }
  });

let user = new User();
let html = '<body> <div style="margin:50px;padding: 20px;border: 1px solid #ccc;border-radius: 25px;box-shadow: 10px 5px 2px 2px #ccc;background: lightcyan;"> <div style="margin-bottom: 10px">Dear <b>'+ user.name+'</b>,</div>  <div style="margin-bottom: 10px">Thank you for registering <b>'+ user.insuranceType+'</b></div> <div style="margin-bottom: 10px"> We have recieved your payment for <b>'+ user.totAmount +'</b> that you have paid <b>'+ user.startDate +'</b></div> <div style="margin-bottom: 10px">This is your current order:</div> <div style="margin-bottom: 10px">  <table style="border: 1px solid black;width: 100%; border-collapse: collapse">  <tr style="border: 1px solid black; background: darkcyan; color: white;">  <th style="border: 1px solid black;">Plan Type</th>  <th style="border: 1px solid black;"">Premium</th>  </tr>  <tr>   <td style="border: 1px solid black;">'+ user.planType +'</td>  <td style="border: 1px solid black;">'+ user.premium +'</td>  </tr> </table>  </div>  <div style="margin-bottom: 10px">   If you have any queries, kindly contact us with the email address <b>HILInsurance@hiLife.com</b>      </div>  <div style="margin-bottom: 10px">  We are looking forward for our continuous relationship.  </div> </div> </body>'
function mailOptionsList(from,to,subject,html){
  return mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html
  };
}

route.post('/sendMail',async(req,res)=>{
  const{id} = req.body;
  const result = await Insurance.findById(id);
  if(result!=null){
    user.name = result.name
    user.insuranceType = result.insuranceType
    user.totAmount = result.totAmount
    user.startDate=result.startDate
    user.planType=result.planType
    user.premium=result.premium
  }
  
  let due= Math.round(Number(user.totAmount)-Number(user.premium))
  mailOptions = mailOptionsList('******','********',
  'Payment confirmation mail','<body> <div style="margin:50px;padding: 20px;border: 1px solid #ccc;border-radius: 25px;box-shadow: 10px 5px 2px 2px #ccc;background: lightcyan;"> <div style="margin-bottom: 10px">Dear <b>'+ user.name+'</b>,</div>  <div style="margin-bottom: 10px">Thank you for registering <b>'+ user.insuranceType+'</b></div> <div style="margin-bottom: 10px"> We have recieved your payment for <b>$'+ user.premium +'</b> that you have paid <b>'+ user.startDate +'</b></div> <div style="margin-bottom: 10px">This is your current order:</div> <div style="margin-bottom: 10px">  <table style="border: 1px solid black;width: 100%; border-collapse: collapse">  <tr style="border: 1px solid black; background: darkcyan; color: white;">  <th style="border: 1px solid black;">Plan Type</th>  <th style="border: 1px solid black;"">Premium</th> <th style="border: 1px solid black;"">Insurance Type</th> <th style="border: 1px solid black;"">Due Amount</th>   </tr>  <tr>   <td style="border: 1px solid black;">'+ user.planType +'</td>  <td style="border: 1px solid black;">$'+ user.premium +'</td> <td style="border: 1px solid black;">'+ user.insuranceType +'</td> <td style="border: 1px solid black;">$'+ due +'</td> </tr> </table>  </div>  <div style="margin-bottom: 10px">   If you have any queries, kindly contact us with the email address <b>HILInsurance@hiLife.com</b>      </div>  <div style="margin-bottom: 10px">  We are looking forward for our continuous relationship.  </div> <div>Best Regards,</div><div>HiLife Insurance Team</div></div> </body>')
    mail.sendMail(mailOptions, function(error, info){
        if (error) {
          return error;
        } else {
          console.log('Email sent: ' + info.response);
          return res.json("EMail Sent");
        }
      });
});

async function fetchUserData(id){
  try{
    const result = await Insurance.findById(id);
    if(result!=null){
      user.name = result.name
      user.insuranceType = result.insuranceType
      user.totAmount = result.totAmount
      user.startDate=result.startDate
      user.planType=result.planType
      user.premium=result.premium
    }
    
}
catch(err){
    let insurance = new Insurance();
    insurance.responseMessage = "error while fetching the details";
    return res.json(insurance);
}
}


module.exports=route;