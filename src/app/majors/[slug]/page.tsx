import { Metadata } from 'next';
import Link from 'next/link';
import { getMajorBySlug, getRelatedMajors, allMajors } from '@/data/majorsData';
import { notFound } from 'next/navigation';
import MajorCard from '@/components/majors/MajorCard';
import TopUniversitiesSection from '@/components/majors/TopUniversitiesSection';
import MajorImage from '@/components/majors/MajorImage';

interface MajorDetailPageProps {
  params: {
    slug: string;
  };
}

// 使用增量静态再生(ISR)来确保页面能够在超时前完成生成
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 3600; // 每小时重新验证一次

// 动态生成页面元数据
export function generateMetadata({ params }: MajorDetailPageProps): Metadata {
  const major = getMajorBySlug(params.slug);
  
  if (!major) {
    return {
      title: '专业未找到 - 建设中学',
      description: '您查找的专业信息不存在或已被移除',
    };
  }
  
  return {
    title: `${major.name}专业 - 建设中学`,
    description: major.description,
  };
}

// 生成静态路径参数 - 限制数量避免超时
export function generateStaticParams() {
  // 仅为前3个专业生成静态页面，其余将按需生成
  return allMajors.slice(0, 3).map((major) => ({
    slug: major.slug,
  }));
}

// 将星级评分拆分为单独组件以优化渲染
function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// 将类别颜色计算拆分为纯函数以避免重复计算
function getCategoryColor(category: string) {
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
}

export default function MajorDetailPage({ params }: MajorDetailPageProps) {
  const major = getMajorBySlug(params.slug);
  
  if (!major) {
    notFound();
  }
  
  // 获取相关专业 - 限制数量
  const relatedMajors = getRelatedMajors(params.slug, 3);
  
  // 获取适合学生类型的图标
  const getSuitableIcon = () => {
    return (
      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/majors" className="hover:text-blue-600">专业介绍</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{major.name}</span>
        </nav>
        
        {/* 专业基本信息 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3 relative h-64 md:h-auto">
              <MajorImage 
                slug={major.slug} 
                name={major.name} 
                category={major.category} 
              />
            </div>
            
            <div className="p-6 md:w-2/3">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`text-xs font-medium px-2.5 py-1 rounded ${getCategoryColor(major.category)}`}>
                  {major.category}
                </span>
                {major.requiresExam && (
                  <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-1 rounded">
                    需校考
                  </span>
                )}
                <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                  {major.degreeYears}年制
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {major.name}
                {major.code && <span className="text-sm text-gray-500 ml-2">({major.code})</span>}
              </h1>
              
              <p className="text-gray-600 mb-6">{major.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">就业领域</h3>
                    <p className="text-gray-600">{major.employment.industry}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-green-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  <div>
                    <h3 className="font-medium text-gray-900">就业前景</h3>
                    <div className="flex items-center">
                      <RatingStars rating={major.employment.prospectRating} />
                      <span className="ml-2 text-gray-600">{major.employment.averageSalary}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-start">
                  {getSuitableIcon()}
                  <div className="ml-2">
                    <h3 className="font-medium text-gray-900">适合人群</h3>
                    <p className="text-gray-600">{major.suitable}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 核心课程 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                核心课程
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {major.courses.map((course, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 核心能力 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 text-indigo-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                核心能力
              </h2>
              <div className="space-y-3">
                {major.skills.map((skill, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-indigo-500 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>{skill}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* 就业方向 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                就业方向
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-800 mb-2">行业方向</h3>
                  <p>{major.employment.industry}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">薪资范围</h3>
                  <p>{major.employment.averageSalary}</p>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mb-3">主要职位</h3>
              <div className="flex flex-wrap gap-2">
                {major.employment.positions.map((position, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {position}
                  </span>
                ))}
              </div>
            </section>
          </div>
          
          {/* 右侧边栏 */}
          <div className="space-y-8">
            {/* 知名院校 */}
            <TopUniversitiesSection universities={major.topUniversities} />
            
            {/* 相关专业 */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                相关专业
              </h2>
              
              <ul className="space-y-3">
                {relatedMajors.map((relatedMajor) => (
                  <li key={relatedMajor.id}>
                    <Link 
                      href={`/majors/${relatedMajor.slug}`} 
                      className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${getCategoryColor(relatedMajor.category).replace('bg-', 'bg-').replace('text-', '')}`}></span>
                          <span>{relatedMajor.name}</span>
                        </div>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            
            {/* 专业咨询 */}
            <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-2">不确定这个专业是否适合您？</h2>
              <p className="mb-4 text-blue-100">
                使用我们的专业咨询服务，获取个性化的专业选择建议。
              </p>
              <Link 
                href="/majors/consultant" 
                className="inline-flex items-center justify-center w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                免费咨询
                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}