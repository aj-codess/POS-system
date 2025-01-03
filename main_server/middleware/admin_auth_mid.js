import express from "express";
import auth_control from "./../controller/auth_controller.js";

const admin_auth=express.Router();

admin_auth.all("*",(req,res,next)=>{

    if(!req.cookies && req.url.includes("login")){

        next();

    };

    const cookieData=req.cookies;

    const isValid_obj=auth_control.cookie_validity(cookieData);

    if(isValid_obj.isValid == true){

        req.id=isValid_obj.token_id;

        next();
    };

    return res.status(403).json({ message: `Missing required cookie! Re-login`});

});

export default admin_auth;