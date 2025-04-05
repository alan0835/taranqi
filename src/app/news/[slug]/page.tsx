import { allNews } from '@/data/newsData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import NewsCard from '@/components/news/NewsCard';

interface NewsDetailProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: NewsDetailProps): Metadata {
  const news = allNews.find((item) => item.slug === params.slug);
  
  if (!news) {
    return {
      title: '新闻未找到 - 建设中学',
    };
  }
  
  return {
    title: `${news.title} - 建设中学`,
    description: news.summary,
  };
}

export function generateStaticParams() {
  return allNews.map((news) => ({
    slug: news.slug,
  }));
}

export default function NewsDetailPage({ params }: NewsDetailProps) {
  const news = allNews.find((item) => item.slug === params.slug);
  
  if (!news) {
    notFound();
  }
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  
  // 增加浏览量的功能（在实际项目中，这里应该是API调用）
  
  // 获取相关新闻（同类别，但不包括当前新闻）
  const relatedNews = allNews
    .filter(item => item.category === news.category && item.id !== news.id)
    .sort(() => 0.5 - Math.random()) // 随机排序
    .slice(0, 3); // 取3篇
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-blue-600">新闻动态</Link>
          <span className="mx-2">/</span>
          <Link 
            href={`/news?category=${encodeURIComponent(news.category)}`}
            className="hover:text-blue-600"
          >
            {news.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium truncate">{news.title}</span>
        </nav>
        
        {/* 新闻标题 */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
        
        {/* 新闻元数据 */}
        <div className="flex flex-wrap justify-between items-center mb-8 text-sm text-gray-500 border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <span>{formatDate(news.date)}</span>
            <span>来源: {news.source || '建设中学'}</span>
            {news.author && <span>作者: {news.author}</span>}
          </div>
          <div className="flex items-center">
            <span className="flex items-center mr-4">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {news.viewCount || 0}
            </span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
              {news.category}
            </span>
          </div>
        </div>
        
        {/* 封面图片 */}
        {news.coverImage && (
          <div className="relative w-full h-80 md:h-96 mb-8 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={news.coverImage}
              alt={news.title}
              fill
              className="object-cover"
              fallbackSrc="/news/default-news.jpg"
            />
          </div>
        )}
        
        {/* 新闻摘要 */}
        <div className="bg-gray-50 p-6 mb-8 rounded-lg border border-gray-200">
          <p className="text-lg text-gray-700 italic">{news.summary}</p>
        </div>
        
        {/* 新闻内容 */}
        <div className="prose prose-lg max-w-none mb-12">
          {news.content ? (
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          ) : (
            <div>
              <p>这是一篇关于{news.title}的新闻报道。目前，完整内容正在编辑中...</p>
              <p>您可以联系我校办公室获取更多信息。</p>
              <p className="mt-4">新闻概要：{news.summary}</p>
            </div>
          )}
        </div>
        
        {/* 相关文件下载 */}
        {news.attachments && news.attachments.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-4">相关文件</h3>
            <ul className="space-y-2">
              {news.attachments.map((attachment, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <a 
                    href={attachment.url} 
                    download
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {attachment.name}
                    <span className="ml-2 text-sm text-gray-500">({attachment.size})</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* 分享和返回按钮 */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Link 
            href="/news"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回新闻列表
          </Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-blue-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 相关推荐 */}
      {relatedNews.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-8">相关推荐</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((item) => (
              <NewsCard 
                key={item.id} 
                news={item} 
                size="small"
                showViews={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 