import { Outlet } from "react-router-dom";
import { useAuth } from "../../shared/auth/AuthProvider";
import styles from "./AppLayout.module.css";

export default function AppLayout() {
    const { user, logout } = useAuth();

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <div className={styles.logo}>
                    <span className={styles.logoIcon}>🛍️</span>
                    <span className={styles.logoText}>ShopDash</span>
                </div>

                <div className={styles.headerRight}>
                    <div className={styles.userInfo}>
                        <div className={styles.userRole}>{user?.role}</div>
                        <div className={styles.userId}>{user?.userId}</div>
                    </div>
                    <button className={styles.logoutBtn} onClick={logout}>
                        로그아웃
                    </button>
                </div>
            </header>

            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
