import express from "express";

import card_sub_controller from "./../controller/card_sub_controller.js";
import reciept_controller from "./../controller/reciept_controller.js";
import inventory_controller from "./../controller/inventory_controller.js";
import review_controller from "./../controller/review_controller.js";
import store_info_controller from "./../controller/card_sub_controller.js"

const action_router=express.Router();

action_router.get("/get_inventory",(req,res)=>{

    inventory_controller(req,res);

});

action_router.get("/get_info",(req,res)=>{

    store_info_controller(req,res);

});

action_router.post("/card_submission",(req,res)=>{

    card_sub_controller(req,res);

});

action_router.get("/get_reciept",(req,res)=>{

    reciept_controller(req,res);

});

action_router.post("/send_review",()=>{

    review_controller(req,res);

});

export default action_router;