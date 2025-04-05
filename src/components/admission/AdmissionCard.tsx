'use client';

import { AdmissionNotice, AdmissionPolicy } from '@/data/admissionData';
import Link from 'next/link';
import { useState } from 'react';

type AdmissionItem = AdmissionNotice | AdmissionPolicy;

interface AdmissionCardProps {
  item: AdmissionItem;
  type: 'notice' | 'policy';
}

export default function AdmissionCard({ item, type }: AdmissionCardProps) {
  // 获取链接地址
  const getLink = () => {
    if (type === 'notice') {
      return `/admission/notices/${item.slug}`;
    } else {
      return `/admission/policies/${item.slug}`;
    }
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 获取种类颜色
  const getTypeColor = (itemType: string) => {
    switch (itemType) {
      case '小升初':
        return 'bg-blue-100 text-blue-800';
      case '初升高':
        return 'bg-green-100 text-green-800';
      case '国际班':
        return 'bg-purple-100 text-purple-800';
      case '艺术特长生':
        return 'bg-pink-100 text-pink-800';
      case '体育特长生':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Link href={getLink()} className="block">
      <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded ${getTypeColor(item.type)}`}>
                {item.type}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                {item.year}年
              </span>
              {type === 'notice' && (item as AdmissionNotice).isImportant && (
                <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded">
                  重要
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-600">
              发布时间: {formatDate(item.publishDate)}
              {type === 'policy' && (
                <span className="ml-3">
                  更新时间: {formatDate((item as AdmissionPolicy).lastUpdated)}
                </span>
              )}
            </p>
          </div>
          <div className="ml-4">
            <svg
              className="w-6 h-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        
        {type === 'notice' && (item as AdmissionNotice).attachments && (item as AdmissionNotice).attachments!.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-2">附件:</p>
            <ul className="space-y-1">
              {(item as AdmissionNotice).attachments!.map((attachment, index) => (
                <li key={index} className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-blue-600 hover:underline">{attachment.name}</span>
                  <span className="text-gray-500 ml-2">({attachment.size})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  );
} 