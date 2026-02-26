import React, { createContext, useContext, useEffect, useState } from "react";
import * as api from "./api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async () => {
    try {
      setLoading(true);
      const currentUser = await api.getCurrentUser(token);
      setUser(currentUser);
      setError(null);
    } catch (err) {
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      const data = await api.register(username, email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const login = async (email, password) => {
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("token", data.token);
      setError(null);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await api.logout(token);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = (userData) => {
    setUser({ ...user, ...userData });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
