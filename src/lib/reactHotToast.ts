import toast from "react-hot-toast";

export declare interface ToastTriggerProps {
  message: string;
  type: "success" | "error" | "custom" | "";
}

// Notifier function trigger
export const ToastTrigger = ({ message, type }: ToastTriggerProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    // Pass custom type only if your message is a jsx template
    case "custom":
      toast.custom(message);
      break;
    default:
      toast(message);
  }
};
