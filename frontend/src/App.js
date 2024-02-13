import * as React from 'react';
import './App.css';

import AuthPage from './sites/auth_page';
import { UserProvider } from './utils/UserContext';


export default function App() {
  return (
    <UserProvider>
      <AuthPage />
    </UserProvider>
  );
}