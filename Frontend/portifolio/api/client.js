export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function apiRequest(path, { token, ...options } = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {})
    }
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data.errors?.[0]?.message || data.message || "Request failed";
    throw new Error(message);
  }

  return data;
}
