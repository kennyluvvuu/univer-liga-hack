import { type PropsWithChildren, useState, useCallback, useMemo, memo } from "react";
import { ToastContext } from "./ToastContext.ts";
import type { Toast, ToastType } from "./ToastContext.ts";
import ToastContainer from "../../components/ToastContainer.tsx";

export default memo(function ToastProvider({ children }: PropsWithChildren) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = useCallback((message: string, type: ToastType, duration: number = 3000) => {
        const id = crypto.randomUUID();
        const toast: Toast = { id, message, type, duration };

        setToasts((prev) => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((message: string, duration?: number) => {
        addToast(message, 'success', duration);
    }, [addToast]);

    const error = useCallback((message: string, duration?: number) => {
        addToast(message, 'error', duration);
    }, [addToast]);

    const contextValue = useMemo(() => ({
        toasts,
        addToast,
        removeToast,
        success,
        error,
    }), [toasts, addToast, removeToast, success, error]);

    return (
        <ToastContext value={contextValue}>
            {children}
            <ToastContainer />
        </ToastContext>
    );
})
