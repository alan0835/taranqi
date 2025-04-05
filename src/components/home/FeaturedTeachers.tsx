import { getFeaturedTeachers } from '@/data/teachersData';
import Link from 'next/link';
import TeacherCard from '../teachers/TeacherCard';

export default function FeaturedTeachers() {
  // 获取特色教师（最多显示3个）
  const featuredTeachers = getFeaturedTeachers().slice(0, 3);
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">优秀教师</h2>
          <Link 
            href="/teachers" 
            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          >
            查看全部教师
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTeachers.map((teacher) => (
            <TeacherCard 
              key={teacher.id} 
              teacher={teacher}
              size="medium"
              showResearch={true}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">我们为教育而生</h3>
            <p className="text-gray-600">
              建设中学拥有一支专业素养高、教学经验丰富、充满教育情怀的教师队伍。
              他们不仅在各自的专业领域有着深厚造诣，更致力于培养学生的全面发展和终身学习能力。
              我们的教师深信每个学生都有无限潜能，努力为他们的成长创造最好的环境和机会。
            </p>
            
            <Link
              href="/teachers"
              className="inline-flex items-center mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              了解我们的教师团队
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 