import mongoose from "mongoose";
import bcrypt from "bcrypt";

const user_schema=new mongoose.Schema({
    _id:false,
    id:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        unique:true,
        trim:true,
        minlength:3
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
        type: String,
        required: false,
        minlength: 10,
        maxlength: 13,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isActive:{
        type: Boolean,
        default: true,
    }
},{timestamps:true});


const user=mongoose.model("User",user_schema);

export default user;