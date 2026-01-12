"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // localStorage-аас user болон token-ийг унших
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
      }
    }

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  // User нэвтрэх
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    if (authToken) {
      localStorage.setItem("token", authToken);
    }
  };

  // User гарах
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // User мэдээлэл шинэчлэх
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // User нэвтэрсэн эсэхийг шалгах
  const isAuthenticated = () => {
    return user !== null;
  };

  // User ID авах
  const getUserId = () => {
    return user?._id || user?.id || null;
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated,
    getUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook: Auth context ашиглах
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
