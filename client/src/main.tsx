import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import EmployerLanding from "./pages/landing/Employer.tsx";
import StudentLanding from "./pages/landing/Student.tsx";
import InstituteLanding from "./pages/landing/Institute.tsx";
import EmployerSignup from "./pages/Register/EmployerSignup.tsx";
import StudentLogin from "./pages/Register/StudentLogin.tsx";
import EmployerSignin from "./pages/SignIn/EmployerSignin.tsx";
import EmployerDashboard from "./pages/Dashboard/EmployerDashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employer/register" element={<EmployerSignup />} />
        <Route path="/employer/login" element={<EmployerSignin />} />
        <Route path="/employer/dashboard" element={<EmployerDashboard />} />
        <Route path="/student/register" element={<StudentLogin />} />
        <Route path="/employer" element={<EmployerLanding />} />
        <Route path="/student" element={<StudentLanding />} />
        <Route path="/institute" element={<InstituteLanding />} />
      </Routes>
    </Router>
  </StrictMode>
);
