import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async(req, res)=>{
   const {fullname, username ,email, password} = req.body
    if(
        [username , fullname, email , password].some((field)=> field?.trim === "")
    ){
        res.json(new ApiError(400, "All fields are required"))
    }
    const existedUser = await User.findOne({ username: username });

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }
    
   const user = await User.create({
        fullname  :fullname , 
        email  :email,
        password  : password, 
        username: username,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500 , "Something went wrong while registering the user") 
    }
    return res.status(201).json(
        new ApiResponse(200 ,createdUser, "User created successfully")
    )
})

// var nodemailer = require('nodemailer');
import nodemailer from 'nodemailer'

const mail = asyncHandler (async(req ,res)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dungeon0559@gmail.com',
          pass: 'vidhan_59'
        }
      });
      
      var mailOptions = {
        from: 'dungeon0559@gmail.com',
        to: 'vidhanshah59@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'hey there!!!'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json('Email sent: ' + info.response);
        }
      });
})
export {registerUser , mail}