import express from "express";
import auth_control from "./../controller/auth_controller.js";

const hook_auth=express.Router();

hook_auth.all("*",(req,res,next)=>{

    const cookieData=req.cookies;

    next();
});

export default hook_auth;