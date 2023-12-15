import mongoose from "mongoose";

const  userschema = new mongoose.Schema({

   user_Id:{
    type:String,
    required:true
   },
   Name:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   password:{
    type:String,
    required:true
   }
}
);

const user = mongoose.model("users",userschema)

const transactionSchema = new mongoose.Schema({
  user_Id:{
    type:String
  },
   Name: {
     type:String
   },
   title: {
     type: String,
     required: true
   },
   amount: {
     type: Number,
     required: true
   },
   optionId: {
     type: String,
     required: true
   },
   date: {
    type: Date, 
    default: Date.now, 
  },
 });
 
 const Transaction = mongoose.model("transactions", transactionSchema);

export {user, Transaction} ;
