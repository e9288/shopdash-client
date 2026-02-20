import { apiFetch } from "./http";

export type AuthUser = {
    userId: string;
    role: "MASTER" | "STORE";
    storeId: string | null;
};

export async function login(email: string, password: string) {
    const res = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({email, password}),
    });

    if(!res.ok) throw new Error("login failed");
    return res.json();
}

export async function me(): Promise<{ user: AuthUser }> {
  const res = await apiFetch("/api/auth/me");
  if (!res.ok) throw new Error("not logged in");
  return res.json();
}

export async function logout() {
  const res = await apiFetch("/api/auth/logout", { method: "POST" });
  if (!res.ok) throw new Error("logout failed");
  return res.json();
}
<<<<<<< HEAD

export type RegisterData = {
    email: string;
    password: string;
    phone: string;
    storeName: string;
};

export async function register(data: RegisterData) {
    const res = await apiFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        const err: any = new Error(body.message ?? "회원가입에 실패했습니다");
        err.field = body.field ?? null;
        throw err;
    }

    return res.json();
}
=======
export async function register(email: string, password: string, storeName: string, phone?: string) {
  const res = await apiFetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, storeName, phone }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "registration failed");
  }
  return res.json();
}
>>>>>>> 425548392ee3a78421a975c2a0dd0b7546cc9bbc
