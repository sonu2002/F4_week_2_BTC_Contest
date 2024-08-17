import React, { useState, useEffect } from 'react';
import './App.css';
import CoinTable from './components/CoinTable';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const apiData = await response.json();
        setData(apiData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredData);
  };

  const handleSort = (criteria) => {
    let sortedData;
    if (criteria === 'market_cap') {
      sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
      sortedData = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    setData(sortedData);
  };

  return (
    <div className="container">
      <form
        id="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          id="search-input"
          className="input-field"
          placeholder="Search By Name or Symbol"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="button">
          Search
        </button>
        <button type="button" className="button" onClick={() => handleSort('market_cap')}>
          Sort By Mkt Cap
        </button>
        <button type="button" className="button" onClick={() => handleSort('percentage_change')}>
          Sort by percentage
        </button>
      </form>
      <CoinTable data={data} />
    </div>
  );
};

export default App;