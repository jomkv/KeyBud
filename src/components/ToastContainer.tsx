import { ToastContainer as ToastifyContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { IUserState } from "../@types/userType";
import { useEffect } from "react";
import { IPostState } from "../@types/postType";

function ToastContainer() {
  const userState: IUserState = useSelector((state: RootState) => state.user);
  const postState: IPostState = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (userState.isError) {
      toast.warn(userState.message);
    }
  }, [userState.isError, userState.message]);

  useEffect(() => {
    if (userState.isSuccess) {
      toast.success(userState.message);
    }
  }, [userState.isSuccess, userState.message]);

  useEffect(() => {
    if (postState.isError) {
      toast.warn(postState.message);
    }
  }, [postState.isError, postState.message]);

  useEffect(() => {
    if (postState.isSuccess) {
      toast.success(postState.message);
    }
  }, [postState.isSuccess, postState.message]);

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
