import { Metadata } from 'next';
import { getTeacherBySlug, allTeachers } from '@/data/teachersData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface TeacherDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: TeacherDetailPageProps): Metadata {
  const teacher = getTeacherBySlug(params.slug);
  
  if (!teacher) {
    return {
      title: '教师不存在 - 建设中学',
      description: '未找到您查询的教师信息',
    };
  }
  
  return {
    title: `${teacher.name} - ${teacher.department} - 建设中学`,
    description: `${teacher.name}是建设中学${teacher.department}的${teacher.title}，${teacher.introduction.substring(0, 100)}...`,
  };
}

export function generateStaticParams() {
  return allTeachers.map((teacher) => ({
    slug: teacher.slug,
  }));
}

export default function TeacherDetailPage({ params }: TeacherDetailPageProps) {
  const teacher = getTeacherBySlug(params.slug);
  
  if (!teacher) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/teachers" className="hover:text-blue-600">教师团队</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{teacher.name}</span>
        </nav>
        
        {/* 教师基本信息 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-blue-600 text-white p-6">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white mb-4 md:mb-0">
                <Image
                  src={teacher.avatar}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:ml-8 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center md:items-end">
                  <h1 className="text-3xl font-bold">{teacher.name}</h1>
                  <div className="md:ml-4 flex flex-wrap gap-2 mt-2 md:mt-0">
                    <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
                      {teacher.department}
                    </span>
                    <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
                      {teacher.title}
                    </span>
                    {teacher.position && (
                      <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm">
                        {teacher.position}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2">{teacher.education} | {teacher.major}</p>
                <p className="mt-1">从教年限: {teacher.teachingYears}年</p>
                {teacher.email && (
                  <p className="mt-1 flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {teacher.email}
                  </p>
                )}
                {teacher.officeHours && (
                  <p className="mt-1 flex items-center justify-center md:justify-start">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    办公时间: {teacher.officeHours}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* 教师简介 */}
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              教师简介
            </h2>
            <p className="text-gray-700 whitespace-pre-line">
              {teacher.introduction}
            </p>
          </div>
        </div>
        
        {/* 教学理念 */}
        {teacher.teachingPhilosophy && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              教学理念
            </h2>
            <blockquote className="italic text-gray-700 border-l-4 border-blue-500 pl-4 py-2">
              {teacher.teachingPhilosophy}
            </blockquote>
          </div>
        )}
        
        {/* 教学成就 */}
        {teacher.achievements && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              教学成就
            </h2>
            <p className="text-gray-700">
              {teacher.achievements}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* 研究方向 */}
          {teacher.researchFields && teacher.researchFields.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                研究方向
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {teacher.researchFields.map((field, index) => (
                  <li key={index}>{field}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* 授课科目 */}
          {teacher.courses && teacher.courses.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                授课科目
              </h2>
              <div className="flex flex-wrap gap-2">
                {teacher.courses.map((course, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* 荣誉获奖 */}
        {teacher.honors && teacher.honors.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              荣誉获奖
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      荣誉名称
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      获奖年份
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      级别
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teacher.honors.map((honor) => (
                    <tr key={honor.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{honor.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{honor.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${honor.level === '国家级' ? 'bg-red-100 text-red-800' : 
                            honor.level === '省级' ? 'bg-yellow-100 text-yellow-800' : 
                              honor.level === '市级' ? 'bg-green-100 text-green-800' : 
                                'bg-blue-100 text-blue-800'}`}>
                          {honor.level}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* 发表论文/著作 */}
        {teacher.publications && teacher.publications.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              发表论文/著作
            </h2>
            <div className="space-y-4">
              {teacher.publications.map((pub) => (
                <div key={pub.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold">{pub.title}</h3>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="mr-3">{pub.publisher}</span>
                    <span className="mr-3">{pub.year}年</span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${pub.type === '著作' ? 'bg-purple-100 text-purple-800' : 
                        pub.type === '教材' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                      {pub.type}
                    </span>
                  </div>
                  {pub.link && (
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm mt-1 inline-flex items-center"
                    >
                      查看详情
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 参与项目 */}
        {teacher.projects && teacher.projects.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              教研项目
            </h2>
            <div className="space-y-4">
              {teacher.projects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.level === '国家级' ? 'bg-red-100 text-red-800' : 
                        project.level === '省级' ? 'bg-yellow-100 text-yellow-800' : 
                          project.level === '市级' ? 'bg-green-100 text-green-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                      {project.level}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="mr-3">角色: {project.role}</span>
                    <span className="mr-3">{project.year}年</span>
                  </div>
                  <p className="text-gray-700 mt-2">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* 返回按钮 */}
        <div className="flex justify-between items-center">
          <Link 
            href="/teachers" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回教师团队
          </Link>
          
          {/* 社交分享 - 这里展示的是UI，实际功能需要用户点击后实现 */}
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="分享到微信">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.667 11.511a.996.996 0 110-1.992.996.996 0 010 1.992zm6.666 0a.996.996 0 110-1.992.996.996 0 010 1.992zm-9.247 6.217l-1.215.408c-.24.08-.486-.158-.424-.41l.309-.99a.892.892 0 00-.118-.898C3.002 14.116 2 12.366 2 10.477c0-3.765 3.582-6.817 8-6.817s8 3.052 8 6.817c0 3.765-3.582 6.817-8 6.817-1.032 0-2.015-.138-2.92-.362a.893.893 0 00-.724.178l-2.32 2.618z"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="分享到微博">
              <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.194 14.487c0 3.625-4.655 6.56-10.394 6.56-5.738 0-10.393-2.935-10.393-6.56 0-3.624 4.655-6.56 10.393-6.56 5.739 0 10.394 2.936 10.394 6.56zm-15.067.889a.584.584 0 01-.775-.066.538.538 0 01.052-.772c.823-.771 1.918-1.017 2.971-.718a1.32 1.32 0 011.014 1.19c.015.326-.117.635-.357.835-.24.199-.56.277-.867.209-.307-.067-.585-.279-.753-.575a.985.985 0 00-1.285-.103zm3.285 2.604c-.154.223-.492.328-.753.233-.261-.094-.347-.348-.193-.57.153-.223.491-.328.752-.234.261.095.347.349.194.571zm.344-1.902c-1.338-.341-2.857.314-3.442 1.459-.596 1.17-.019 2.47 1.331 2.896 1.4.44 3.055-.234 3.635-1.509.57-1.258-.142-2.518-1.524-2.846zm11.245-7.223l-.3.008a.614.614 0 00-.082-.011h-.953v-1.274a.64.64 0 00-.64-.64h-.426a.64.64 0 00-.64.64v1.274h-1.696a.736.736 0 00-.736.736v.384c0 .406.33.736.736.736h1.696v1.103h-2.059a.614.614 0 00-.614.614v.365c0 .34.275.615.614.615h2.06v1.236c0 .34.286.618.638.618h.43a.628.628 0 00.637-.618v-1.236h.952a.736.736 0 00.736-.736v-.365a.736.736 0 00-.736-.735h-.953v-1.103h1.697c.407 0 .736-.33.736-.736v-.384a.736.736 0 00-.736-.736h-1.697V8.42h.953c.34 0 .618-.274.618-.613v-.324a.616.616 0 00-.535-.628z"/>
              </svg>
            </button>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200" title="复制链接">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 