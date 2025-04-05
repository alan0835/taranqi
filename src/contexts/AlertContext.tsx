'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import AlertMessage from '@/components/ui/AlertMessage';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  id: string;
  type: AlertType;
  message: string;
  description?: string;
}

interface AlertContextType {
  alerts: Alert[];
  showAlert: (type: AlertType, message: string, description?: string) => void;
  showSuccess: (message: string, description?: string) => void;
  showError: (message: string, description?: string) => void;
  showWarning: (message: string, description?: string) => void;
  showInfo: (message: string, description?: string) => void;
  removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const removeAlert = useCallback((id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const showAlert = useCallback((type: AlertType, message: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setAlerts(prev => [...prev, { id, type, message, description }]);
    return id;
  }, []);

  const showSuccess = useCallback((message: string, description?: string) => {
    return showAlert('success', message, description);
  }, [showAlert]);

  const showError = useCallback((message: string, description?: string) => {
    return showAlert('error', message, description);
  }, [showAlert]);

  const showWarning = useCallback((message: string, description?: string) => {
    return showAlert('warning', message, description);
  }, [showAlert]);

  const showInfo = useCallback((message: string, description?: string) => {
    return showAlert('info', message, description);
  }, [showAlert]);

  const contextValue: AlertContextType = {
    alerts,
    showAlert,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeAlert,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      {/* 显示所有当前的警告/通知 */}
      <div className="fixed top-4 right-4 z-50 w-full max-w-md space-y-2">
        {alerts.map(alert => (
          <AlertMessage
            key={alert.id}
            type={alert.type}
            message={alert.message}
            description={alert.description}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlerts() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
} 