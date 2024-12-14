import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "tailwindcss/tailwind.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [symbol, setSymbol] = useState("TCS");
  const [stockData, setStockData] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [sentimentChartData, setSentimentChartData] = useState(null);

  const fetchStockData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/stock?symbol=${symbol}`);
      const { data } = response.data;

      setStockData(data);

      // Prepare stock chart data
      const labels = data.map((item) => item.date).reverse();
      const closePrices = data.map((item) => item.close).reverse();

      setChartData({
        labels,
        datasets: [
          {
            label: `${symbol} Closing Prices`,
            data: closePrices,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };

  const fetchNewsData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/news?symbol=${symbol}`);
      const news = response.data.news;
      setNewsData(news);

      // Prepare sentiment chart data
      const sentimentScores = news.map((item) => item.polarity);
      const priceChanges = stockData.map(
        (item) => ((item.close - item.open) / item.open) * 100
      ).reverse();

      setSentimentChartData({
        labels: stockData.map((item) => item.date).reverse(),
        datasets: [
          {
            label: "Sentiment Score",
            data: sentimentScores.reverse(),
            borderColor: "rgb(255, 99, 132)",
            fill: false,
            tension: 0.1,
          },
          {
            label: "Price Change (%)",
            data: priceChanges,
            borderColor: "rgb(54, 162, 235)",
            fill: false,
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching news data:", error);
    }
  };

  useEffect(() => {
    if (symbol) {
      fetchStockData();
      fetchNewsData();
    }
  }, [symbol]);

  return (
    <div className="bg-gray-900 flex content-center w-screen min-h-screen text-white">
      <div className="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side - Stock Data */}
        <div className="bg-gray-800 p-4 rounded-lg flex flex-col">
          <h1 className="text-3xl font-bold text-center mb-6">Stock Data Viewer</h1>

          {/* Stock Symbol Input */}
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter stock symbol (e.g., TCS)"
              className="flex-grow text-white p-2 rounded-l-md"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r-md"
              onClick={() => {
                fetchStockData();
                fetchNewsData();
              }}
            >
              Fetch Data
            </button>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto flex-grow mb-4">
            <table className="w-full border-collapse border border-gray-700 text-center">
              <thead>
                <tr className="bg-gray-700">
                  <th className="p-2 border border-gray-600">Month</th>
                  <th className="p-2 border border-gray-600">Open</th>
                  <th className="p-2 border border-gray-600">High</th>
                  <th className="p-2 border border-gray-600">Low</th>
                  <th className="p-2 border border-gray-600">Close</th>
                  <th className="p-2 border border-gray-600">Volume</th>
                </tr>
              </thead>
              <tbody>
                {stockData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-600">
                    <td className="p-2 border border-gray-600">{item.date}</td>
                    <td className="p-2 border border-gray-600">{item.open}</td>
                    <td className="p-2 border border-gray-600">{item.high}</td>
                    <td className="p-2 border border-gray-600">{item.low}</td>
                    <td className="p-2 border border-gray-600">{item.close}</td>
                    <td className="p-2 border border-gray-600">{item.volume}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stock Chart */}
          {chartData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-center">{symbol} Stock Chart (Monthly)</h2>
              <Line data={chartData} />
            </div>
          )}
        </div>

        {/* Right Side - News Sentiment */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">News Sentiment Analysis</h2>
          {newsData.map((item, index) => (
            <div key={index} className="mb-3 p-3 border-b border-gray-700">
              <p className="font-semibold">{item.headline}</p>
              <p className={`text-sm ${item.sentiment === "Positive" ? "text-green-400" : item.sentiment === "Negative" ? "text-red-400" : "text-yellow-400"}`}>
                Sentiment: {item.sentiment} (Polarity: {item.polarity.toFixed(2)})
              </p>
            </div>
          ))}

          {/* Sentiment Chart */}
          {sentimentChartData && (
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2 text-center">Sentiment vs Price Change</h2>
              <Line data={sentimentChartData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
