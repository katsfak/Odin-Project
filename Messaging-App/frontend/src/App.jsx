import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import { useAuth } from "./utils/AuthContext";

// Pages
import ChatPage from "./pages/ChatPage";
import DashboardPage from "./pages/DashboardPage";
import FriendsPage from "./pages/FriendsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";

function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: "1.2rem", color: "#999" }}>Loading...</div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
}

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#f5f5f5",
        }}
      >
        <div style={{ fontSize: "1.2rem", color: "#999" }}>Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<DashboardPage />} />}
        />
        <Route
          path="/chat/:userId"
          element={<ProtectedRoute element={<ChatPage />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<ProfilePage />} />}
        />
        <Route
          path="/friends"
          element={<ProtectedRoute element={<FriendsPage />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
