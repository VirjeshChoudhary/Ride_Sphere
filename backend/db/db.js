const mongoose=require('mongoose');

const dbConnection=()=>{
    mongoose.connect(process.env.MONGOURI)
    .then(()=>{
        console.log('DB Connected');
    })
    .catch((err)=>{
        console.log("Invalid in Db connection",err);
    })
}
module.exports=dbConnection;