import { Metadata } from 'next';
import Link from 'next/link';
import { 
  getAllCategories, 
  allMajors, 
  getMajorsByCategory,
  MajorCategory, 
  searchMajors 
} from '@/data/majorsData';
import MajorCard from '@/components/majors/MajorCard';

export const metadata: Metadata = {
  title: '专业介绍 - 建设中学',
  description: '建设中学提供的大学专业介绍和选择指南，帮助学生了解各专业的培养目标、课程设置和就业方向',
};

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 每小时重新验证一次

export default function MajorsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 获取所有学科门类（用于筛选）
  const allCategories = getAllCategories();
  
  // 获取筛选参数，使用更安全的访问方式
  const categoryParam = typeof searchParams?.category === 'string' ? searchParams.category as MajorCategory : undefined;
  const keywordParam = typeof searchParams?.keyword === 'string' ? searchParams.keyword : undefined;
  
  // 根据筛选条件获取专业列表
  let filteredMajors = allMajors;
  
  // 先按学科门类筛选
  if (categoryParam) {
    filteredMajors = getMajorsByCategory(categoryParam);
  }
  
  // 再按关键词搜索
  if (keywordParam) {
    filteredMajors = searchMajors(keywordParam);
  }
  
  // 按学科门类筛选和关键词搜索
  if (categoryParam && keywordParam) {
    filteredMajors = getMajorsByCategory(categoryParam).filter(major => 
      searchMajors(keywordParam).includes(major)
    );
  }
  
  // 各学科门类的专业数量
  const getMajorCountByCategory = (category: MajorCategory): number => {
    return allMajors.filter(major => major.category === category).length;
  };
  
  // 生成学科门类的图标
  const getCategoryIcon = (category: MajorCategory): React.ReactNode => {
    const icons: Record<MajorCategory, React.ReactNode> = {
      '理学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      '工学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      '文学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      '经济学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      '管理学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      '法学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      '医学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      '教育学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      '艺术学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
      ),
      '农学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      '历史学': (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    };
    
    return icons[category] || (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
          <span className="text-gray-800 font-medium">专业介绍</span>
        </nav>
        
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">大学专业介绍</h1>
          <p className="text-gray-600">
            了解各大学专业的培养目标、核心课程、就业方向以及适合人群，帮助您做出更明智的专业选择。
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧筛选区域 */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h2 className="text-lg font-semibold mb-4">专业搜索</h2>
              
              {/* 搜索框 */}
              <form action="/majors" method="get" className="mb-6">
                <div className="flex">
                  <input 
                    type="text" 
                    name="keyword" 
                    placeholder="搜索专业名称、关键词" 
                    defaultValue={keywordParam || ''}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                {categoryParam && (
                  <input type="hidden" name="category" value={categoryParam} />
                )}
              </form>
              
              <div className="mb-6">
                {/* 当前筛选条件 */}
                {(categoryParam || keywordParam) && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">
                      当前筛选
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categoryParam && (
                        <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                          学科门类: {categoryParam}
                          <Link href={keywordParam ? `/majors?keyword=${keywordParam}` : '/majors'} className="ml-1 text-blue-900 hover:text-blue-700">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      )}
                      {keywordParam && (
                        <div className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                          关键词: {keywordParam}
                          <Link href={categoryParam ? `/majors?category=${categoryParam}` : '/majors'} className="ml-1 text-blue-900 hover:text-blue-700">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </Link>
                        </div>
                      )}
                      {(categoryParam || keywordParam) && (
                        <Link 
                          href="/majors" 
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          清除全部
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  学科门类
                </h3>
                <div className="space-y-2">
                  <Link 
                    href="/majors" 
                    className={`flex items-center justify-between p-2 rounded-md ${
                      !categoryParam ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      全部学科
                    </span>
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      {allMajors.length}
                    </span>
                  </Link>
                  
                  {allCategories.map((category) => (
                    <Link 
                      key={category} 
                      href={`/majors?category=${category}${keywordParam ? `&keyword=${keywordParam}` : ''}`}
                      className={`flex items-center justify-between p-2 rounded-md ${
                        categoryParam === category ? 'bg-blue-50 text-blue-800' : 'hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-2">{getCategoryIcon(category)}</span>
                        {category}
                      </span>
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {getMajorCountByCategory(category)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">需要帮助？</h3>
                <p className="text-sm text-blue-700 mb-3">
                  不确定哪个专业适合您？尝试我们的专业咨询服务，获取个性化建议。
                </p>
                <Link 
                  href="/majors/consultant"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  专业咨询
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* 右侧专业列表 */}
          <div className="lg:w-3/4">
            {filteredMajors.length > 0 ? (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {categoryParam ? `${categoryParam}专业 (${filteredMajors.length})` : `全部专业 (${filteredMajors.length})`}
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredMajors.map((major) => (
                    <MajorCard 
                      key={major.id} 
                      major={major}
                      size="medium"
                      showCategory={true}
                      showEmployment={true}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-10 rounded-lg shadow-md text-center">
                <svg 
                  className="w-16 h-16 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  未找到符合条件的专业
                </h3>
                <p className="text-gray-600 mb-6">
                  请尝试调整您的搜索条件或筛选条件，以获取更多结果。
                </p>
                <Link 
                  href="/majors" 
                  className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  查看全部专业
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 