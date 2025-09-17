/* const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"; */
const BASE_URL = "http://localhost:5000";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token && !headers.Authorization && !headers.authorization) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (err) {
    console.log(err); 
  }

  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText || "Request failed";
    const error = new Error(msg);
    error.status = res.status;
    error.body = data;
    throw error;
  }

  return data;
}
