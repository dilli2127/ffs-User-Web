import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

export function showToast({ type, message, duration = 5000, id = uuidv4() }) {
  if (id && toast.isActive(id)) {
    return;
  }

  switch (type) {
    case "info":
      toast.info(message, {
        toastId: id,
        position: "top-right",
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "success":
      toast.success(message, {
        toastId: id,
        position: "top-right",
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "warn":
      toast.warn(message, {
        toastId: id,
        position: "top-right",
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    case "error":
      toast.error(message, {
        toastId: id,
        position: "top-right",
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      break;
    default:
      toast(message, {
        toastId: id,
        position: "top-right",
        autoClose: duration,
        closeOnClick: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
  }
}
