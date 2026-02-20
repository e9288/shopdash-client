import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import type {AuthUser} from "../../api/auth";
import type { RegisterData } from "../../api/auth";
import {login as apiLogin, me as apiMe, logout as apiLogout, register as apiRegister} from "../../api/auth";

// AuthContext 에서 제공될 객체의 타입 선언
// AuthContext 에서 제공된 객체에서 활용하게 될 AuthContext 내부 선언된 변수나 함수의 형태를 선언함
type AuthState = {
    loading: boolean;
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    reloadMe: () => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
};

// <Provider></Provider> 내에서 사용될 context로 AuthContext를 선언한다.
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [loading, setLoading] = useState(true); // me() 실행동안 로딩플래그 설정
    const [user, setUser] = useState<AuthUser | null>(null); // 로그인 user 정보 보관
    const navigate = useNavigate(); // 로그인&로그아웃 후 라우팅 제어
    const location = useLocation(); // 로그인 성공 후 원래 페이지로 이동

    async function reloadMe() {
        const {user} = await apiMe(); // 응답에 맞춰 구조분해할당
        setUser(user);
    }

    async function login(email: string, password: string) {
        await apiLogin(email, password);
        await reloadMe();

        const from = (location.state as any)?.from as string | undefined;
        // ProtectedRoute에서 state={{from: location.pathname}}로 넘긴 값

        if(from) {
            navigate(from, {replace: true});
            return;
        }

        // 기존 페이지가 없을 시 role 기반 라우팅
        const fresh = await apiMe();
        const entryPath = fresh.user.role === "MASTER" ? "/app/master" : "/app/store";
        navigate(entryPath, {replace: true});
    }

    async function logout() {
        await apiLogout();
        setUser(null);
        navigate("/login", {replace: true});
    }

    async function register(data: RegisterData) {
        await apiRegister(data);
        await reloadMe();
        navigate("/app/store", {replace: true});
    }

    useEffect(() => {
        (async () => {
            try {
                await reloadMe();
            }catch {
                setUser(null);
            }finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if(loading) return;
        if(!user) return;
        if(location.pathname === "/app" || location.pathname === "/app/") {
            const entryPath = user.role === "MASTER" ? "/app/master" : "/app/store";
            navigate(entryPath, {replace: true});
        }
    }, [loading, user, location.pathname, navigate]);

    const value = useMemo<AuthState>(
        () => ({
            loading,
            user,
            login,
            logout,
            reloadMe,
            register,
        }),
        [loading, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if(!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return ctx;
}