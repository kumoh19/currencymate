# 실시간 환율 변환 프로젝트

## 개요
본 프로젝트는 React를 사용하여 환율 변환기 애플리케이션을 만드는 것이다. 한국수출입은행의 Open API를 사용하여 실시간 환율 데이터를 가져오고, 사용자가 입력한 금액을 선택한 통화로 변환하는 기능을 구현하였다.
- <b>installed Library</b>
```
npm install axios
npm install react-bootstrap bootstrap
npm i react-router-dom
npm install redux react-redux @reduxjs/toolkit
```

## 주요 기능
1. 실시간 환율 데이터 가져오기: 한국수출입은행 API를 사용하여 최신 환율 데이터를 가져온다.
2. 환율 변환 계산기: 사용자가 입력한 금액을 선택한 통화로 변환한다.
3. 변환 내역 기록 및 표시: 변환 내역을 Redux를 통해 관리하고 모달 창을 통해 표시한다.

## API 사용
- API URL: https://www.koreaexim.go.kr/site/program/financial/exchangeJSON
- 예시 URL: https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={YOUR_API_KEY}&searchdate=20230601&data=AP01
- API 키 설정: `.env` 파일에 API 키를 저장한다.
```REACT_APP_API_KEY=your_api_key_here```

## CORS 문제 해결
### 프록시 서버 사용 (http-proxy-middleware)
1. `http-proxy-middleware` 설치
```npm install http-proxy-middleware --save```

2. 프록시 설정
- `src/setupProxy.js` 파일을 생성하고 다음 내용을 추가
```javascrpt
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://www.koreaexim.go.kr',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};

```
3. API 요청 경로 변경
```javascrpt
const response = await axios.get(
  `/api/site/program/financial/exchangeJSON?authkey=${process.env.REACT_APP_API_KEY}&searchdate=20230601&data=AP01`
);
```

## Redux를 통한 상태 관리
Redux를 사용하여 환율 데이터와 변환 내역을 중앙에서 관리한다. 이를 통해 컴포넌트 간 상태 공유가 용이해졌다.

### Redux 설정 (`store.js`)
- setRates 리듀서: 환율 데이터를 상태에 저장한다. API로부터 가져온 데이터를 rates 상태에 저장합니다.
- addHistory 리듀서: 변환 내역을 상태에 추가한다. 사용자가 수행한 환율 변환 내역을 history 배열에 추가합니다.

### 모달 컴포넌트 (`HistoryModal.jsx`)
- open: 모달 창이 열려 있는지 여부를 결정한다.
- onClose: 모달 창을 닫는 함수이다.
- history: 변환 내역을 받아와 리스트로 출력한다.

### 환율 변환기 컴포넌트 (`Converter.jsx`)
1. Redux 상태 관리:
setRates와 addHistory 액션을 사용하여 환율 데이터와 변환 내역을 중앙에서 관리합니다.
useDispatch와 useSelector를 사용하여 Redux 상태와 액션을 컴포넌트에 연결합니다.

2. 환율 데이터 가져오기:
useEffect 훅을 사용하여 컴포넌트가 마운트될 때와 fromCurrency가 변경될 때마다 API에서 환율 데이터를 가져옵니다.
데이터를 가공하여 Redux 상태에 저장합니다.

3. 환율 변환:
두 번째 useEffect 훅을 사용하여 amount, toCurrency, rates, fromCurrency가 변경될 때마다 변환된 금액을 계산합니다.
변환된 금액을 convertedAmount 상태에 저장하고, 변환 내역을 Redux 상태에 추가합니다.

4. 모달 창:
HistoryModal 컴포넌트를 사용하여 변환 내역을 모달 창에 표시합니다.
modalOpen 상태를 통해 모달 창을 열고 닫을 수 있습니다.