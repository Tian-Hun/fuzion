'use client';

import React, { createContext, useState, useCallback } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { useStyles } from './styles';

type ToastType = 'success' | 'error' | 'info';

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { styles } = useStyles();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [toastType, setToastType] = useState<ToastType>('info');

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        setMessage(message);
        setToastType(type);
        setOpen(true);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast.Provider>
                {children}
                <Toast.Root
                    className={styles.ToastRoot}
                    open={open}
                    onOpenChange={setOpen}
                    duration={3000}
                >
                    <Toast.Title className={`${styles.ToastTitle} ${toastType}`}>{message}</Toast.Title>
                </Toast.Root>
                <Toast.Viewport className={styles.ToastViewport} />
            </Toast.Provider>
        </ToastContext.Provider>
    );
};


