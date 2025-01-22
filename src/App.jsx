import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// Connect to backend
const socket = io("http://localhost:4000");

const App = () => {
  const [trafficData, setTrafficData] = useState([]);

  useEffect(() => {
    // Listen for traffic updates
    socket.on("trafficUpdate", (data) => {
      setTrafficData(data);
    });

    // Cleanup on unmount
    return () => {
      socket.off("trafficUpdate");
    };
  }, []);

  // Prepare chart data
  const chartData = {
    labels: trafficData.map((data) => data.timestamp),
    datasets: [
      {
        label: "Visitors Per Hour",
        data: trafficData.map((data) => data.visitors),
        borderColor: "#4a90e2",
        backgroundColor: "rgba(74, 144, 226, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="container">
      <h1>Hourly Traffic Tracker</h1>
      <div className="chart-container">
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default App;
