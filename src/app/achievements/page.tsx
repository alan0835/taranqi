import Link from 'next/link';
import Image from 'next/image';
import { 
  getAllCategories, 
  getAllLevels, 
  allAchievements, 
  getAchievementsByCategory, 
  getAchievementsByLevel, 
  countAchievementsByCategory, 
  countAchievementsByLevel,
  AchievementCategory,
  AchievementLevel
} from '@/data/achievementsData';
import AchievementCard from '@/components/achievements/AchievementCard';

export default function AchievementsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 获取筛选参数，使用更安全的访问方式
  const categoryParam = typeof searchParams?.category === 'string' ? searchParams.category as AchievementCategory : undefined;
  const levelParam = typeof searchParams?.level === 'string' ? searchParams.level as AchievementLevel : undefined;

  // 所有类别和级别
  const allCategories = getAllCategories();
  const allLevels = getAllLevels();
  
  // 按类别和级别统计成果数量
  const categoryCounts = countAchievementsByCategory();
  const levelCounts = countAchievementsByLevel();
  
  // 筛选成果
  const filteredAchievements = allAchievements.filter(achievement => {
    // 按类别筛选
    if (categoryParam && achievement.category !== categoryParam) {
      return false;
    }
    
    // 按级别筛选
    if (levelParam && achievement.level !== levelParam) {
      return false;
    }
    
    return true;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // 类别图标
  const getCategoryIcon = (category: AchievementCategory) => {
    switch (category) {
      case '教师荣誉':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case '学生荣誉':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case '学校荣誉':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case '科研成果':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      case '特色项目':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
          </svg>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">首页</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">教学成果</span>
      </nav>
      
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-center mb-6">教学成果</h1>
      
      {/* 简介和统计 */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            霍城县江苏中学历年来在教育教学领域取得了丰硕成果，教师、学生和学校整体多次获得国家级、省级、市级奖项与荣誉。
            这些成果是学校坚持教育教学改革、推进素质教育、培养全面发展人才的重要体现。
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{allAchievements.length}</div>
              <div className="text-gray-600">总成果数</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-red-600">{levelCounts['国家级']}</div>
              <div className="text-gray-600">国家级</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-orange-600">{levelCounts['省级']}</div>
              <div className="text-gray-600">省级</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-green-600">{levelCounts['市级']}</div>
              <div className="text-gray-600">市级</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-indigo-600">{
                (levelCounts['区级'] || 0) + (levelCounts['校级'] || 0)
              }</div>
              <div className="text-gray-600">其他</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 分类筛选 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 按类别筛选 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">按类别查看</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link 
              href="/achievements"
              className={`flex items-center justify-center p-3 rounded-lg border transition-colors
                ${!categoryParam ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <span>全部类别</span>
            </Link>
            
            {allCategories.map((category) => (
              <Link 
                key={category}
                href={`/achievements?category=${encodeURIComponent(category)}${levelParam ? `&level=${encodeURIComponent(levelParam)}` : ''}`}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-colors gap-2
                  ${categoryParam === category ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <div className="text-gray-600">
                  {getCategoryIcon(category)}
                </div>
                <span>{category}</span>
                <span className="text-sm text-gray-500">({categoryCounts[category]})</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 按级别筛选 */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">按级别查看</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Link 
              href={categoryParam ? `/achievements?category=${encodeURIComponent(categoryParam)}` : '/achievements'}
              className={`flex items-center justify-center p-3 rounded-lg border transition-colors
                ${!levelParam ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <span>全部级别</span>
            </Link>
            
            {allLevels.map((level) => (
              <Link 
                key={level}
                href={`/achievements?level=${encodeURIComponent(level)}${categoryParam ? `&category=${encodeURIComponent(categoryParam)}` : ''}`}
                className={`flex items-center justify-center p-3 rounded-lg border transition-colors
                  ${levelParam === level ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <span>{level}</span>
                <span className="text-sm text-gray-500 ml-2">({levelCounts[level]})</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* 当前筛选条件 */}
      {(categoryParam || levelParam) && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-gray-600">当前筛选:</span>
          
          {categoryParam && (
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
              {categoryParam}
              <Link href={levelParam ? `/achievements?level=${encodeURIComponent(levelParam)}` : '/achievements'}>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </span>
          )}
          
          {levelParam && (
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
              {levelParam}
              <Link href={categoryParam ? `/achievements?category=${encodeURIComponent(categoryParam)}` : '/achievements'}>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Link>
            </span>
          )}
          
          <Link 
            href="/achievements"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            清除全部
          </Link>
        </div>
      )}
      
      {/* 成果列表 */}
      {filteredAchievements.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              showCategory={!categoryParam}
              showLevel={!levelParam}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到符合条件的成果</h3>
          <p className="text-gray-600 mb-4">请尝试调整筛选条件</p>
          <Link
            href="/achievements"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            查看所有成果
          </Link>
        </div>
      )}
    </div>
  );
} 