import express from "express";

import dbconnect from "./DB/mongoose_connection.js";

import authrouter from "./Routes/users.js";

import transactionRouter from "./Routes/Transection.js";

import cors from "cors";

import { user } from "./DB/model.js";


const app = express();

app.use(express.static('public'));

app.use(express.json());

app.use(cors());

await dbconnect();

const PORT = process.env.PORT || 7070

app.use("/user",authrouter)
app.use("/userTransection",transactionRouter)

app.get('/',  async(req,res)=>{
    try{
       res.send(await user.find());
       
    }
    catch(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    } 
  });
  
  

app.listen(PORT, () => {
    console.log(`Application Started on port ${PORT}`);
    });


