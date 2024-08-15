import { ToastContainer as ToastifyContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IUserState } from "../@types/userType";
import { useEffect } from "react";

function ToastContainer() {
  const { isError, isSuccess, message }: IUserState = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (isError) {
      toast.warn(message);
    }
  }, [isError, message]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
    }
  }, [isSuccess, message]);

  return (
    <ToastifyContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

export default ToastContainer;
