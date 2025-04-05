import { getAchievementBySlug, allAchievements } from '@/data/achievementsData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import AchievementContent from '@/components/achievements/AchievementContent';

// 为页面生成动态元数据
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const achievement = getAchievementBySlug(params.slug);
  
  if (!achievement) {
    return {
      title: '成果不存在',
      description: '找不到请求的教学成果'
    };
  }
  
  return {
    title: `${achievement.title} | 霍城县江苏中学教学成果`,
    description: achievement.summary
  };
}

// 使用标准的 Next.js 15 页面组件命名
export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const achievement = getAchievementBySlug(params.slug);
  
  if (!achievement) {
    notFound();
  }
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  // 获取级别对应的颜色
  const getLevelColor = () => {
    switch (achievement.level) {
      case '国家级':
        return 'bg-red-100 text-red-800';
      case '省级':
        return 'bg-orange-100 text-orange-800';
      case '市级':
        return 'bg-green-100 text-green-800';
      case '区级':
        return 'bg-blue-100 text-blue-800';
      case '校级':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // 获取类别对应的颜色
  const getCategoryColor = () => {
    switch (achievement.category) {
      case '教师荣誉':
        return 'bg-blue-100 text-blue-800';
      case '学生荣誉':
        return 'bg-green-100 text-green-800';
      case '学校荣誉':
        return 'bg-purple-100 text-purple-800';
      case '科研成果':
        return 'bg-yellow-100 text-yellow-800';
      case '特色项目':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/achievements" className="hover:text-blue-600">教学成果</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{achievement.title}</span>
        </nav>

        {/* 成果概览 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">{achievement.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor()}`}>
              {achievement.category}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor()}`}>
              {achievement.level}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {formatDate(achievement.date)}
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">{achievement.summary}</p>
          
          {achievement.participants && achievement.participants.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-medium">参与者：</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {achievement.participants.map((participant, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-blue-50 rounded text-sm">
                    {participant}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {achievement.departments && achievement.departments.length > 0 && (
            <div className="mb-4">
              <p className="text-gray-700 font-medium">相关部门：</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {achievement.departments.map((department, index) => (
                  <span key={index} className="inline-block px-2 py-1 bg-gray-50 rounded text-sm">
                    {department}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {achievement.recognizedBy && (
            <div className="mb-4">
              <p className="text-gray-700 font-medium">颁发机构：</p>
              <p className="text-gray-600">{achievement.recognizedBy}</p>
            </div>
          )}
        </div>
        
        {/* 成果详细内容 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <AchievementContent markdown={achievement.content} />
        </div>
        
        {/* 图片展示 */}
        {achievement.gallery && achievement.gallery.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              相关图片
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievement.gallery.map((image, index) => (
                <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${achievement.title} - 图片 ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 相关附件 */}
        {achievement.attachments && achievement.attachments.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
              相关附件
            </h2>
            <div className="space-y-3">
              {achievement.attachments.map((attachment, index) => (
                <a 
                  key={index}
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-6 h-6 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-medium">{attachment.name}</p>
                    <p className="text-sm text-gray-500">{attachment.size}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* 返回按钮 */}
        <div className="text-center">
          <Link
            href="/achievements"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回教学成果列表
          </Link>
        </div>
      </div>
    </div>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  return allAchievements.map((achievement) => ({
    slug: achievement.slug,
  }));
} 