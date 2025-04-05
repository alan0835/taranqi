'use client';

import { useState, useEffect } from 'react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  type: AlertType;
  message: string;
  description?: string;
  duration?: number; // 单位：毫秒，默认4000ms
  onClose?: () => void;
  className?: string;
}

export default function AlertMessage({
  type = 'info',
  message,
  description,
  duration = 4000,
  onClose,
  className = '',
}: AlertMessageProps) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);
  
  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };
  
  if (!visible) return null;
  
  // 根据类型设置不同的样式
  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-500',
          icon: 'text-green-500',
          svg: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-500',
          icon: 'text-red-500',
          svg: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-500',
          icon: 'text-yellow-500',
          svg: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ),
        };
      case 'info':
      default:
        return {
          container: 'bg-blue-50 border-blue-500',
          icon: 'text-blue-500',
          svg: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };
  
  const styles = getTypeStyles();
  
  return (
    <div className={`rounded-lg border-l-4 p-4 ${styles.container} ${className}`} role="alert">
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {styles.svg}
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium">{message}</h3>
          {description && <div className="mt-2 text-sm">{description}</div>}
        </div>
        <button 
          type="button" 
          className="ml-auto -mx-1.5 -my-1.5 p-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={handleClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

// 简易使用方法
export const showSuccess = (message: string, description?: string) => {
  // 在实际应用中，这里可以通过状态管理或事件系统来触发消息显示
  console.log('Success:', message, description);
};

export const showError = (message: string, description?: string) => {
  console.log('Error:', message, description);
};

export const showWarning = (message: string, description?: string) => {
  console.log('Warning:', message, description);
};

export const showInfo = (message: string, description?: string) => {
  console.log('Info:', message, description);
}; 