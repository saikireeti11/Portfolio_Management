"use client";

import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api/client";
import { getProfile, loginUser, registerUser } from "../api/authApi";
import AuthContext from "./AuthContext";

export default function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("portfolio_token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);
    getProfile(savedToken)
      .then((result) => setUser(result.user))
      .catch(() => {
        localStorage.removeItem("portfolio_token");
        setToken("");
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(credentials) {
    const result = await loginUser(credentials);
    localStorage.setItem("portfolio_token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result;
  }

  async function register(payload) {
    const result = await registerUser(payload);
    localStorage.setItem("portfolio_token", result.token);
    setToken(result.token);
    setUser(result.user);
    return result;
  }

  function logout() {
    localStorage.removeItem("portfolio_token");
    setToken("");
    setUser(null);
  }

  async function authRequest(path, options = {}) {
    return apiRequest(path, { ...options, token });
  }

  const value = useMemo(
    () => ({ token, user, loading, login, register, logout, authRequest }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
