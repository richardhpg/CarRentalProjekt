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
    // userData tipikusan a mock users tömbből jön
    // Biztonságból mindig a központi users tömbből vesszük a role-t,
    // hogy ha bárhol rosszul jönne, akkor is konzisztens legyen.
    const sourceUser =
      users.find((u) => u.id === userData.id) ??
      users.find(
        (u) =>
          u.email.toLowerCase() === userData.email?.trim().toLowerCase(),
      );

    const role = sourceUser?.role ?? userData.role ?? 'User';

    const normalizedUser = {
      id: sourceUser?.id ?? userData.id,
      name: sourceUser?.name ?? userData.name,
      email: sourceUser?.email ?? userData.email,
      role,
    };

    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
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
      role: 'User',
    };

    // TODO: Helyettesíteni API hívással (felhasználó regisztráció role mezővel)
    // pl. POST /api/register
    users.push(newUser);

    const normalizedUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };

    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
  };

  const updateUserRole = (userId, newRole) => {
    // TODO: Replace with API call to update user role
    const targetUser = users.find((u) => u.id === userId);
    if (targetUser) {
      targetUser.role = newRole;
    }

    setUser((prev) => {
      if (!prev || prev.id !== userId) return prev;
      const updated = { ...prev, role: newRole };
      localStorage.setItem('user', JSON.stringify(updated));
      return updated;
    });
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
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Egyedi hook a könnyebb használatért
export const useAuth = () => useContext(AuthContext);