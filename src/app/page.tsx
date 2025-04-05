import Carousel from '@/components/home/Carousel';
import QuickLinks from '@/components/home/QuickLinks';
import SchoolStats from '@/components/home/SchoolStats';
import FeaturedCourses from '@/components/home/FeaturedCourses';
import FeaturedTeachers from '@/components/home/FeaturedTeachers';
import FeaturedAchievements from '@/components/home/FeaturedAchievements';
import Link from 'next/link';
import NewsCard from '@/components/news/NewsCard';
import { getLatestNews } from '@/data/newsData';

export default function Home() {
  // 获取最新新闻
  const latestNews = getLatestNews(3);
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* 首屏轮播图 */}
      <section className="container mx-auto px-4 py-6">
        <Carousel />
      </section>

      {/* 快捷入口 */}
      <section>
        <QuickLinks />
      </section>

      {/* 学校荣誉/核心数据 */}
      <section>
        <SchoolStats />
      </section>

      {/* 特色课程 */}
      <section>
        <FeaturedCourses />
      </section>
      
      {/* 特色教师 */}
      <section>
        <FeaturedTeachers />
      </section>
      
      {/* 教学成果 */}
      <section>
        <FeaturedAchievements />
      </section>

      {/* 最新新闻 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-2xl font-bold">新闻动态</h2>
            <Link 
              href="/news" 
              className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            >
              查看全部新闻
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <NewsCard 
                key={news.id} 
                news={news}
                size="medium"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
