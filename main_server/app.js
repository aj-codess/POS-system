import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import admin_auth from "./middleware/admin_auth_mid.js"
import hook_auth from "./middleware/hook_auth_mid.js"
import log_router  from "./routes/log_route.js"

dotenv.config();

const PORT=process.env.SERVER_PORT || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRETE_KEY));

//middlewares
app.use("/hook_module",hook_auth);
app.use("/admin",admin_auth);

app.use("/login",log_router) 

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})