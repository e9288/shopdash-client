import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../shared/auth/AuthProvider";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
    const {login, loading, user} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 로그인 처리된 경우 Redirecting 화면 표시
    if(!loading && user) {
        return (
            <div className={styles.redirecting}>
                <div className={styles.spinner}></div>
                <div className={styles.redirectingText}>Redirecting to dashboard...</div>
            </div>
        );
    }

    async function onDevFill() {
        const devEmail = "storeA@dashboard.com";
        const devPassword = "store123!";
        setEmail(devEmail);
        setPassword(devPassword);
        setError(null);
        setSubmitting(true);
        try {
            await login(devEmail, devPassword);
        } catch (err: any) {
            setError(err?.message ?? "로그인에 실패했습니다.");
        } finally {
            setSubmitting(false);
        }
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // 유효성 검사
        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 입력해주세요");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await login(email, password);
        } catch (err: any) {
            setError(err?.message ?? "로그인에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>📊</div>
                    <h1 className={styles.title} onDoubleClick={onDevFill} style={{ cursor: "default", userSelect: "none" }}>ShopDash</h1>
                    <p className={styles.subtitle}>쇼핑몰 통합 대시보드</p>
                </div>

                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            이메일
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            비밀번호
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    {error && <div className={styles.error}>{error}</div>}

                    <button
                        type="submit"
                        disabled={submitting}
                        className={styles.submitButton}
                    >
                        {submitting ? "로그인 중..." : "로그인"}
                    </button>
                </form>

                <div className={styles.footer}>
                    아직 계정이 없으신가요?{" "}
                    <Link to="/register" className={styles.link}>회원가입</Link>
                </div>
            </div>
        </div>
    );
}