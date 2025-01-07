import WebSocket from "ws";

//ws - websocket, wsc - websocket client

const ws=new WebSocket.Server({noServer:true});

ws.on("connection",(wsc,request)=>{

    wsc.send(JSON.stringify({ status: "success", message: "Preparing Live Analytics" }));

    wsc.on("message",(msg)=>{

        try {

            const payload_in = JSON.parse(msg);

            console.log("Received from client:", payload_in);

            wsc.send(JSON.stringify({ status: "received", message: "Data processed" }));

        } catch (error) {

            console.error("Invalid JSON received:", msg);

            wsc.send(JSON.stringify({ status: "error", message: "Invalid JSON format" }));
        };

    });

    wsc.on("close",()=>{

        console.log("admin Disconnected");

    });

});

export default ws;