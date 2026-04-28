import { createContext, useState, useContext, useEffect } from 'react';
import { users } from '../mock/data.js';
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    
    const storedUser = localStorage.getItem('user');
    Cookies.get("refreshToken");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
  
  };

  const register = ({ name, email, password, phone, age }) => {
    
  };

  const updateUserRole = (userId, newRole) => {

  };

  const logout = () => {
   
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Egyedi hook a könnyebb használatért
export const useAuth = () => useContext(AuthContext);