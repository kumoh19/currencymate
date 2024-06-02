# 실시간 환율 변환 프로젝트

## 개요
본 프로젝트는 React를 사용하여 환율 변환기 애플리케이션을 만드는 것이다. 한국수출입은행의 Open API를 사용하여 실시간 환율 데이터를 가져오고, 사용자가 입력한 금액을 선택한 통화로 변환하는 기능을 구현하였다.
- <b>installed Library</b>
```
npm install axios
npm install react-bootstrap bootstrap
npm i react-router-dom
```

## 주요 기능
1. 실시간 환율 데이터 가져오기: 한국수출입은행 API를 사용하여 최신 환율 데이터를 가져온다.
2. 환율 변환 계산기: 사용자가 입력한 금액을 선택한 통화로 변환한다.
3. UI 구성: 사용자 친화적인 인터페이스를 통해 금액 입력 및 통화 선택을 지원한다.

## API 사용
- API URL: https://www.koreaexim.go.kr/site/program/financial/exchangeJSON
- 예시 URL: https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey={YOUR_API_KEY}&searchdate=20230601&data=AP01
- API 키 설정: `.env` 파일에 API 키를 저장한다.
```REACT_APP_API_KEY=your_api_key_here
```