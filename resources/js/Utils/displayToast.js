import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../../css/toast.css";

const options = {
    autoClose: 5000,
    draggable: true,
    style: {
        border: "0.5px solid #8a8989",
    },
};

export const displayToast = (customToast, type) => {
    switch (type) {
        case "info":
            toast.info(customToast, options);
            break;
        case "success":
            toast.success(customToast, options);
            break;
        case "error":
            toast.error(customToast, options);
            break;
        case "warning":
            toast.warning(customToast, options);
            break;
        default:
            toast.error(customToast, options);
    }
};
