import express from "express"
import auth_controller from "../controller/auth_controller.js";

const cookieOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
};

const hook_auth=express.Router();


hook_auth.all("*",(req,res,next)=>{

    if (!req.cookies[auth_token]) {

        const {token}=req.body;

        const cookie_obj=auth_controller.token_2_cookie(token);

        if(cookie_obj.isValid==true){

            res.cookie('auth_token', cookie_obj.cookie, cookieOptions);

        } else{

            res.send(cookie_obj);

        }

    } else if(req.cookie[auth_token]){

        const cookieData=req.cookies;

        const isValid_obj=auth_controller.cookie_validity(cookieData);
    
        if(isValid_obj.isValid == true){
    
            req.id=isValid_obj.token_id;
    
            next();
        };
    
        res.json(isValid_obj);

    };

    return res.status(403).json({ message: `Missing required cookie or Token`});

});


export default hook_auth