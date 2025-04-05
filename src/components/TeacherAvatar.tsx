'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface TeacherAvatarProps {
  src: string;
  alt: string;
  department: string;
}

export default function TeacherAvatar({ src, alt, department }: TeacherAvatarProps) {
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  
  // 在加载时检查路径，尝试修复常见的路径问题
  useEffect(() => {
    // 尝试修复路径 - 如果是相对路径但缺少前导斜杠
    if (src && !src.startsWith('/') && !src.startsWith('http')) {
      setImageSrc(`/${src}`);
    } else if (!src || src === 'undefined') {
      // 如果src为空或undefined，直接使用备用方案
      setError(true);
    } else {
      setImageSrc(src);
    }
  }, [src]);
  
  // 根据学科部门生成备用背景色
  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      '语文组': 'bg-blue-100',
      '数学组': 'bg-green-100',
      '英语组': 'bg-yellow-100',
      '物理组': 'bg-red-100',
      '化学组': 'bg-purple-100',
      '生物组': 'bg-orange-100',
      '政治组': 'bg-pink-100',
      '历史组': 'bg-indigo-100',
      '地理组': 'bg-cyan-100',
      '信息技术组': 'bg-lime-100',
      '音乐组': 'bg-emerald-100',
      '美术组': 'bg-amber-100',
      '体育组': 'bg-teal-100',
      '心理健康组': 'bg-violet-100',
    };
    return colors[department] || 'bg-gray-100';
  };
  
  // 从姓名生成首字母
  const getInitials = (name: string) => {
    return name.charAt(0);
  };
  
  // 如果发生错误或无有效图片路径，显示文字头像
  if (error || !imageSrc) {
    return (
      <div 
        className={`w-full h-full flex items-center justify-center rounded-full ${getDepartmentColor(department)}`}
      >
        <span className="text-2xl font-bold text-gray-700">{getInitials(alt)}</span>
      </div>
    );
  }
  
  // 尝试加载图片，如果失败则显示备用内容
  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover rounded-full"
      onError={() => setError(true)}
      priority
    />
  );
} 