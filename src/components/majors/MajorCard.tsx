'use client';

import { Major } from '@/data/majorsData';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface MajorCardProps {
  major: Major;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
  showEmployment?: boolean;
}

export default function MajorCard({
  major,
  size = 'medium',
  showCategory = true,
  showEmployment = true,
}: MajorCardProps) {
  const [imageError, setImageError] = useState(false);
  
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
  
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      '理学': 'bg-blue-100 text-blue-800',
      '工学': 'bg-green-100 text-green-800',
      '文学': 'bg-purple-100 text-purple-800',
      '经济学': 'bg-amber-100 text-amber-800',
      '管理学': 'bg-indigo-100 text-indigo-800',
      '法学': 'bg-red-100 text-red-800',
      '医学': 'bg-emerald-100 text-emerald-800',
      '教育学': 'bg-sky-100 text-sky-800',
      '艺术学': 'bg-pink-100 text-pink-800',
      '农学': 'bg-lime-100 text-lime-800',
      '历史学': 'bg-orange-100 text-orange-800',
    };
    
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
  
  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };
  
  const placeholderImage = `/majors/${major.category.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/majors/${major.slug}`}>
        <div className={`relative w-full ${getImageSize()} overflow-hidden`}>
          <Image
            src={imageError ? placeholderImage : `/majors/${major.slug}.jpg`}
            alt={major.name}
            fill
            className="object-cover transform hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          
          {showCategory && (
            <div className="absolute top-3 left-3">
              <span className={`${getCategoryColor(major.category)} text-xs font-medium px-2.5 py-1 rounded`}>
                {major.category}
              </span>
            </div>
          )}
          
          {major.requiresExam && (
            <div className="absolute top-3 right-3">
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded">
                需校考
              </span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className={`${getTitleSize()} font-bold mb-2 group-hover:text-blue-600`}>
            {major.name}
            {major.code && <span className="text-xs text-gray-500 ml-2">({major.code})</span>}
          </h3>
          
          <p className={`text-gray-600 mb-4 ${getSummaryLines()}`}>
            {major.description}
          </p>
          
          {showEmployment && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">就业前景</span>
                {getRatingStars(major.employment.prospectRating)}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-2">
                {major.skills.slice(0, 3).map((skill, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {major.skills.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    ...
                  </span>
                )}
              </div>
            </div>
          )}
          
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{major.degreeYears}年制</span>
            <span className="text-blue-600 text-sm font-medium hover:underline inline-flex items-center">
              了解详情
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
} 