import { createContext, useState, useContext, useEffect } from 'react';
import { users } from '../mock/data.js';

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
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = ({ name, email, password, phone, age }) => {
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase(),
    );

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name: name.trim(),
      age: age ? Number(age) : undefined,
      email: email.trim(),
      password,
      contact_email: email.trim(),
      contact_phoneNumber: phone || '',
    };

    // TODO: Replace with API call
    // const response = await fetch('/api/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newUser),
    // });
    // const data = await response.json();
    // setUser(data.user);
    users.push(newUser);
    setUser({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    });
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }),
    );
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Egyedi hook a könnyebb használatért
export const useAuth = () => useContext(AuthContext);