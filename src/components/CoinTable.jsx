import React from 'react';
import './CoinTable.css';

const CoinTable = ({ data }) => {
  return (
    <table className="coin-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Current Price</th>
          <th>Total Volume</th>
          <th>Market Cap</th>
          <th>Price Change % (24h)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin) => (
          <tr key={coin.id} className="coin-row">
            <td>
              <img src={coin.image} alt={coin.name} className="coin-image" />
            </td>
            <td>{coin.name}</td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price.toLocaleString()}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>Mkt Cap: ${coin.market_cap.toLocaleString()}</td>
            <td className={coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
              {coin.price_change_percentage_24h.toFixed(2)}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;