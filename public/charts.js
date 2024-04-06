import "@babel/polyfill";
import { createChart } from "lightweight-charts";
import io from "socket.io-client";

const socket = io();

let chart = createChart(document.getElementById("chart"), {
  width: 800,
  height: 600,
  layout: {
    backgroundColor: "#253248",
    textColor: "rgba(255, 255, 255, 0.9)",
  },
  grid: {
    vertLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
    horzLines: {
      color: "rgba(197, 203, 206, 0.5)",
    },
  },
});
let candleSeries = chart.addCandlestickSeries({
  upColor: "rgba(0, 150, 136, 1)",
  downColor: "rgba(255, 82, 82, 1)",
  wickUpColor: "rgba(0, 150, 136, 1)",
  wickDownColor: "rgba(255, 82, 82, 1)",
});
const stockNum = document.getElementById(`chartContainer`).dataset.stocknum;
socket.emit(`join`, stockNum);
socket.on("stockData", (data) => {
  candleSeries.setData([]);
  data.forEach((stockData, i) => {
    const timeInSeconds = Math.floor(Date.now() / 1000) + i * 15;
    const dataset = {
      time: timeInSeconds,
      open: stockData.OPEN,
      high: stockData.HIGH,
      low: stockData.LOW,
      close: stockData.CLOSE,
    };

    candleSeries.update(dataset);
  });
});
