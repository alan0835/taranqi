'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// 占位符组件
const MapPlaceholder = () => (
  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
    <div className="text-center">
      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-gray-500">地图加载中...</p>
    </div>
  </div>
);

// 使用动态导入确保AMap组件只在客户端加载
const AMapComponent = dynamic(
  () => import('./map/AMapComponent').then(mod => mod.default),
  {
    ssr: false, // 禁用服务器端渲染
    loading: () => <MapPlaceholder />
  }
);

// 父组件使用useEffect确保仅在客户端挂载后渲染地图
export default function ClientAMapComponent(props: any) {
  // 使用state追踪客户端挂载状态
  const [mounted, setMounted] = useState(false);
  
  // 仅在客户端挂载后显示地图
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  if (!mounted) {
    return <MapPlaceholder />;
  }
  
  // 使用key属性确保每次卸载/挂载时组件被完全重新创建
  return (
    <Suspense fallback={<MapPlaceholder />}>
      <AMapComponent key={`amap-${Date.now()}`} {...props} />
    </Suspense>
  );
} 