import React from 'react';
import './App.css';
import { BrowserRouter, Routes } from "react-router-dom";
import routes from './routes';


function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        {routes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
