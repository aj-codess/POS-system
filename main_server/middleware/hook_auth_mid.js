import express from "express"
import auth_controller from "../controller/auth_controller.js";

const cookieOptions = {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
};

const hook_auth=express.Router();


hook_auth.all("*",(req,res,next)=>{

    if (req.url=="/hook_module/ping") {

        const {token}=req.body;

        const cookie_obj=auth_controller.token_2_cookie(token);

        if(cookie_obj.isValid==true){

            res.cookie('auth_token', cookie_obj.cookie, cookieOptions);

            return next(); 

        } else{

            res.send(cookie_obj);

        }

    } else if(req.cookies && req.url != "hook_module/ping"){

        const cookieData=req.cookies;

        const isValid_obj=auth_controller.cookie_validity(cookieData);
    
        if(isValid_obj.isValid == true){
    
            req.id=isValid_obj.token_id;
    
            return next();
        };
    
        res.json(isValid_obj);

    };

    return res.status(403).json({ message: `Missing required cookie or Token`});

});


export default hook_auth;