import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import HistoryModal from './HistoryModal';
import { addHistory, setRates } from '../store';
import Button from 'react-bootstrap/Button';

function Converter() {
  const dispatch = useDispatch();
  const rates = useSelector((state) => state.rates.rates);
  const history = useSelector((state) => state.rates.history);

  //const [rates, setRates] = useState({}); //환율 데이터
  const [modalOpen, setModalOpen] = useState(false); // 모달 상태 변수 추가
  const [amount, setAmount] = useState(1); //사용자가 입력한 금액
  const [fromCurrency, setFromCurrency] = useState('USD'); //변환할 원래 통화
  const [toCurrency, setToCurrency] = useState('KRW'); //변환할 대상 통화
  const [convertedAmount, setConvertedAmount] = useState(0); //변환된 금액
  //console.log('API Key:', process.env.REACT_APP_API_KEY);

  // 1. 컴포넌트가 처음 마운트될 때 및 fromCurrency가 변경될 때마다 환율 데이터를 가져온다.
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `/api/site/program/financial/exchangeJSON?authkey=${process.env.REACT_APP_API_KEY}&searchdate=20230601&data=AP01`,
        );
        console.log('API Response:', response.data); // 디버깅을 위한 콘솔 로그 추가
        const data = response.data.reduce((acc, rate) => {
          acc[rate.cur_unit] = parseFloat(rate.bkpr.replace(/,/g, ''));
          return acc;
        }, {});
        dispatch(setRates(data));
        console.log('Processed Rates:', data); // 디버깅을 위한 콘솔 로그 추가
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };
    fetchRates();
  }, [dispatch]);

  // 2. 두 번째 useEffect: amount, toCurrency 또는 rates가 변경될 때마다 변환된 금액을 재계산한다.
  useEffect(() => {
    if (rates[toCurrency]) {
      const converted = ((amount / rates[fromCurrency]) * rates[toCurrency]).toFixed(2);
      setConvertedAmount(converted);
      dispatch(addHistory({ fromCurrency, toCurrency, amount, converted }));
    }
  }, [amount, toCurrency, rates, fromCurrency, dispatch]);

  return (
    <>
      <div className="converter">
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
          <h2>
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </h2>
          <Button variant="primary" onClick={() => setModalOpen(true)}>내역 보기</Button>
          <HistoryModal open={modalOpen} onClose={() => setModalOpen(false)} history={history} />
        </div>
    </>
  );
}

export default Converter;
