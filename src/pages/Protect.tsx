import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Spinner } from "react-bootstrap";
import FullscreenSpinner from "../components/FullscreenSpinner";

function Protect() {
  const { user, isLoading, isSuccess, isError } = useUserContext();
  const location = useLocation();

  if (isError) {
    return <Navigate to="/login" />;
  }

  if (isLoading || !isSuccess) {
    return <FullscreenSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // if (
  //   !user.username ||
  //   (!user.switchType && location.pathname !== "/set-info")
  // ) {
  //   return <Navigate to="/set-info" />;
  // }

  return <Outlet />;
}

export default Protect;
