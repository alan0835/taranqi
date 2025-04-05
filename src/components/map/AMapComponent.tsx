'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    AMap?: any;
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

interface AMapComponentProps {
  longitude: number;
  latitude: number;
  title: string;
  height?: string;
  zoom?: number;
}

export default function AMapComponent({
  longitude,
  latitude,
  title,
  height = "400px",
  zoom = 15
}: AMapComponentProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const pluginsLoaded = useRef(false);

  useEffect(() => {
    // 检查地图容器是否存在
    if (!mapContainerRef.current) return;

    // 设置高德地图安全密钥（如果有）
    const securityCode = process.env.NEXT_PUBLIC_AMAP_SECURITY_CODE;
    if (securityCode) {
      window._AMapSecurityConfig = {
        securityJsCode: securityCode,
      };
    }

    // 用于清理地图实例的函数
    const destroyMap = () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      // 重置插件加载标志
      pluginsLoaded.current = false;
    };

    // 如果已经加载了AMap，则直接初始化地图
    if (window.AMap) {
      initMap();
      return destroyMap;
    }

    // 检查是否已经存在高德地图脚本
    const existingScript = document.querySelector('script[src*="webapi.amap.com/maps"]');
    if (existingScript) {
      // 如果脚本已存在但AMap对象还未加载完成，等待加载
      if (!window.AMap) {
        existingScript.addEventListener('load', initMap);
      } else {
        initMap();
      }
      return destroyMap;
    }

    // 加载高德地图JS API
    const apiKey = process.env.NEXT_PUBLIC_AMAP_KEY || 'demo'; // 默认使用demo key，但建议使用您自己的key
    const script = document.createElement('script');
    script.src = `https://webapi.amap.com/maps?v=2.0&key=${apiKey}`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    // 返回清理函数，只清理地图实例，不尝试删除脚本
    return destroyMap;
  }, [longitude, latitude, zoom, title]);

  // 初始化地图
  const initMap = () => {
    if (!window.AMap || !mapContainerRef.current) return;

    // 创建地图实例
    mapInstanceRef.current = new window.AMap.Map(mapContainerRef.current, {
      zoom,
      center: [longitude, latitude],
      resizeEnable: true,
    });

    // 添加标记
    const marker = new window.AMap.Marker({
      position: [longitude, latitude],
      title,
      animation: 'AMAP_ANIMATION_DROP',
    });

    // 创建信息窗体
    const infoWindow = new window.AMap.InfoWindow({
      content: `<div style="padding: 10px;">
                  <h3 style="margin: 0 0 5px 0;">${title}</h3>
                  <p style="margin: 0;">经纬度: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}</p>
                </div>`,
      offset: new window.AMap.Pixel(0, -30),
    });

    // 将标记添加到地图
    mapInstanceRef.current.add(marker);

    // 点击标记时打开信息窗体
    marker.on('click', () => {
      infoWindow.open(mapInstanceRef.current, marker.getPosition());
    });

    // 默认打开信息窗体
    infoWindow.open(mapInstanceRef.current, [longitude, latitude]);

    // 加载地图控件插件，但确保只加载一次
    if (!pluginsLoaded.current) {
      try {
        // 先加载插件，再创建和添加控件
        window.AMap.plugin(['AMap.Scale', 'AMap.ToolBar'], () => {
          try {
            // 确保地图实例仍然存在
            if (mapInstanceRef.current) {
              // 添加比例尺控件
              const scale = new window.AMap.Scale();
              mapInstanceRef.current.addControl(scale);
              
              // 添加工具栏控件
              const toolBar = new window.AMap.ToolBar();
              mapInstanceRef.current.addControl(toolBar);
              
              // 标记插件已加载
              pluginsLoaded.current = true;
            }
          } catch (error) {
            console.error('添加地图控件时出错:', error);
          }
        });
      } catch (error) {
        console.error('加载地图插件时出错:', error);
      }
    }
  };

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height, borderRadius: '8px', overflow: 'hidden' }} />
  );
} 