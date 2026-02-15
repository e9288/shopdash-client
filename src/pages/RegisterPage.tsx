import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [storeName, setStoreName] = useState("");
    const [phone, setPhone] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // 유효성 검사
        if (!email.trim() || !password.trim() || !storeName.trim()) {
            setError("이메일, 비밀번호, 가맹점명은 필수입니다");
            return;
        }

        if (password !== passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다");
            return;
        }

        if (password.length < 6) {
            setError("비밀번호는 최소 6자 이상이어야 합니다");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            await register(email, password, storeName, phone);
            alert("가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
            navigate("/login");
        } catch (err: any) {
            setError(err?.message ?? "가입에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>🏪</div>
                    <h1 className={styles.title}>가맹점 가입</h1>
                    <p className={styles.subtitle}>ShopDash에 가맹점을 등록하세요</p>
                </div>

                <form onSubmit={onSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="storeName" className={styles.label}>
                            가맹점명 *
                        </label>
                        <input
                            id="storeName"
                            type="text"
                            placeholder="가맹점 이름"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            이메일 *
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
                        <label htmlFor="phone" className={styles.label}>
                            전화번호
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            비밀번호 *
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="passwordConfirm" className={styles.label}>
                            비밀번호 확인 *
                        </label>
                        <input
                            id="passwordConfirm"
                            type="password"
                            placeholder="••••••••"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            autoComplete="new-password"
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
                        {submitting ? "가입 중..." : "가입하기"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className={styles.backButton}
                        disabled={submitting}
                    >
                        로그인으로 돌아가기
                    </button>
                </form>
            </div>
        </div>
    );
}
