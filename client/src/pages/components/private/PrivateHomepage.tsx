import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

const PrivateHomepage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  if (currentUser) {
    const dashboardRoute =
      currentUser.type === "employer"
        ? "/employer/dashboard"
        : currentUser.type === "student"
        ? "/student/dashboard"
        : "/institute/dashboard";

    return <Navigate to={dashboardRoute} />;
  }

  return <Outlet />;
};

export default PrivateHomepage;
