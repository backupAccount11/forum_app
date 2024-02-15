import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './sites/home';
import AuthPage from './sites/auth_page';

import { useContext } from "react";
import UserContext from './utils/UserContext';
import { Button } from '@mui/material';



export default function App() {
  let { user } = useContext(UserContext);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
