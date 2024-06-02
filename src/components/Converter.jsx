import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Converter() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('KRW');
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${process.env.REACT_APP_API_KEY}&searchdate=20230601&data=AP01`
        );
        const data = response.data.reduce((acc, rate) => {
          acc[rate.cur_unit] = rate.bkpr;
          return acc;
        }, {});
        setRates(data);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    if (rates[toCurrency]) {
      setConvertedAmount((amount * rates[toCurrency]).toFixed(2));
    }
  }, [amount, toCurrency, rates]);

  return (
    <div className="converter">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <h2>
        {amount} {fromCurrency} = {convertedAmount} {toCurrency}
      </h2>
    </div>
  );
};

export default Converter;
