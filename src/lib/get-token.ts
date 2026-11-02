import { authClient } from "@/lib/auth-client";

export async function getToken(): Promise<string | null> {
  const { data, error } = await authClient.token();
  if (error || !data) return null;
  return data.token;
}
