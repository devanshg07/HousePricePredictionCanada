from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import os
import pickle
import numpy as np
import json

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = os.path.join(os.path.dirname(__file__), '..', 'housePrices.csv')
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'canada_house_price_prediction_model.pickle')
COLUMNS_PATH = os.path.join(os.path.dirname(__file__), '..', 'columns.json')

with open(MODEL_PATH, 'rb') as f:
    model = pickle.load(f)

with open(COLUMNS_PATH, 'r') as f:
    columns = json.load(f)['data_columns']

class FilterRequest(BaseModel):
    city: str
    bedrooms: int
    bathrooms: int

@app.post("/api/filter")
def filter_listings(req: FilterRequest):
    x = np.zeros(len(columns))
    # Set numeric features
    if 'number_beds' in columns:
        x[columns.index('number_beds')] = req.bedrooms
    if 'number_baths' in columns:
        x[columns.index('number_baths')] = req.bathrooms
    # Set city one-hot
    city_col = f"city_{req.city.lower()}"
    if city_col in columns:
        x[columns.index(city_col)] = 1
    predicted_price = model.predict([x])[0]
    return {
        "results": [{
            "City": req.city,
            "Number_Beds": req.bedrooms,
            "Number_Baths": req.bathrooms,
            "Predicted_Price": round(predicted_price, 2)
        }]
    }

@app.get("/api/cities")
def get_cities():
    df = pd.read_csv(CSV_PATH, encoding='latin1', usecols=['City'])
    cities = sorted(df['City'].dropna().unique())
    return {"cities": cities} 