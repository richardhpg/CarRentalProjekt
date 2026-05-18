import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

let refreshInFlight = null;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuth = (nextUser, nextAccessToken) => {
    setUser(nextUser);
    setAccessToken(nextAccessToken);
  };

  const clearAuth = () => {
    setAuth(null, null);
  };

  const login = (userData) => {
    setAuth(userData?.user ?? null, userData?.accessToken ?? null);
    setLoading(false);
  };

  const logout = async () => {
    try {
      const headers = accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : {};

      await fetch("http://localhost:3000/api/account/logout", {
        method: "POST",
        headers,
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      clearAuth();
      setLoading(false);
    }
  };

  const refreshAuth = () => {
    if (refreshInFlight) {
      return refreshInFlight;
    }

    refreshInFlight = (async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "http://localhost:3000/api/account/check-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          clearAuth();
          return;
        }

        const data = await response.json();

        if (data?.checked) {
          setAuth(data.user ?? null, data.accessToken ?? null);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Auth check error:", error.message);
        clearAuth();
      } finally {
        setLoading(false);
        refreshInFlight = null;
      }
    })();

    return refreshInFlight;
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
