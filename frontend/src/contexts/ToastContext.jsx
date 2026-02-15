import React, { createContext, useContext, useState, useCallback } from 'react';
import { ToastContainer } from '../components/ui/sonner';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(
        (message, type = 'info', duration = 4000, action = null) => {
            const id = Date.now();
            const newToast = { id, message, type, action };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id);
                }, duration);
            }

            return id;
        },
        []
    );

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const success = useCallback(
        (message, duration = 4000, action = null) => {
            return addToast(message, 'success', duration, action);
        },
        [addToast]
    );

    const error = useCallback(
        (message, duration = 5000, action = null) => {
            return addToast(message, 'error', duration, action);
        },
        [addToast]
    );

    const info = useCallback(
        (message, duration = 4000, action = null) => {
            return addToast(message, 'info', duration, action);
        },
        [addToast]
    );

    const warning = useCallback(
        (message, duration = 4000, action = null) => {
            return addToast(message, 'warning', duration, action);
        },
        [addToast]
    );

    const value = React.useMemo(() => ({
        toasts, addToast, removeToast, success, error, info, warning
    }), [toasts, addToast, removeToast, success, error, info, warning]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        </ToastContext.Provider>
    );
}
