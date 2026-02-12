import { useEffect, useState } from 'react';
import {
    AlertCircle,
    CheckCircle,
    Info,
    AlertTriangle,
    X,
} from 'lucide-react';

const toastConfig = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-900',
        iconColor: 'text-green-600',
        actionColor:
            'bg-green-600 hover:bg-green-700 text-white',
    },
    error: {
        icon: AlertCircle,
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-900',
        iconColor: 'text-red-600',
        actionColor: 'bg-red-600 hover:bg-red-700 text-white',
    },
    warning: {
        icon: AlertTriangle,
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-900',
        iconColor: 'text-yellow-600',
        actionColor:
            'bg-yellow-600 hover:bg-yellow-700 text-white',
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-900',
        iconColor: 'text-blue-600',
        actionColor: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
};

export function Toast({ toast, onClose }) {
    const [isClosing, setIsClosing] = useState(false);
    const config = toastConfig[toast.type] || toastConfig.info;
    const Icon = config.icon;

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose(toast.id);
        }, 300);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, 6000);

        return () => clearTimeout(timer);
    }, [toast.id]);

    return (
        <div
            className={`transform transition-all duration-300 ${isClosing
                    ? 'translate-x-full opacity-0'
                    : 'translate-x-0 opacity-100'
                }`}
        >
            <div
                className={`flex items-start gap-3 rounded-lg border ${config.borderColor} ${config.bgColor} px-4 py-3 shadow-lg`}
            >
                <Icon size={20} className={`mt-0.5 shrink-0 ${config.iconColor}`} />
                <div className="flex-1">
                    <p className={`text-sm font-medium ${config.textColor}`}>
                        {toast.message}
                    </p>
                    {toast.action && (
                        <button
                            onClick={() => {
                                toast.action.handler();
                                handleClose();
                            }}
                            className={`mt-2 text-xs font-semibold ${config.actionColor} rounded px-2 py-1 transition-colors`}
                        >
                            {toast.action.label}
                        </button>
                    )}
                </div>
                <button
                    onClick={handleClose}
                    className={`mt-0.5 shrink-0 text-gray-400 transition-colors hover:${config.iconColor}`}
                    aria-label="Close notification"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}

export function ToastContainer({ toasts, onRemoveToast }) {
    return (
        <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <Toast toast={toast} onClose={onRemoveToast} />
                </div>
            ))}
        </div>
    );
}
