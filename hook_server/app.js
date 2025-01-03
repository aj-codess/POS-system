import WebSocket from "ws";
import dotenv from "dotenv";

import helper from "./services/helper.js";
import manager from "./services/manager.js";

dotenv.config();

const WS_PORT=process.env.WS_PORT || 8080;

const ws = new WebSocket.Server({ port: WS_PORT });

ws.on("connection",(ws)=>{

    ws.on("message",(message)=>{

        const payload_in=JSON.parse(message);

        if(payload_in.CSH_id){

            if(!manager.has(CSH_id)){
                manager.create(CSH_id);
                manager.set(CSH_id,CSH_socket_addr,ws);
            };

        } else if(payload_in.CLT_id){

            const endpoint=helper.endpoint_id(payload_in.CLT_id);

            manager.set(endpoint,CLT_socket_addr,ws);

            manager.push_message(endpoint,payload_in.message);

        };

    });





    ws.on("close",()=>{
        if(payload_in.CSH_id){

            let isDeleted=manager.delete(payload_in.CSH_id);

            //send a message to the main sever that a cashier machine is down.

        } else if(payload_in.CLT_id){

            let isDeleted = manager.delete_clt(endpoint);

            //send a message to the main server that the client machine is down.

        };
    });


    ws.on("error",(error)=>{
        //send what ever error to the admin
    });

})