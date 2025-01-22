const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Create an Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://ahrefs.com/traffic-checker", // Replace with your frontend URL
    methods: ["GET", "POST"],
  },
});

// Store traffic data
let trafficData = [];

// Simulate traffic data every hour (or every 5 seconds for testing)
setInterval(() => {
  const randomVisitors = Math.floor(Math.random() * 100); // Simulated visitors
  const timestamp = new Date().toLocaleTimeString();

  // Add new data point
  const dataPoint = { timestamp, visitors: randomVisitors };
  trafficData.push(dataPoint);

  // Keep only the last 10 data points
  if (trafficData.length > 10) {
    trafficData.shift();
  }

  // Send updated traffic data to clients
  io.emit("trafficUpdate", trafficData);
}, 5000); // Change to 3600000 for hourly updates

// Start the server
server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
