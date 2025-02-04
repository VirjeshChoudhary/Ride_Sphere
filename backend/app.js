const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const dbConnection = require('./db/db');
const cookieParser=require('cookie-parser');
const captainRoutes=require('./routes/captainRoutes');
const userRoutes=require('./routes/userRoutes');
const mapsRoutes=require('./routes/mapsRoutes')
const rideRoutes=require('./routes/rideRoutes');

// app.use(cors({
//     origin : ["*"],
//     methods : ['GET','POST','PUT','DELETE'],
// }));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
dbConnection();


app.use('/user',userRoutes);
app.use('/captain',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',rideRoutes);

app.get('/',(req,res)=>{
    res.send('Hello World');
})


module.exports=app;