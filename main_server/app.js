import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import admin_auth from "./middleware/admin_auth_mid.js"
import hook_auth from "./middleware/hook_auth_mid.js"
import log_router  from "./routes/log_route.js"
import inventory_router from "./routes/inventory_routes.js";
import ws from "./controller/live_dash_controller.js";
import action_router from "./routes/hook_actions.js";

dotenv.config();

const PORT=process.env.SERVER_PORT || 3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.SECRETE_KEY));

//middlewares
app.use("/hook_module",hook_auth);
app.use("/admin",admin_auth);

//used in combi with admin
app.use("/login",log_router);
app.use("/inventory",inventory_router);

//used in combi with hook_module
app.use("/action",action_router);


const server=app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});

server.on("upgrade",(request,socket,head)=>{

    const url = new URL(request.url, `http://${request.headers.host}`);

    const id = url.searchParams.get('id'); 

    if(url.pathname === '/live_dashboard' && id){

        ws.handleUpgrade(request,socket,head,(ws)=>{

            ws.id = id;

            ws.emit("connection",ws,request);

        });

    } else{

        socket.destroy();

    };

});