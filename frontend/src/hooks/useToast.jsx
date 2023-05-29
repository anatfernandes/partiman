import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function useToast() {
	const options = { position: "bottom-left" };
	// type values: "info", "success", "error", "warning"
	return function ({ text = "", type = null }) {
		if (!type) {
			toast(text, options);
			return;
		}

		toast[type](text, options);
	};
}

export { ToastContainer, useToast };
