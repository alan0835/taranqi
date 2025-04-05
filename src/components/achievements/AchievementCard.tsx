'use client';

import { Achievement } from '@/data/achievementsData';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface AchievementCardProps {
  achievement: Achievement;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
  showLevel?: boolean;
}

export default function AchievementCard({
  achievement,
  size = 'medium',
  showCategory = true,
  showLevel = true,
}: AchievementCardProps) {
  const [imageError, setImageError] = useState(false);
  
  // 根据尺寸设置样式
  const getImageSize = () => {
    switch (size) {
      case 'small':
        return 'h-40';
      case 'large':
        return 'h-64';
      case 'medium':
      default:
        return 'h-52';
    }
  };
  
  const getTitleSize = () => {
    switch (size) {
      case 'small':
        return 'text-lg';
      case 'large':
        return 'text-2xl';
      case 'medium':
      default:
        return 'text-xl';
    }
  };
  
  const getSummaryLines = () => {
    switch (size) {
      case 'small':
        return 'line-clamp-2';
      case 'large':
        return 'line-clamp-4';
      case 'medium':
      default:
        return 'line-clamp-3';
    }
  };

  // 获取成果级别对应的颜色
  const getLevelColor = () => {
    switch (achievement.level) {
      case '国家级':
        return 'bg-red-100 text-red-800';
      case '省级':
        return 'bg-orange-100 text-orange-800';
      case '市级':
        return 'bg-green-100 text-green-800';
      case '区级':
        return 'bg-blue-100 text-blue-800';
      case '校级':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取成果类别对应的颜色
  const getCategoryColor = () => {
    switch (achievement.category) {
      case '教师荣誉':
        return 'bg-blue-100 text-blue-800';
      case '学生荣誉':
        return 'bg-green-100 text-green-800';
      case '学校荣誉':
        return 'bg-purple-100 text-purple-800';
      case '科研成果':
        return 'bg-yellow-100 text-yellow-800';
      case '特色项目':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 格式化日期显示
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <Link href={`/achievements/${achievement.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className={`relative ${getImageSize()} w-full`}>
          <Image
            src={imageError ? '/placeholder-image.jpg' : achievement.coverImage}
            alt={achievement.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
          {achievement.featured && (
            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 text-xs font-bold rounded">
              特色成果
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-2">
            {showCategory && (
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor()}`}>
                {achievement.category}
              </span>
            )}
            {showLevel && (
              <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor()}`}>
                {achievement.level}
              </span>
            )}
          </div>
          
          <h2 className={`${getTitleSize()} font-bold mb-2 line-clamp-2`}>{achievement.title}</h2>
          
          <p className={`text-gray-600 text-sm ${getSummaryLines()} flex-1`}>
            {achievement.summary}
          </p>
          
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 text-sm">
              {formatDate(achievement.date)}
            </span>
            <span className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
              查看详情
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 