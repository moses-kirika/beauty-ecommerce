"use client";

import { useEffect, useState } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'info' | 'warning';
    onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));

        // Auto close
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for exit animation
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: 'fa-check-circle',
        info: 'fa-info-circle',
        warning: 'fa-exclamation-triangle'
    };

    const colors = {
        success: '#3A5F4A',
        info: '#3B82F6',
        warning: '#F59E0B'
    };

    return (
        <div
            className="notification"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: colors[type],
                color: 'white',
                padding: '16px 32px',
                borderRadius: '999px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                zIndex: 10000,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                maxWidth: '350px',
                transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
                transform: isVisible ? 'translateX(0)' : 'translateX(400px)',
                opacity: isVisible ? 1 : 0,
            }}
        >
            <i className={`fas ${icons[type]} notification-icon`}></i>
            <span>{message}</span>
        </div>
    );
}
