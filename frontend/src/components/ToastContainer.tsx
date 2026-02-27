import { memo } from "react";
import { X } from "lucide-react";
import useToastContext from "../hooks/context/useToastContext";

export default memo(function ToastContainer() {
    const { toasts, removeToast } = useToastContext()

    if (toasts.length === 0) return null;

    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`
                        flex items-center justify-between gap-3 rounded-lg px-4 py-3 shadow-lg
                        min-w-75 max-w-md animate-slide-in
                        ${getToastStyles(toast.type)}
                    `}
                >
                    <span className="text-sm font-medium text-white">{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="rounded p-1 text-white/80 transition-colors hover:text-white hover:bg-white/20"
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}
        </div>
    );
})

function getToastStyles(type: string): string {
    switch (type) {
        case 'success':
            return 'bg-green-500';
        case 'error':
            return 'bg-red-500';
        default:
            return 'bg-blue-500';
    }
}
