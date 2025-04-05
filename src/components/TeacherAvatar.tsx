'use client';

import { useState } from 'react';
import Image from 'next/image';

interface TeacherAvatarProps {
  src: string;
  alt: string;
  department: string;
}

export default function TeacherAvatar({ src, alt, department }: TeacherAvatarProps) {
  const [error, setError] = useState(false);
  
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
  
  if (error) {
    return (
      <div 
        className={`w-full h-full flex items-center justify-center rounded-full ${getDepartmentColor(department)}`}
      >
        <span className="text-2xl font-bold text-gray-700">{getInitials(alt)}</span>
      </div>
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover rounded-full"
      onError={() => setError(true)}
    />
  );
} 