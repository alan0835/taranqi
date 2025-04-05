'use client';

import { useState, useEffect, Suspense } from 'react';
import { allNews, getNewsByCategory, NewsCategory } from '@/data/newsData';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Pagination from '@/components/ui/Pagination';
import NewsCard from '@/components/news/NewsCard';

// 每页显示的新闻数量
const ITEMS_PER_PAGE = 9;

// 创建一个使用 useSearchParams 的客户端组件
function NewsContent() {
  const searchParams = useSearchParams();
  
  // 使用状态管理分类和页码
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  
  // 从URL参数初始化状态
  useEffect(() => {
    const categoryParam = searchParams.get('category') as NewsCategory | null;
    const pageParam = searchParams.get('page');
    
    setSelectedCategory(categoryParam || undefined);
    setCurrentPage(pageParam ? Number(pageParam) : 1);
  }, [searchParams]);
  
  // 根据分类筛选新闻
  const filteredNews = selectedCategory 
    ? getNewsByCategory(selectedCategory) 
    : allNews;
    
  // 对新闻按日期排序（最新的在前）
  const sortedNews = [...filteredNews].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // 分页处理
  const totalItems = sortedNews.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
  // 确保当前页不超过总页数
  const safePage = currentPage > totalPages ? 1 : currentPage;
  
  // 获取当前页的新闻
  const paginatedNews = sortedNews.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  );
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">新闻动态</h1>
      
      {/* 分类标签 */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        <Link 
          href="/news"
          className={`px-5 py-2 rounded-full transition-colors ${
            !selectedCategory 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          全部
        </Link>
        <Link 
          href="/news?category=校园新闻"
          className={`px-5 py-2 rounded-full transition-colors ${
            selectedCategory === '校园新闻' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          校园新闻
        </Link>
        <Link 
          href="/news?category=通知公告"
          className={`px-5 py-2 rounded-full transition-colors ${
            selectedCategory === '通知公告' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          通知公告
        </Link>
        <Link 
          href="/news?category=媒体聚焦"
          className={`px-5 py-2 rounded-full transition-colors ${
            selectedCategory === '媒体聚焦' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          媒体聚焦
        </Link>
      </div>
      
      {/* 新闻列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {paginatedNews.map((newsItem) => (
          <NewsCard key={newsItem.id} news={newsItem} />
        ))}
      </div>

      {/* 没有找到结果的提示 */}
      {paginatedNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无相关新闻</p>
        </div>
      )}
      
      {/* 分页控件 */}
      <Pagination 
        totalItems={totalItems} 
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={safePage}
      />
    </div>
  );
}

// 使用 Suspense 包裹的主页面组件
export default function NewsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">加载中...</div>}>
      <NewsContent />
    </Suspense>
  );
} 