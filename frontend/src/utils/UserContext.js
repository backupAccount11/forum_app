import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  let [user, setUser] = useState(() => (
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  ));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
