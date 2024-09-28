import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "./App.tsx";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import EmployerLanding from "./pages/landing/Employer.tsx";
import StudentLanding from "./pages/landing/Student.tsx";
import InstituteLanding from "./pages/landing/Institute.tsx";
import EmployerSignup from "./pages/Register/EmployerSignup.tsx";
import EmployerSignin from "./pages/SignIn/EmployerSignin.tsx";
import EmployerSignout from "./pages/SignOut/EmployerSignout.tsx";
import EmployerDashboard from "./pages/Dashboard/EmployerDashboard.tsx";
import StudentSignup from "./pages/Register/StudentSignup.tsx";
import StudentSignin from "./pages/SignIn/StudentSignin.tsx";
import StudentDashboard from "./pages/Dashboard/StudentDashboard.tsx";
import JobPosting from "./pages/JobPosting.tsx";
import InstituteSignin from "./pages/SignIn/InstituteSignin.tsx";
import PrivateEmployer from "./pages/components/private/PrivateEmployer.tsx";
import PrivateStudent from "./pages/components/private/PrivateStudent.tsx";
import PrivateInstitute from "./pages/components/private/PrivateInstitute.tsx";
import PrivateHomepage from "./pages/components/private/PrivateHomepage.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route element={<PrivateHomepage />}>
            <Route path="/" element={<App />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employer" element={<EmployerLanding />} />
          <Route path="/employer/register" element={<EmployerSignup />} />
          <Route path="/employer/login" element={<EmployerSignin />} />
          <Route element={<PrivateEmployer />}>
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/logout" element={<EmployerSignout />} />
          </Route>
          <Route path="/employer/create" element={<JobPosting />} />
          <Route path="/student" element={<StudentLanding />} />
          <Route path="/student/register" element={<StudentSignup />} />
          <Route path="/student/login" element={<StudentSignin />} />
          <Route element={<PrivateStudent />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
          </Route>
          <Route path="/institute" element={<InstituteLanding />} />
          <Route path="/institute/login" element={<InstituteSignin />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);
