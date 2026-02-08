import {Outlet} from "react-router-dom";
import {useAuth} from "../../shared/auth/AuthProvider";
/*
    JS Library
     - Outlet : /app 하위 라우트 레이아웃 내부 import 용
     - useAuth : header에서 user 표시용
*/

export default function AppLayout() {
    const {user, logout} = useAuth();

    return (
        <div style={{ padding: 16 }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                    <b>Shopdash</b>
                    <div style={{ fontSize: 12, opacity: 0.7}}>
                        {user?.userId} / {user?.role} {user?.storeId ? `(storeId: ${user.storeId})` : ""}
                    </div>
                </div>

                <button onClick={logout}>Logout</button>
            </header>

            <div style={{marginTop: 16}}>
                <Outlet />
                {/* /app/master || /app/store 랜더링 */}
            </div>
        </div>
    )
}