import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./shared/auth/ProtectedRoute";
import AppLayout from "./pages/app/AppLayout";
import MasterHome from "./pages/app/MasterHome";
import StoreHome from "./pages/app/StoreHome";

export default function App() {
    return(
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/app"
                 element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
          >{/* /app 아래는 <ProtectedRoute> 컴포넌트를 통해 로그인 체크 동작이 선행된다. */}
              <Route path="master" element={<MasterHome />} />
              <Route path="store" element={<StoreHome />} />
          </Route>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="*" element={<Navigate to={"/app"} replace /> } />
      </Routes>
    );
}