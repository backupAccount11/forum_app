import React, { createContext, useState } from 'react';
import Cookies from 'universal-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const cookies = new Cookies();

  let [user, setUser] = useState(() => (
    cookies.get('user') ? cookies.get('user') : null
  ));

  const handleSetUser = (userData) => {
    cookies.set('user', userData, { path: '/' });
    setUser(userData);
  };

  const handleRemoveUser = () => {
    cookies.remove('user', { path: '/' });
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleSetUser, handleRemoveUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
