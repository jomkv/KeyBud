import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import Spinner from "../components/Spinner";

function Protect() {
  const { user, isLoading, isSuccess } = useUserContext();

  if (isLoading || !isSuccess) {
    return <Spinner />;
  }

  return user && isSuccess ? <Outlet /> : <Navigate to="/login" />;
}

export default Protect;
