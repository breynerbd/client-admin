import { Routes, Route } from "react-router-dom";
import { AuthPage } from "../../features/auth/pages/AuthPage.jsx"
import { DashboardPage } from "../layout/DashboardPage.jsx";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Publicas*/}
            <Route path="/" element={<AuthPage />} />

            {/* Protegido por Role */}
            <Route path="/dashboard/*" element={<DashboardPage />} />
        </Routes>
    )
}