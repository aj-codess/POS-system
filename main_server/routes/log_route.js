import express from "express";
import log_control from "./../controller/log_control.js";

const log_router=express.Router();

log_router.post("/newAdmin",(req,res)=>{

    log_control.newAdmin(req,res)

});

log_router.post("/oldAdmin",(req,res)=>{

    log_control.oldAdmin(req,res)

});

export default log_router;