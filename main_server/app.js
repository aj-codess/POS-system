import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import hook_auth from "./middleware/hook_auth_mid.js"

dotenv.config();

const PORT=process.env.SERVER_PORT || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use("/",hook_auth);

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})