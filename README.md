# Canada House Price Filter MVP

## Description
A web app where users can filter real estate listings by city, number of bedrooms, and number of bathrooms. Built with React (frontend) and FastAPI (backend). Data is sourced from a CSV file.

## How to Run

### Backend (FastAPI)
1. Create a virtual environment and activate it.
2. Install FastAPI and Uvicorn:
   ```bash
   pip install fastapi uvicorn pandas
   ```
3. Start the backend:
   ```bash
   uvicorn backend.main:app --reload
   ```

### Frontend (React)
1. In the `frontend` folder, install dependencies:
   ```bash
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```

The frontend will be available at http://localhost:3000 and will communicate with the backend at http://localhost:8000. 