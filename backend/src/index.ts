import express from 'express';
import cors from 'cors';

const app=express();
const PORT=5000;

app.use(cors());

app.get("/health",(req,res)=>{

    res.json({name:"Keshav"});
})

app.listen(PORT,()=>{
    console.log(`Server is running on the port no ${PORT}`);
})