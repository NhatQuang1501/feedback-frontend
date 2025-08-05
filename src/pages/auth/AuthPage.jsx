import React, { useEffect } from "react";
import AuthTabs from "../../components/auth/AuthTabs";

const AuthPage = () => {
  // ==================== EFFECTS ====================
  useEffect(() => {
    document.title = "Đăng Nhập / Đăng Ký - Feedback Hub";
  }, []);

  // ==================== HANDLERS ====================
  const handleLogin = (formData) => {
    console.log("Login data:", formData);
    alert("Form đăng nhập hợp lệ!");
  };

  const handleRegister = (formData) => {
    console.log("Register data:", formData);
    alert("Form đăng ký hợp lệ!");
  };

  // ==================== RENDER ====================
  return <AuthTabs onLogin={handleLogin} onRegister={handleRegister} />;
};

export default AuthPage;
