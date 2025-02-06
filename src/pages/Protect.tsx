import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

function Protect() {
  const { user, isLoading, isSuccess } = useUserContext();

  if (isLoading || !isSuccess) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.username || !user.switchType) {
    return <Navigate to="/set-info" />;
  }

  return <Outlet />;
}

export default Protect;
