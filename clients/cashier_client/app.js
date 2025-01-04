const WebSocket = require("ws");

const ws = new WebSocket("ws://localhost:8080");

ws.on("open", () => {
  console.log("Connected to WebSocket server");
  ws.send(JSON.stringify("Hello server!")); // Send a test message
});

ws.on("message", (data) => {
  console.log("Received from server:", data);
});

ws.on("close", () => console.log("Connection closed"));
