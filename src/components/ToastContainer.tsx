import { ToastContainer as ToastifyContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ToastContainer() {
  return (
    <ToastifyContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="dark"
    />
  );
}

export default ToastContainer;
