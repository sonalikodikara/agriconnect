import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ToastProps {
    message: string;
    type: 'success' | 'error' | 'info';
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';

    return (
        <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center justify-between max-w-sm`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">×</button>
        </div>
    );
};

export default Toast;