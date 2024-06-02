import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Converter from "./components/Converter";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="contentWrapper">
          <Header />
          <Converter />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
