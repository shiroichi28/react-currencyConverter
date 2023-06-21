import React, { useState, useEffect } from "react";
import { currencyCodes } from "./currencyCode";
import { apiKey } from "./api-key";
import Icon from "./assets/app-icon.svg";

const API_URL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

function App() {
  const [amount, setAmount] = useState(100);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((resp) => resp.json())
      .then((data) => {
        const fromExchangeRate = data.conversion_rates[fromCurrency];
        const toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
        setConvertedAmount(convertedAmount.toFixed(2));
      });
  }, [amount, fromCurrency, toCurrency]);


  return (
    <div className="wrapper">
      <div className="app">
        <img src={Icon} className="app-icon" alt="App Icon" />
        <h1 className="app-title">Currency Converter</h1>
      </div>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="dropdown">
        <select
          id="from"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencyCodes.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select
          id="to"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencyCodes.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <p id="result">
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </p>
    </div>
  );
}

export default App;
