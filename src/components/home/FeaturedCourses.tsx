import Image from 'next/image';
import Link from 'next/link';

type CourseItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
};

export default function FeaturedCourses() {
  const courses: CourseItem[] = [
    {
      id: 1,
      title: 'STEAM创新课程',
      description: '融合科学、技术、工程、艺术和数学，培养学生创新思维和实践能力',
      image: '/courses/steam.jpg',
      link: '/courses/steam',
    },
    {
      id: 2,
      title: '国际课程班',
      description: 'A-Level/AP/IB多元国际课程选择，为出国深造打下坚实基础',
      image: '/courses/international.jpg',
      link: '/courses/international',
    },
    {
      id: 3,
      title: '学科竞赛培训',
      description: '五大学科奥赛专项培训，助力学生在各类竞赛中脱颖而出',
      image: '/courses/olympiad.jpg',
      link: '/courses/olympiad',
    },
    {
      id: 4,
      title: '领导力发展项目',
      description: '通过社会实践、演讲辩论等活动培养学生领导能力和团队合作精神',
      image: '/courses/leadership.jpg',
      link: '/courses/leadership',
    },
  ];

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="text-2xl font-bold">特色课程</h2>
          <Link 
            href="/courses" 
            className="mt-4 md:mt-0 text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          >
            查看全部课程
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <Link 
                  href={course.link}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
                >
                  了解更多
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 