import { configureStore, createSlice } from '@reduxjs/toolkit';

const ratesSlice = createSlice({
  name: 'rates',
  initialState: {
    rates: {}, // 환율 데이터를 저장하는 객체
    history: [] // 변환 내역을 저장하는 배열
  },
  reducers: {
    // 환율 데이터를 상태에 저장하는 리듀서
    setRates: (state, action) => {
      state.rates = action.payload;
    },
     // 변환 내역을 상태에 추가하는 리듀서
    addHistory: (state, action) => {
      state.history.push(action.payload);
    }
  }
});

export const { setRates, addHistory } = ratesSlice.actions;

const store = configureStore({
  reducer: {
    rates: ratesSlice.reducer
  }
});

export default store;
