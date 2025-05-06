import React from 'react';
import './App.css';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import { Navigation } from './components/navbar/Navigation';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './components/MainPage';
import Payment from './components/cryptoPayment/Payment';



function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/payment/:voucher" element={<Payment />} />
    </Routes>
    
  );
}

export default App;
