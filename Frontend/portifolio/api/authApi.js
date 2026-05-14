import { apiRequest } from "./client";

export function loginUser(credentials) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

export function registerUser(payload) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getProfile(token) {
  return apiRequest("/api/auth/profile", { token });
}
