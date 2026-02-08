const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(input: string, init: RequestInit = {}) {
    const res = await fetch(`${API_BASE}${input}`, {
        ...init,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...(init.headers ?? {}),
        },
    });

    // 401 return 시 refresh 후 재시도
    if(res.status === 401 && input !== "/api/auth/refresh") {
        const refreshed = await fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {"Content-type": "application/json"},
        });

        if(refreshed.ok) {
            return fetch(`${API_BASE}${input}`, {
                ...init,
                credentials: "include",
                headers: {
                    "Content-type": "application/json",
                    ...(init.headers ?? {}),
                },
            });
        }
    }
    
    return res;
}