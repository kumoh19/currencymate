import React from "react";
import "./Modal.css";
import { Button } from "react-bootstrap";

const HistoryModal = ({ open, onClose, history }) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>변환 내역</h2>
        <Button variant="dark" onClick={onClose}>닫기</Button>
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.amount} {item.fromCurrency} = {item.converted} {item.toCurrency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryModal;
