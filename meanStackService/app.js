const Express = require('express');   
const connectDB = require('./DB/Connection');
const loginApi = require('./API/loginApi'); 
const paymentApi = require('./API/paymentApi'); 
const insuranceApi = require('./API/insuranceApi');
const app = Express();
var jwt = require('express-jwt');
var passport = require('passport');
require('./passport');


connectDB();
app.use(Express.json({extended:false}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(passport.initialize());

var auth = jwt({
  secret: process.env.MY_SECRET_JWT,
  userProperty: 'payload',
  algorithms: ['HS256'] 
});

app.use('/login',loginApi);
app.use('/payment',paymentApi);
app.use('/insurance',insuranceApi);

//Listening to 3000
app.listen(3000);