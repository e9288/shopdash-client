import { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
import { useAuth } from "../shared/auth/AuthProvider";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
    const { register, loading, user } = useAuth();

    const [storeName, setStoreName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (!loading && user) {
        return (
            <div className={styles.redirecting}>
                <div className={styles.spinner}></div>
                <div className={styles.redirectingText}>Redirecting to dashboard...</div>
            </div>
        );
    }

    function validate() {
        const next: Record<string, string> = {};

        if (!storeName.trim()) next.storeName = "상호명을 입력해주세요";
        if (!email.trim()) next.email = "이메일을 입력해주세요";
        if (!phone.trim()) next.phone = "연락처를 입력해주세요";
        if (!password) next.password = "비밀번호를 입력해주세요";
        else if (password.length < 8) next.password = "비밀번호는 8자 이상이어야 합니다";
        if (password !== passwordConfirm) next.passwordConfirm = "비밀번호가 일치하지 않습니다";

        setErrors(next);
        return Object.keys(next).length === 0;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);

        try {
            await register({ storeName, email, phone, password });
        } catch (err: any) {
            const field = err?.field as string | null;
            if (field) {
                setErrors({ [field]: err.message });
            } else {
                setErrors({ form: err?.message ?? "회원가입에 실패했습니다. 다시 시도해주세요." });
            }
=======
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
>>>>>>> 425548392ee3a78421a975c2a0dd0b7546cc9bbc
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
<<<<<<< HEAD
                    <div className={styles.logo}>📊</div>
                    <h1 className={styles.title}>ShopDash</h1>
                    <p className={styles.subtitle}>스토어 계정 만들기</p>
                </div>

                <form onSubmit={onSubmit} className={styles.form} noValidate>
                    <div className={styles.inputGroup}>
                        <label htmlFor="storeName" className={styles.label}>상호명</label>
                        <input
                            id="storeName"
                            type="text"
                            placeholder="내 쇼핑몰"
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className={`${styles.input} ${errors.storeName ? styles.inputError : ""}`}
                            disabled={submitting}
                        />
                        {errors.storeName && <span className={styles.fieldError}>{errors.storeName}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>이메일</label>
=======
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
>>>>>>> 425548392ee3a78421a975c2a0dd0b7546cc9bbc
                        <input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
<<<<<<< HEAD
                            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                            disabled={submitting}
                        />
                        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phone" className={styles.label}>연락처</label>
=======
                            className={styles.input}
                            disabled={submitting}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            전화번호
                        </label>
>>>>>>> 425548392ee3a78421a975c2a0dd0b7546cc9bbc
                        <input
                            id="phone"
                            type="tel"
                            placeholder="010-0000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
<<<<<<< HEAD
                            autoComplete="tel"
                            className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
                            disabled={submitting}
                        />
                        {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>비밀번호</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="8자 이상 입력"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                            disabled={submitting}
                        />
                        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="passwordConfirm" className={styles.label}>비밀번호 확인</label>
                        <input
                            id="passwordConfirm"
                            type="password"
                            placeholder="비밀번호 재입력"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            autoComplete="new-password"
                            className={`${styles.input} ${errors.passwordConfirm ? styles.inputError : ""}`}
                            disabled={submitting}
                        />
                        {errors.passwordConfirm && <span className={styles.fieldError}>{errors.passwordConfirm}</span>}
                    </div>

                    {errors.form && <div className={styles.error}>{errors.form}</div>}

                    <button type="submit" disabled={submitting} className={styles.submitButton}>
                        {submitting ? "가입 중..." : "회원가입"}
                    </button>
                </form>

                <div className={styles.footer}>
                    이미 계정이 있으신가요?{" "}
                    <Link to="/login" className={styles.link}>로그인</Link>
                </div>
=======
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
>>>>>>> 425548392ee3a78421a975c2a0dd0b7546cc9bbc
            </div>
        </div>
    );
}
