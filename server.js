const express =require('express');
const app=express();
const port=process.env.PORT||4200;
const endPoint=require('./routes/index');
app.use(express.json());
endPoint(app);


app.listen(port,()=>console.log('Working on'+port));