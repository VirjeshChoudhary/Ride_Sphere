const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const dbConnection = require('./db/db');
const cookieParser=require('cookie-parser');
const captainRoutes=require('./routes/captainRoutes');
const userRoutes=require('./routes/userRoutes');

app.use(cors({
    origin : ['http://localhost:5173'],
    methods : ['GET','POST','PUT','DELETE'],
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
dbConnection();

app.use('/user',userRoutes);
app.use('/captain',captainRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
})


module.exports=app;