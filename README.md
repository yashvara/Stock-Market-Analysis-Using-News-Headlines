# Stock Market Analysis and News Sentiment Viewer

This project is a web application that allows users to analyze stock data and news sentiment for a specific company. It leverages **Flask** for the backend, **React.js** for the frontend, and integrates APIs for fetching stock prices and news data.

---

## Features 🚀

1. **Stock Price Viewer**:
   - Fetch monthly stock price data (Open, High, Low, Close, Volume).
   - Display the data in an interactive table.
   - Visualize stock closing prices with a line chart.

2. **News Sentiment Analysis**:
   - Fetch company news headlines.
   - Perform sentiment analysis (Positive, Neutral, Negative) using **TextBlob**.
   - Visualize sentiment polarity alongside stock price changes.

3. **Interactive UI**:
   - User-friendly interface with stock symbol input.
   - Responsive design using **Tailwind CSS**.
   - Dual-panel layout for stock data and sentiment analysis.

---

## Technologies Used 🛠️

### **Backend**:
- Python Flask
- TextBlob (Sentiment Analysis)
- Langdetect (Language Detection)
- APIs:
  - Alpha Vantage (Stock Data)
  - Finnhub (News Headlines)

### **Frontend**:
- React.js
- Chart.js (Data Visualization)
- Tailwind CSS (Styling)
- Axios (HTTP Requests)

---

## Installation and Setup ⚙️

### Prerequisites:
- Python 3.x
- Node.js and npm
- Flask
- React.js

### Backend Setup:
1. Clone the repository.
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install Python dependencies:
   ```bash
   pip install flask flask-cors requests textblob langdetect nltk
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```
   - The Flask server will start at `http://127.0.0.1:5000`.

### Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install React dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   - The app will open at `http://localhost:3000`.

---

## How to Use 📘

1. **Enter Stock Symbol**:  
   Input the stock symbol of a company (e.g., `TCS`) and click "Fetch Data".

2. **View Stock Data**:  
   The table displays monthly stock data for the last 5 months. The line chart visualizes the monthly closing prices.

3. **News Sentiment**:  
   - Fetches the latest company news headlines.
   - Sentiment analysis assigns Positive, Neutral, or Negative to each headline.
   - A chart compares news sentiment scores with stock price percentage changes.

---

## API Keys 🔑

- Replace the placeholders in `app.py` with your API keys:
  ```python
  ALPHA_VANTAGE_API_KEY = "YOUR_ALPHA_VANTAGE_API_KEY"
  FINNHUB_API_KEY = "YOUR_FINNHUB_API_KEY"
  ```
- You can obtain free API keys from:
   - [Alpha Vantage](https://www.alphavantage.co/)
   - [Finnhub](https://finnhub.io/)

---

## Folder Structure 📂
```
root/
├── app.py             # Flask backend
├── frontend/
│   ├── App.jsx        # Main React component
│   ├── index.js       # React entry point
│   └── package.json   # React dependencies
└── README.md          # Project documentation
```

---

## Screenshots 🖼️

### 1. Stock Data Viewer
Displays stock data table and closing prices chart.

![Stock Data Viewer](https://via.placeholder.com/600x400)

### 2. News Sentiment Analysis
Shows news headlines with sentiment polarity.

![Sentiment Analysis](https://via.placeholder.com/600x400)

---

## Future Enhancements 🌟

- Add daily or weekly stock data.
- Include historical sentiment trends.
- Enable comparison between multiple stock symbols.
- Integrate machine learning for price predictions.

---

## Contributing 🤝

Feel free to fork this repository and submit pull requests! Any contributions are appreciated.

---

## License 📄

This project is licensed under the MIT License.

---

## Acknowledgments 🙏

- [Alpha Vantage API](https://www.alphavantage.co/)
- [Finnhub API](https://finnhub.io/)
- [TextBlob](https://textblob.readthedocs.io/)

---

**Developed with ❤️ using Flask and React**. 
