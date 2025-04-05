import { getFeaturedAchievements } from '@/data/achievementsData';
import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedAchievements() {
  // 获取特色成果（最多3个）
  const featuredAchievements = getFeaturedAchievements(3);
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">教学成果</h2>
          <Link 
            href="/achievements" 
            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          >
            查看全部成果
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredAchievements.map((achievement) => (
            <Link key={achievement.id} href={`/achievements/${achievement.slug}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={achievement.coverImage}
                    alt={achievement.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-yellow-500 text-white px-2 py-1 m-2 text-xs font-bold rounded">
                    {achievement.level}
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                      {achievement.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-2 line-clamp-2">{achievement.title}</h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 flex-1">
                    {achievement.summary}
                  </p>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-500 text-sm">
                      {new Date(achievement.date).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                      查看详情
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* 成果概述和统计 */}
        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/3 md:pr-8">
              <h3 className="text-xl font-semibold mb-4">建设中学教学成果丰硕</h3>
              <p className="text-gray-600 mb-4">
                建设中学秉承"教书育人、立德树人"的办学理念，近年来在教育教学领域取得了丰硕成果。
                学校师生在教学竞赛、科研项目、学科竞赛等多方面获得国家级、省级奖项，
                多项教育教学改革实践获得教育主管部门肯定。
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link
                  href="/achievements?category=教师荣誉"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  教师荣誉
                </Link>
                <Link
                  href="/achievements?category=学生荣誉"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  学生荣誉
                </Link>
                <Link
                  href="/achievements?category=学校荣誉"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  学校荣誉
                </Link>
                <Link
                  href="/achievements?category=科研成果"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  科研成果
                </Link>
                <Link
                  href="/achievements?category=特色项目"
                  className="text-blue-600 hover:text-blue-800 underline underline-offset-2"
                >
                  特色项目
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 mt-6 md:mt-0">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-4 text-center">成果统计</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">国家级奖项</span>
                    <span className="font-semibold text-red-600">10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">省级奖项</span>
                    <span className="font-semibold text-orange-600">30+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">市级奖项</span>
                    <span className="font-semibold text-green-600">50+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">研究课题</span>
                    <span className="font-semibold text-blue-600">25+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">特色项目</span>
                    <span className="font-semibold text-purple-600">15+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 