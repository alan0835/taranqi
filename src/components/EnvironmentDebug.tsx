'use client';

import { useState } from 'react';

export default function EnvironmentDebug() {
  const [showDebug, setShowDebug] = useState(false);
  const isProduction = process.env.NODE_ENV === 'production';
  
  // 仅在非生产环境中显示
  if (isProduction) return null;
  
  return (
    <div className="fixed bottom-2 right-2 z-50">
      <button 
        onClick={() => setShowDebug(!showDebug)}
        className="bg-gray-800 text-white p-2 rounded-full text-xs"
      >
        Debug
      </button>
      
      {showDebug && (
        <div className="p-4 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-80">
          <h3 className="font-bold text-sm mb-2">环境信息</h3>
          <dl className="space-y-1 text-xs">
            <dt className="font-semibold">环境:</dt>
            <dd>{process.env.NODE_ENV}</dd>
            
            <dt className="font-semibold">Base URL:</dt>
            <dd>{process.env.NEXT_PUBLIC_BASE_URL || '未设置'}</dd>
            
            <dt className="font-semibold">图片域名:</dt>
            <dd>{process.env.NEXT_PUBLIC_IMAGES_DOMAINS || '未设置'}</dd>
            
            <dt className="font-semibold">窗口尺寸:</dt>
            <dd>
              {typeof window !== 'undefined' 
                ? `${window.innerWidth}x${window.innerHeight}` 
                : '服务端渲染'}
            </dd>
          </dl>
          
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-xs text-gray-500">此调试面板仅在开发环境中可见</p>
          </div>
        </div>
      )}
    </div>
  );
} 