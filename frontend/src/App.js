import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './sites/home';
import AuthPage from './sites/auth_page';



export default function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
