import { useContext } from "react";
import { ToastContext } from "../../stores/toast/ToastContext.ts";

export default function useToastContext() {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be defined');
    return context;
}
