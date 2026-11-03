import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/get-token";

export async function authFetch(path: string, options: RequestInit = {}) {
  const token = await getToken();
  if (!token) throw new Error("You are not logged in");

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });
}
