import * as React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './sites/home';
import AuthPage from './sites/auth_page';
import UserContext from './utils/UserContext';
import Post from './sites/post';



export default function App() {
  const { user } = React.useContext(UserContext);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          { user ? (
            <Route path="/auth" element={<Navigate to="/" />} />
          ) : (
            <Route path="/auth" element={<AuthPage />} />
          )}
          <Route path="/" element={<Home user={user} />} />
          <Route path="/post/:post_id" element={<Post user={user} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
