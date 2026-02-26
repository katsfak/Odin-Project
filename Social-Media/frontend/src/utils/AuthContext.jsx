import React, { createContext, useEffect, useState } from "react";
import * as api from "./api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if token is valid on mount
  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
    }
  }, []);

  async function verifyToken() {
    try {
      const currentUser = await api.getCurrentUser(token);
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Token verification failed:", err);
      localStorage.removeItem("token");
      setToken(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }

  async function register(username, email, password, confirmPassword) {
    try {
      const data = await api.register(
        username,
        email,
        password,
        confirmPassword,
      );
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      throw err;
    }
  }

  async function login(email, password) {
    try {
      const data = await api.login(email, password);
      setToken(data.token);
      setUser(data.user);
      setIsAuthenticated(true);
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      throw err;
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  }

  async function updateUser(updates) {
    try {
      const updated = await api.updateProfile(user.id, token, updates);
      setUser({ ...user, ...updated });
      return updated;
    } catch (err) {
      throw err;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
