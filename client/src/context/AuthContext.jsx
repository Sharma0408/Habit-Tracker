// client/src/context/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, getProfile } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // { name, email, xp, level, streak }
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking localStorage on app load

  // On app load — check if token exists in localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = async (email, password) => {
    const data = await loginUser(email, password);
    // data = { token, user: { name, email, xp, level, streak } }
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  // Register
  const register = async (name, email, password) => {
    const data = await registerUser(name, email, password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  // Refresh user profile from backend (call after earning XP)
  const refreshUser = async () => {
    const data = await getProfile();
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook — use this in any component instead of useContext(AuthContext)
export const useAuth = () => useContext(AuthContext);