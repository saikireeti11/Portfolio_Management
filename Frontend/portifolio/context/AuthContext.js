"use client";

import { createContext } from "react";

const AuthContext = createContext({
  token: "",
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  authRequest: async () => {}
});

export default AuthContext;
