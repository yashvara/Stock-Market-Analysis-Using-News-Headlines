from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from textblob import TextBlob
import nltk
from langdetect import detect

nltk.download('punkt')
app = Flask(__name__)
CORS(app)

ALPHA_VANTAGE_API_KEY = "TGIRSWMQPODFZKRE"
FINNHUB_API_KEY = "ctdh6p1r01qng9gejht0ctdh6p1r01qng9gejhtg"

@app.route('/stock', methods=['GET'])
def get_stock_data():
    symbol = request.args.get('symbol')
    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400
    
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol={symbol}&apikey={ALPHA_VANTAGE_API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        if "Monthly Time Series" in data:
            monthly_time_series = data["Monthly Time Series"]
            result = []
            for date, stats in list(monthly_time_series.items())[:5]:
                result.append({
                    "date": date,
                    "open": float(stats["1. open"]),
                    "high": float(stats["2. high"]),
                    "low": float(stats["3. low"]),
                    "close": float(stats["4. close"]),
                    "volume": int(stats["5. volume"])
                })
            return jsonify({"symbol": symbol, "data": result})
        else:
            return jsonify({"error": "Stock data unavailable"}), 404
    return jsonify({"error": "Failed to fetch data"}), 500

# Fetch news data using Finnhub API
@app.route('/news', methods=['GET'])
def get_stock_news():
    symbol = request.args.get('symbol')
    from_date = request.args.get('from', '2023-01-01')  # Default start date
    to_date = request.args.get('to', '2023-12-31')      # Default end date
    url = f"https://finnhub.io/api/v1/company-news?symbol={symbol}&from={from_date}&to={to_date}&token={FINNHUB_API_KEY}"
    response = requests.get(url)

    if response.status_code == 200:
        articles = response.json()
        news_data = []
        for article in articles[:5]:
            headline = article["headline"]
            
            # Detect language and ensure it's English
            try:
                if detect(headline) == 'en':  # Check if the headline is in English
                    sentiment = TextBlob(headline).sentiment.polarity
                    news_data.append({
                        "headline": headline,
                        "sentiment": "Positive" if sentiment > 0 else "Negative" if sentiment < 0 else "Neutral",
                        "polarity": sentiment
                    })
            except:
                # In case language detection fails, skip the article
                continue

        return jsonify({"symbol": symbol, "news": news_data})
    return jsonify({"error": "Failed to fetch news"}), 500


if __name__ == '__main__':
    app.run(debug=True)
