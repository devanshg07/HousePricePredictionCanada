import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { FaCity, FaBed, FaBath } from 'react-icons/fa';
import './App.css';

interface Listing {
  City: string;
  Price: number;
  Number_Beds: number;
  Number_Baths: number;
  Predicted_Price?: number;
}

function App() {
  const [city, setCity] = useState<{ value: string; label: string } | null>(null);
  const [cityOptions, setCityOptions] = useState<{ value: string; label: string }[]>([]);
  const [bedrooms, setBedrooms] = useState<string>('1');
  const [bathrooms, setBathrooms] = useState<string>('1');
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/cities')
      .then(res => res.json())
      .then(data => {
        setCityOptions(data.cities.map((c: string) => ({ value: c, label: c })));
      });
  }, []);

  const handleNumberInput = (setter: (n: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, '');
    if (value === '' || /^[1-9][0-9]*$/.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) {
      alert("Please select a city.");
      return;
    }
    if (!bedrooms || !bathrooms || Number(bedrooms) < 1 || Number(bathrooms) < 1) {
      alert("Bedrooms and bathrooms must be at least 1.");
      return;
    }
    setLoading(true);
    setResults([]);
    const response = await fetch('http://localhost:8000/api/filter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: city.value, bedrooms: Number(bedrooms), bathrooms: Number(bathrooms) })
    });
    const data = await response.json();
    setResults(data.results || []);
    setLoading(false);
  };

  const formatPrice = (price?: number) => {
    if (typeof price !== 'number' || isNaN(price)) return '';
    return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  };

  return (
    <div className="App">
      <h1>Canada House Price Filter</h1>
      <form onSubmit={handleSubmit} className="filter-form">
        <label>
          <span><FaCity size={16} /> City:</span>
          <Select
            options={cityOptions}
            value={city}
            onChange={setCity}
            placeholder="Select a city..."
            isClearable
            isSearchable
            styles={{ container: base => ({ ...base, minWidth: 200 }) }}
          />
        </label>
        <label>
          <span><FaBed size={16} /> Bedrooms:</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            value={bedrooms}
            onChange={handleNumberInput(setBedrooms)}
            required
          />
        </label>
        <label>
          <span><FaBath size={16} /> Bathrooms:</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            value={bathrooms}
            onChange={handleNumberInput(setBathrooms)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>{loading ? 'Predicting...' : 'Predict Price'}</button>
      </form>
      <hr />
      {results.length > 0 && (
        <table className="results-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Number Beds</th>
              <th>Number Baths</th>
              <th>Expected Price</th>
            </tr>
          </thead>
          <tbody>
            {results.map((row, idx) => (
              <tr key={idx}>
                <td>{row.City}</td>
                <td>{row.Number_Beds}</td>
                <td>{row.Number_Baths}</td>
                <td>${formatPrice(row.Predicted_Price)}</td>
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
