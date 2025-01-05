const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

let payload={
    id:"CLT1",
    message:"this message is from customer client"
}

ws.on("open", () => {
  console.log("Connected to WebSocket server");
  ws.send(JSON.stringify(payload)); // Send a test message
});

ws.on("message", (data) => {
  console.log("Received from server:", data);
});

ws.on("close", () => console.log("Connection closed"));
