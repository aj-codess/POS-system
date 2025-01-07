import WebSocket from "ws";
import dotenv from "dotenv";

import main_server from "./hook_module/entry.js";
import helper from "./services/helper.js";
import manager from "./services/manager.js";
import cache from "./cache.js";

cache.trigger_get_inventory();

dotenv.config();

//specify main server token
const CONFIG={
    constructor(){
        this.token;
    }
};

const WS_PORT=process.env.WS_PORT || 8080;

const ws = new WebSocket.Server({ port: WS_PORT });

let endpoint;

let id;

ws.on("connection",(ws)=>{

    ws.on("message",(message)=>{

        const payload_in=JSON.parse(message);

        let endpoint;

        id=payload_in.id;

        if(helper.isCSH(payload_in.id)){

            if(!manager.has(payload_in.id)){

                manager.create(payload_in.id);

                manager.setCSH_addr(payload_in.id,ws);

            };

            //send awaiting message in message_queue
            if(manager.get(payload_in.id).message_queue.length>0){

                const assets=manager.get(payload_in.id);

                for(let i=0;i<assets.message_queue.length;i++){

                    assets.CSH_socket_addr.send(JSON.stringify(assets.message_queue[i]));
    
                };

                manager.clear_message_queue(payload_in);

            };

            manager.push_message(payload_in.id,payload_in.message);



        } else if(helper.isCLT(payload_in.id)){

            endpoint=helper.endpoint_id(payload_in.id);

            manager.setCLT_addr(endpoint,ws);

            //send awaiting message in message_queue
            const assets=manager.get(endpoint);

                for(let i=0;i<assets.message_queue.length;i++){

                    assets.CLT_socket_addr.send(JSON.stringify(assets.message_queue[i]));
    
                };
    
                manager.clear_message_queue(endpoint);


            manager.push_message(endpoint,payload_in.message);

        };


    
        //execute with regards to the message queue
        if(helper.isCLT(payload_in.id)){

            const assets=manager.get(endpoint);

            if(!assets.CSH_socket_addr == null){
                for(let i=0;i<assets.message_queue.length;i++){

                    assets.CSH_socket_addr.send(JSON.stringify(assets.message_queue[i]));
    
                };
    
                manager.clear_message_queue(endpoint);
            }

        }else if(helper.isCSH(payload_in.id)){

            const assets=manager.get(payload_in.id);

            if(!assets.CLT_socket_addr == null){
                for(let i=0;i<assets.message_queue.length;i++){

                    assets.CLT_socket_addr.send(JSON.stringify(assets.message_queue[i]));
    
                };

                manager.clear_message_queue(payload_in.id);
            }


            if(assets.hasOwnProperty("receipt")){
                manager.mark_open(payload_in.id);
            };

        };


    });


    ws.on("close",()=>{
        if(helper.isCSH(id)){

            //send a message to the main sever that a cashier machine is down.

        } else if(helper.isCLT(id)){

            //send a message to the main server that the client machine is down.

        };
    });


    ws.on("error",(error)=>{
        //send what ever error to the admin
        console.log("an error occured");
    });

});


console.log(`WebSocket server is running on ws://localhost:${WS_PORT}`);

let isHooked=main_server.server_init(CONFIG.token);

if(isHooked){
    console.log("server hooked");
} else{
    console.log("server Unable to hook.....shutting down");
    process.exit(1);
};

//after communication, keep records where recovery can be done

//once receipt is generated, and the client is down, record should be kept and the cashier device should wait on the reconnection
//of that same client again

//once a receipt is generated for a client, cashier status should be changed to open again aside close