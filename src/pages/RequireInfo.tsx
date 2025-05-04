import { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import FullscreenSpinner from "../components/FullscreenSpinner";

const RequireInfo = ({ children }: { children: JSX.Element }) => {
  const { user, isLoading, isSuccess } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (
        user &&
        (!user?.username || !user?.switchType) &&
        location.pathname !== "/set-info"
      ) {
        navigate("/set-info");
      }
    }
  }, [user, isLoading, isSuccess, navigate]);

  if (isLoading && !isSuccess) {
    return <FullscreenSpinner />;
  }

  return children;
};

export default RequireInfo;
