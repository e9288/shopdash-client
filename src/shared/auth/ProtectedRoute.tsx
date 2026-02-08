import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute ({children}: {children: React.ReactNode}) {
    /*
    * 로그인 검증 후 실패 시 /login 페이지로 분기
    */
    const {loading, user} = useAuth();
    const location = useLocation();

    if(loading) {
        return <div style={{padding: 24}}>Loading...</div>;
    }

    if(!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
        // 비 로그인 => /login + from에 원래 목적지 저장
    }

    return <>{children}</>;
    // 보호 된 화면 렌더링
}