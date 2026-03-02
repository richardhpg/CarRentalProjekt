// context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Induláskor ellenőrizzük, van-e tárolt felhasználó (pl. localStorage-ban)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // login logika

    // POST
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
         user,
         login,
         logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Egyedi hook a könnyebb használatért
export const useAuth = () => useContext(AuthContext);