import { useState } from "react";
import { useAuth } from "../shared/auth/AuthProvider";

export default function LoginPage() {
    const {login, loading, user} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if(!loading && user) {
        /* 로그인 처리된 경우 Redirecting... 노출, 상위 Provider가 /app/* 으로 실제 redirection 처리 */
        return <div style={{padding: 24}}>Redirecting...</div>;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault(); // 기본 동작 방지
        setSubmitting(true);
        setError(null);

        try {
            await login(email, password);
        }catch (err: any) {
            setError(err?.message ?? "login failed");
        }finally {
            setSubmitting(false);
        }
    }

    return (
        <div style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
            <h1 style={{ fontSize: 20, marginBottom: 12 }}>ShopDash Login</h1>

            <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />
                {/* 이메일 입력 */}

                <input
                    placeholder="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                />
                {/* 비밀번호 입력 */}

                <button disabled={submitting} type="submit">
                    {submitting ? "Signing in..." : "Sign in"}
                </button>
                {/* 로그인 버튼 */}

                {error && <div style={{ color: "crimson" }}>{error}</div>}
                {/* 에러 표시 */}
            </form>
        </div>
    );
}