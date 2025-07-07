import React, { useState } from 'react';
import './App.css';

interface Listing {
  City: string;
  Price: number;
  Address?: string;
  Number_Beds: number;
  Number_Baths: number;
  Province?: string;
  Population?: number;
  Latitude?: number;
  Longitude?: number;
  Median_Family_Income?: number;
  Predicted_Price?: number;
}

function App() {
  const [city, setCity] = useState('');
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResults([]);
    const response = await fetch('http://localhost:8000/api/filter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, bedrooms, bathrooms })
    });
    const data = await response.json();
    setResults(data.results || []);
    setLoading(false);
  };

  return (
    <div className="App">
      <h1>🏠 Canada House Price Filter</h1>
      <form onSubmit={handleSubmit} className="filter-form">
        <label>
          City:
          <input value={city} onChange={e => setCity(e.target.value)} required />
        </label>
        <label>
          Bedrooms:
          <input type="number" min={1} value={bedrooms} onChange={e => setBedrooms(Number(e.target.value))} required />
        </label>
        <label>
          Bathrooms:
          <input type="number" min={1} value={bathrooms} onChange={e => setBathrooms(Number(e.target.value))} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Searching...' : 'Filter'}</button>
      </form>
      <hr />
      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Predicted Price</th>
              <th>Number Beds</th>
              <th>Number Baths</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                <td>{row.City}</td>
                <td>{row.Predicted_Price}</td>
                <td>{row.Number_Beds}</td>
                <td>{row.Number_Baths}</td>
                <td>{row.Address || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {results.length === 0 && !loading && <p>No results to display.</p>}
    </div>
  );
}

export default App;
