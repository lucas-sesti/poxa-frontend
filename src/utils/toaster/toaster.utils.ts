import {
  colorFeedbackErrorMedium,
  colorFeedbackSuccessMedium,
} from "../../styles/settings/styles";
import toast, { DefaultToastOptions } from "react-hot-toast";

export const toasterOptions: DefaultToastOptions = {
  position: "bottom-center",
  success: {
    duration: 3000,
    style: {
      background: colorFeedbackSuccessMedium,
      color: "white",
    },
    icon: "🔥",
  },
  error: {
    duration: 5000,
    style: {
      background: colorFeedbackErrorMedium,
      color: "white",
    },
    icon: "😫",
  },
  loading: {
    duration: 10000,
  },
};

export function showToast(
  message: string,
  type: "success" | "error" | "loading",
  duration?: number
): string {
  switch (type) {
    case "success":
      return toast.success(message, {
        duration: duration || toasterOptions.success.duration,
      });
    case "error":
      return toast.error(message);
    case "loading":
      return toast.loading(message, {
        duration: duration || toasterOptions.loading.duration,
      });
  }
}
