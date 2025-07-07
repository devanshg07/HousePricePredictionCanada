# 🏠 Canada House Price Prediction

A full-stack web application that predicts house prices across Canadian cities using machine learning. Built with React frontend and FastAPI backend.

## ✨ Features

- **Smart Price Prediction**: ML-powered house price predictions based on location, bedrooms, and bathrooms
- **City Selection**: Browse and filter by major Canadian cities
- **Real-time Results**: Instant price predictions with detailed breakdowns
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with house-themed design

## 🚀 Live Demo

[View the live application here](https://your-app-name.vercel.app)

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Select** for enhanced dropdowns
- **React Icons** for beautiful UI elements
- **CSS3** for styling

### Backend
- **FastAPI** (Python) for API endpoints
- **Pandas** for data manipulation
- **Scikit-learn** for machine learning model
- **Uvicorn** for ASGI server

### Data
- **Canadian House Prices Dataset** with real market data
- **Trained ML Model** for accurate price predictions

## 📁 Project Structure

```
HousePricePrediction/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   │   └── index.tsx       # Application entry point
│   ├── package.json        # Frontend dependencies
│   └── tsconfig.json       # TypeScript configuration
├── backend/                 # FastAPI server
│   └── main.py             # API endpoints and ML model
├── housePrices.csv         # Dataset
├── train.ipynb             # Model training notebook
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/house-price-prediction.git
cd house-price-prediction
```

### 2. Set Up the Backend
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install fastapi uvicorn pandas scikit-learn

# Start the backend server
cd backend
python main.py
```

The backend will be running at `http://localhost:8000`

### 3. Set Up the Frontend
```bash
# Install Node.js dependencies
cd frontend
npm install

# Start the development server
npm start
```

The frontend will be running at `http://localhost:3000`

### 4. Use the Application
1. Open your browser and go to `http://localhost:3000`
2. Select a Canadian city from the dropdown
3. Enter the number of bedrooms and bathrooms
4. Click "Predict" to get the estimated house price

## 🌐 Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set the **Root Directory** to `frontend`
4. Deploy with these settings:
   - **Framework Preset**: React
   - **Install Command**: `npm install`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### Backend (Render/Railway)
1. Create a new Web Service on Render or Railway
2. Connect your GitHub repository
3. Set the **Root Directory** to `backend`
4. Configure environment variables if needed
5. Deploy

## 📊 API Endpoints

### GET `/api/cities`
Returns a list of available Canadian cities.

**Response:**
```json
{
  "cities": ["Toronto", "Vancouver", "Montreal", ...]
}
```

### POST `/api/filter`
Predicts house prices based on input parameters.

**Request Body:**
```json
{
  "city": "Toronto",
  "bedrooms": 3,
  "bathrooms": 2
}
```

**Response:**
```json
{
  "results": [
    {
      "City": "Toronto",
      "Number_Beds": 3,
      "Number_Baths": 2,
      "Predicted_Price": 850000
    }
  ]
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Canadian real estate data sources
- React and FastAPI communities
- Machine learning enthusiasts

## 📞 Support

If you have any questions or need help:
- Open an issue on GitHub
- Contact: your-email@example.com

---

**Made with ❤️ for the Canadian housing market** 