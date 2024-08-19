import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

function Protect() {
  const { user } = useSelector((state: RootState) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default Protect;
