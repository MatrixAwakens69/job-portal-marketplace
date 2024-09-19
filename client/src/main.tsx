import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import EmployerLanding from "./pages/landing/Employer.tsx";
import StudentLanding from "./pages/landing/Student.tsx";
import InstituteLanding from "./pages/landing/Institute.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employer" element={<EmployerLanding />} />
        <Route path="/student" element={<StudentLanding />} />
        <Route path="/institute" element={<InstituteLanding />} />
      </Routes>
    </Router>
  </StrictMode>
);
