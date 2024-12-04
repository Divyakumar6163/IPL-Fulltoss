// App.jsx
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./components/LogoAnimation.jsx";
import VerifyEmail from "./components/emailverify.jsx";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./pages/forgotpassword";
import SetNewPassword from "./pages/newpassword";
import Profile from "./components/Profile";
import PaymentPage from "./pages/PaymentPage";
import { checktoken } from "./API/userlogin.jsx";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
// export const ToLink = "http://localhost:5000";
export const ToLink = "https://ipl-fulltoss.onrender.com";
const App = () => {
  const access_token = useSelector((state) => state.auth.accessToken);
  const refresh_token = useSelector((state) => state.auth.refreshToken);
  useEffect(() => {
    checktoken(access_token, refresh_token);
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/:token/:userId" element={<SetNewPassword />} />
          <Route path="/verifyemail/:token" element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer draggable />
    </div>
  );
};

export default App;
