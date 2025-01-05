const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

let payload={
  id:"CSH1",
  message:"this message is from cashier"
}

ws.on("open", () => {
  console.log("Connected to WebSocket server");
  ws.send(JSON.stringify(payload)); // Send a test message
});

ws.on("message", (data) => {
  console.log("Received from server:", data);
});

ws.on("close", () => console.log("Connection closed"));
