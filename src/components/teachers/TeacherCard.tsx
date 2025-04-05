'use client';

import { Teacher } from '@/data/teachersData';
import Image from 'next/image';
import Link from 'next/link';

interface TeacherCardProps {
  teacher: Teacher;
  size?: 'small' | 'medium' | 'large';
  showDepartment?: boolean;
  showTitle?: boolean;
  showResearch?: boolean;
}

export default function TeacherCard({
  teacher,
  size = 'medium',
  showDepartment = true,
  showTitle = true,
  showResearch = true,
}: TeacherCardProps) {
  // 根据尺寸设置样式
  const getAvatarSize = () => {
    switch (size) {
      case 'small':
        return 'w-16 h-16';
      case 'large':
        return 'w-32 h-32';
      case 'medium':
      default:
        return 'w-24 h-24';
    }
  };
  
  const getNameSize = () => {
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
  
  return (
    <Link href={`/teachers/${teacher.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="flex p-4">
          <div className={`relative ${getAvatarSize()} flex-shrink-0`}>
            <Image
              src={teacher.avatar}
              alt={teacher.name}
              fill
              className="object-cover rounded-full"
            />
            {teacher.title === '特级教师' && (
              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded">
                特级
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <h2 className={`${getNameSize()} font-bold`}>{teacher.name}</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {showDepartment && (
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  {teacher.department}
                </span>
              )}
              {showTitle && (
                <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                  {teacher.title}
                </span>
              )}
              {teacher.position && (
                <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                  {teacher.position}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{teacher.education}</p>
            {size !== 'small' && (
              <p className="text-sm text-gray-600">教龄: {teacher.teachingYears}年</p>
            )}
          </div>
        </div>
        <div className="px-4 pb-4">
          <p className={`text-gray-600 ${getSummaryLines()} text-sm`}>
            {teacher.introduction}
          </p>
          {showResearch && teacher.researchFields && teacher.researchFields.length > 0 && (
            <div className="mt-3 flex justify-between items-center">
              <div>
                <div className="flex flex-wrap gap-1">
                  {teacher.researchFields.slice(0, 2).map((field, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      {field}
                    </span>
                  ))}
                  {teacher.researchFields.length > 2 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                      +{teacher.researchFields.length - 2}
                    </span>
                  )}
                </div>
              </div>
              <span className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                详细介绍
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
} 