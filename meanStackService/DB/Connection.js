const mongoose  = require('mongoose');

const URI = "mongodb://localhost:27017/Meanstack_Insurance";


const connectDB = async()=>{
  
  await  mongoose.connect(URI,{useNewUrlParser: true , useUnifiedTopology:true});
  console.log('db connected..');
}


module.exports = connectDB;