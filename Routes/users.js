import express from "express";
import bcrypt from "bcrypt"
import { v4 } from "uuid"
import { user as usermodel } from "../DB/model.js";


const authrouter = express.Router();


authrouter.post('/userregister', async (req, res) => {
  try {

    const payload = req.body;
    const appUser = await usermodel.findOne({ email: payload.email });

    if (appUser) {
      res.status(409).send({ msg: 'User already exists' });
      return;
    }

    bcrypt.hash(payload.password, 10, async function (err, hash) {

      if (err) {
        res.status(500).send({ msg: 'Error in registering' });
        return;
      }

      const authUser = new usermodel({ ...payload, password: hash, user_Id: v4() });
      await authUser.save();

    })

    res.send({ msg: 'User Registered Successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Error in creating' });
  }
});


authrouter.post('/userlogin', async (req, res) => {
  try {

    const payload = req.body;

    const appUser = await usermodel.findOne({ email: payload.email });

    if (!appUser) {
      res.status(401).send({ msg: 'User not Found' });
      return;
    } else {
      bcrypt.compare(payload.password, appUser.password, (_err, result) => {
        if (!result) {
          res.status(401).send({ code: 0, msg: 'Invalid credentials' });
        } else {
          const resposneObj = appUser.toObject();
          delete resposneObj.password;
          res.send({ ...resposneObj });
        }
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: 'Login error' });
  }
});

authrouter.post('/password', async function (req, res) {
  try {
    
    const {email,newpassword,confirmpassword} =req.body
   
    const appUser = await usermodel.findOne({ email: email });

    if(appUser.email === email){
      if (newpassword === confirmpassword) {

        const hashedpassword = await bcrypt.hash(newpassword, 10)
 
        appUser.password=hashedpassword;
       
       appUser.save()
     
        return res.send({ msg: 'Password changed successfully' });
      } else {
        return res.status(401).send({ msg: 'Passwords do not match' });
      }
    }else{
      return res.status(401).send({ msg: 'user not found' });
    }
 
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: 'Error occurred while changing password' });
  }


});




export default authrouter;