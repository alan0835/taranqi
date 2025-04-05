'use client';

import { NewsItem } from '@/data/newsData';
import Link from 'next/link';
import ImageWithFallback from '../ui/ImageWithFallback';
import PlaceholderImage from '../ui/PlaceholderImage';
import { renderToString } from 'react-dom/server';

interface NewsCardProps {
  news: NewsItem;
  size?: 'small' | 'medium' | 'large';
  showCategory?: boolean;
  showAuthor?: boolean;
  showViews?: boolean;
}

export default function NewsCard({
  news,
  size = 'medium',
  showCategory = true,
  showAuthor = true,
  showViews = true,
}: NewsCardProps) {
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
  // 根据尺寸设置样式
  const getImageHeight = () => {
    switch (size) {
      case 'small':
        return 'h-32';
      case 'large':
        return 'h-64';
      case 'medium':
      default:
        return 'h-48';
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
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className={`relative ${getImageHeight()}`}>
        <ImageWithFallback
          src={news.coverImage}
          alt={news.title}
          fill
          className="object-cover"
          fallbackSrc={`/data:image/svg+xml,${encodeURIComponent(
            renderToString(
              <PlaceholderImage category={news.category} />
            )
          )}`}
        />
        {showCategory && (
          <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 text-sm">
            {news.category}
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
          <span>{formatDate(news.date)}</span>
          {showViews && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {news.viewCount || 0}
            </span>
          )}
        </div>
        <h2 className={`${getTitleSize()} font-bold mb-3 line-clamp-2 hover:text-blue-600 transition-colors`}>
          <Link href={`/news/${news.slug}`}>
            {news.title}
          </Link>
        </h2>
        <p className={`text-gray-600 mb-4 ${getSummaryLines()}`}>
          {news.summary}
        </p>
        <div className="flex justify-between items-center">
          {showAuthor && (
            <span className="text-sm text-gray-500">
              {news.author || news.source}
            </span>
          )}
          <Link 
            href={`/news/${news.slug}`}
            className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
          >
            阅读全文
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 