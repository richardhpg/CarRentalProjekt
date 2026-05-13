import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (userData) => {
    setUser(userData.user);
    setAccessToken(userData.accessToken);
  };

  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/account/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setUser(null);
      setAccessToken(null);
    }
  };

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const AuthChecker = () => {
  const { user, setUser, setAccessToken, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
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

      const data = await response.json();

      if (data.checked) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        setLoading(false);
      } else {
        setUser(null);
        setAccessToken(null);
        setLoading(false);
        if (!["/login", "/register"].includes(location.pathname)) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error.message);
      setUser(null);
      setAccessToken(null);
      setLoading(false);
      if (!["/login", "/register"].includes(location.pathname)) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg font-medium">Betöltés...</span>
      </div>
    );
  }

  if (!user && !["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return <Outlet />;
};

export const useAuth = () => useContext(AuthContext);
