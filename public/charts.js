import "@babel/polyfill";
import { createChart, CrosshairMode } from "lightweight-charts";
import io from "socket.io-client";
import  axios  from 'axios';


function calculateSMA(data, windowSize) {
  let rAvg = [];
  for (let i = 0; i < data.length - windowSize + 1; i++) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      sum += data[i + j].close;
    }
    rAvg.push({ time: data[i + windowSize - 1].time, value: sum / windowSize });
  }
  return rAvg;
}

function calculateRSI(data, windowSize) {
  let diff = data.map((a, i, arr) => (i > 0 ? a.close - arr[i - 1].close : 0));
  let gains = diff.map((a) => (a > 0 ? a : 0));
  let losses = diff.map((a) => (a < 0 ? Math.abs(a) : 0));

  let avgGain = [];
  let avgLoss = [];

  for (let i = 0; i < data.length; i++) {
    if (i < windowSize) {
      avgGain[i] = (i > 0 ? avgGain[i - 1] * (i - 1) : 0) + gains[i];
      avgLoss[i] = (i > 0 ? avgLoss[i - 1] * (i - 1) : 0) + losses[i];
      if (i === windowSize - 1) {
        avgGain[i] /= windowSize;
        avgLoss[i] /= windowSize;
      }
    } else {
      avgGain[i] = (avgGain[i - 1] * (windowSize - 1) + gains[i]) / windowSize;
      avgLoss[i] = (avgLoss[i - 1] * (windowSize - 1) + losses[i]) / windowSize;
    }
  }

  let rs = avgGain.map((a, i) => (avgLoss[i] !== 0 ? a / avgLoss[i] : 0));
  let rsi = rs.map((a) => 100 - 100 / (1 + a));

  return rsi.map((a, i) => ({ time: data[i].time, value: a }));
}

function calculateEMA(data, windowSize) {
  let multiplier = 2 / (windowSize + 1);
  let emaArray = [{ time: data[0].time, value: data[0].close }];

  for (let i = 1; i < data.length; i++) {
    let ema =
      (data[i].close - emaArray[i - 1].value) * multiplier +
      emaArray[i - 1].value;
    emaArray.push({ time: data[i].time, value: ema });
  }

  return emaArray;
}
function calculateMACD(data, shortPeriod, longPeriod, signalPeriod) {
  let shortEMA = calculateEMA(data, shortPeriod);
  let longEMA = calculateEMA(data, longPeriod);

  let MACDLine = shortEMA.map((ema, i) => ({
    time: ema.time,
    value: ema.value - (longEMA[i] ? longEMA[i].value : 0),
  }));

  let signalLine = calculateEMA(MACDLine, signalPeriod);

  return { MACDLine, signalLine };
}

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
  crosshair: {
    mode: CrosshairMode.Normal,
  },
  rightPriceScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
  timeScale: {
    borderColor: "rgba(197, 203, 206, 0.8)",
  },
});

let candleSeries = chart.addCandlestickSeries({
  upColor: "rgba(0, 150, 136, 1)",
  downColor: "rgba(255, 82, 82, 1)",
  wickUpColor: "rgba(0, 150, 136, 1)",
  wickDownColor: "rgba(255, 82, 82, 1)",
});

let lineSeries = chart.addLineSeries();
let smaSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(4, 111, 232, 1)",
  lineWidth: 2,
});
let emaSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(255, 165, 0, 1)",
  lineWidth: 2,
});
let rsiSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(165, 42, 42, 1)",
  lineWidth: 2,
});
let macdSeries = chart.addLineSeries({
  overlay: true,
  visible: false,
  color: "rgba(255, 0, 0, 1)",
  lineWidth: 2,
});
document.getElementById("sma-button").addEventListener("click", () => {
  smaSeries.applyOptions({ visible: !smaSeries.options().visible });
});

document.getElementById("ema-button").addEventListener("click", () => {
  emaSeries.applyOptions({ visible: !emaSeries.options().visible });
});

document.getElementById("rsi-button").addEventListener("click", () => {
  rsiSeries.applyOptions({ visible: !rsiSeries.options().visible });
});

document.getElementById("macd-button").addEventListener("click", () => {
  macdSeries.applyOptions({ visible: !macdSeries.options().visible });
});
const stockNum = document.getElementById(`chartContainer`).dataset.stocknum;
const oldData = document.getElementById(`old`).dataset.olddata;
const oldDataJson = JSON.parse(oldData);
const reqOldData = oldDataJson.map((stockData, i) => {
  const timeInSecondsOld = Math.floor(Date.now() / 1000) + i * 10;
  return {
    time: timeInSecondsOld,
    open: stockData.OPEN,
    high: stockData.HIGH,
    low: stockData.LOW,
    close: stockData.CLOSE,
  };
});
const smaData = calculateSMA(reqOldData, 14);
const emaData = calculateEMA(reqOldData, 14);
const rsiData = calculateRSI(reqOldData, 14);
const macdData = calculateMACD(reqOldData, 12, 26, 9);
candleSeries.setData(reqOldData);
lineSeries.setData(reqOldData);
macdSeries.setData(macdData.MACDLine);
rsiSeries.setData(rsiData);
smaSeries.setData(smaData);
emaSeries.setData(emaData);
socket.on("stockData", (data) => {
  if (stockNum == data.stockNum) {
    const newData = data.data.map((stockData, i) => {
      const timeInSeconds = Math.floor(Date.now() / 1000) + i * 10;
      return {
        time: timeInSeconds,
        open: stockData.OPEN,
        high: stockData.HIGH,
        low: stockData.LOW,
        close: stockData.CLOSE,
      };
    });
    const smaData = calculateSMA(newData, 14);
    const emaData = calculateEMA(newData, 14);
    const rsiData = calculateRSI(newData, 14);
    const macdData = calculateMACD(newData, 12, 26, 9);
    candleSeries.setData(newData);
    lineSeries.setData(newData);
    macdSeries.setData(macdData.MACDLine);
    rsiSeries.setData(rsiData);
    smaSeries.setData(smaData);
    emaSeries.setData(emaData);
    document.getElementById(`price`).innerText =
      newData[newData.length - 1].close;
  }
});

socket.on("message", (data) => {
  document.getElementById("message-content").innerText = data.data.message;
})

document.getElementById("buy-tip").addEventListener('click', async () => {
  await axios({
    method: 'PATCH',
    url: `/stock/tips/`,
  });
  document.getElementById("tips-button").style.display = "none";
  document.getElementById("tip-message").style.display = "block";

  setTimeout(() => {
    document.getElementById("tip-message").style.display = "none";
    document.getElementById("tips-button").style.display = "block";
  }, 10000);
});