# HousePricePredictionCanada

## Overview

HousePricePredictionCanada is a full-stack machine learning project designed to predict house prices in Canadian cities. It leverages a dataset of real estate listings, including features such as city, number of bedrooms, and bathrooms, to train a regression model. The project provides a user-friendly web interface for users to input property details and receive instant price predictions.

The project is structured into three main components:
- **Machine Learning Model (Jupyter Notebook):** For data preprocessing, model training, and exporting the trained model.
- **Backend API (FastAPI):** Serves predictions using the trained model and provides city data to the frontend.
- **Frontend (React):** Allows users to interact with the model and view predictions in real time.

---

## Features

- Predicts house prices based on city, number of bedrooms, and bathrooms.
- Interactive web interface for easy user input.
- FastAPI backend for efficient and scalable API serving.
- Easily extensible for more features or additional data.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/HousePricePredictionCanada.git
cd HousePricePredictionCanada
```

---

### 2. Prepare the Machine Learning Model

The backend requires a trained model (`canada_house_price_prediction_model.pickle`) and a columns file (`columns.json`). If these files are not present, you need to generate them by running the Jupyter notebook.

#### a. Install Python dependencies

It is recommended to use a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # If requirements.txt is not present, install: pandas numpy scikit-learn matplotlib
```

#### b. Run the Jupyter Notebook

Open `train.ipynb` in Jupyter Notebook or JupyterLab:

```bash
jupyter notebook train.ipynb
```

- Follow the notebook cells to preprocess the data and train the model.
- **Important:** At the end of the notebook, add and run the following code to save the trained model and columns:

```python
import pickle
model_filename = 'canada_house_price_prediction_model.pickle'
with open(model_filename, 'wb') as f:
    pickle.dump(lr_clf, f)

columns = {'data_columns': list(x.columns)}
import json
with open('columns.json', 'w') as f:
    json.dump(columns, f)
```

- Ensure `canada_house_price_prediction_model.pickle` and `columns.json` are created in the project root.

---

### 3. Start the Backend API

The backend is built with FastAPI and expects the model and columns files in the project root.

#### a. Install backend dependencies

```bash
pip install fastapi uvicorn pandas numpy scikit-learn
```

#### b. Run the backend server

```bash
cd backend
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`.

---

### 4. Start the Frontend

The frontend is a React app located in the `frontend` directory.

#### a. Install frontend dependencies

```bash
cd ../frontend
npm install
```

#### b. Start the frontend development server

```bash
npm start
```

The frontend will be available at `http://localhost:3000` and will proxy API requests to the backend.

---

## Usage

1. Open your browser and go to `http://localhost:3000`.
2. Select a city, number of bedrooms, and bathrooms.
3. Click the button to get a predicted house price.

---

## Project Structure

```
HousePricePredictionCanada/
  ├── backend/                # FastAPI backend
  │   └── main.py
  ├── frontend/               # React frontend
  │   └── src/
  ├── housePrices.csv         # Dataset
  ├── train.ipynb             # Jupyter notebook for ML
  ├── canada_house_price_prediction_model.pickle  # Trained model (generated)
  ├── columns.json            # Model columns (generated)
  └── README.md
```

---

## License

This project is open source and available under the [MIT License](LICENSE).

--- 