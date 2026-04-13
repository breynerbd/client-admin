import { useState } from "react";
import { LoginForm } from "../components/LoginForm.jsx";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm.jsx";

export const AuthPage = () => {
    // 1. Estado para alternar entre Login y Recuperar Contraseña
    const [isForgot, setIsForgot] = useState(false);

    return (
        /* 1. Contenedor principal: Centrado total con fondo gris claro */
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

            <div className="w-full max-w-xl bg-white rounded-xl shadow-lg border border-gray-200 p-6 md:p-10">

                {/* 3. Contenedor de logo */}
                <div className="flex justify-center mb-6">
                    {/* 4. Logo Kinal Sports */}
                    <img
                        src="/src/assets/img/kinal_sports.png"
                        alt="Kinal Sports"
                        className="h-20 w-auto"
                    />
                </div>

                {/* 5. Bloque de título y subtítulo */}
                <div className="text-center mb-6">
                    {/* 6. Título Principal dinámico */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {isForgot ? "Recuperar Contraseña" : "Bienvenido de Nuevo"}
                    </h1>

                    {/* 7. Subtítulo / descripción dinámica */}
                    <p className="text-gray-600 text-base max-w-md mx-auto">
                        {isForgot
                            ? "Ingresa tu correo para recuperar tu contraseña"
                            : "Ingresa a tu cuenta de administrador de Kinal Sports"}
                    </p>
                </div>

                {/* SECCIÓN DEL FORMULARIO DINÁMICO */}
                {isForgot ? (
                    <ForgotPasswordForm
                        onSwitch={() => {
                            setIsForgot(false);
                        }}
                    />
                ) : (
                    <LoginForm onForgot={() => setIsForgot(true)} />
                )}
            </div>
        </div>
    );
};

export default AuthPage;