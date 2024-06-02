import React from "react"

const Footer = () => (
  <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">환율 변환기</h5>
          <p>실시간 환율 데이터를 제공하여 간편하게 환율 변환을 도와드립니다.</p>
        </div>

        <hr className="clearfix w-100 d-md-none pb-0"/>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">유용한 링크</h5>
          <ul className="list-unstyled">
            <li><a href="https://www.koreaexim.go.kr">한국수출입은행</a></li>
            <li><a href="https://www.koreaexim.go.kr/site/program/financial/exchange">환율 정보</a></li>
            <li><a href="https://www.koreaexim.go.kr/site/program/financial/exchange/main">환율 계산기</a></li>
          </ul>
        </div>

        <div className="col-md-3 mb-md-0 mb-3">
          <h5 className="text-uppercase">연락처</h5>
          <ul className="list-unstyled">
            <li><a href="mailto:qkrthgus7026@gmail.com">qkrthgus7026@gmail.com</a></li>
            <li><a href="#!">문의하기</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div className="footer-copyright text-center py-3">
      © 2024 환율 변환기: <a href="https://yourwebsite.com"> </a>
    </div>
  </footer>
);

export default Footer;
