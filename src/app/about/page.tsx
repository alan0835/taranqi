import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学校概况 - 建设中学',
  description: '建设中学学校简介、历史沿革、办学理念、领导团队等信息',
};

// 导航卡片数据
const navItems = [
  {
    id: 1,
    title: '学校简介',
    description: '了解建设中学的基本情况、办学理念和教育特色',
    link: '/about',
    icon: '/about/nav-icons/intro.svg',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: '历史沿革',
    description: '探索建设中学的发展历程和重要历史节点',
    link: '/about/history',
    icon: '/about/nav-icons/history.svg',
    color: 'bg-yellow-500',
  },
  {
    id: 3,
    title: '校长致辞',
    description: '聆听校长对学校发展的愿景和对师生的期望',
    link: '/about/principal',
    icon: '/about/nav-icons/principal.svg',
    color: 'bg-green-500',
  },
  {
    id: 4,
    title: '领导团队',
    description: '认识学校领导团队成员及其职责分工',
    link: '/about/leadership',
    icon: '/about/nav-icons/leadership.svg',
    color: 'bg-purple-500',
  },
  {
    id: 5,
    title: '组织架构',
    description: '了解学校的组织架构和各部门职责',
    link: '/about/structure',
    icon: '/about/nav-icons/structure.svg',
    color: 'bg-red-500',
  },
  {
    id: 6,
    title: '学校荣誉',
    description: '查看学校获得的各类荣誉和奖项',
    link: '/about/honors',
    icon: '/about/nav-icons/honors.svg',
    color: 'bg-indigo-500',
  },
  {
    id: 7,
    title: '校园风光',
    description: '欣赏建设中学美丽的校园环境和设施',
    link: '/about/campus',
    icon: '/about/nav-icons/campus.svg',
    color: 'bg-teal-500',
  },
  {
    id: 8,
    title: '联系我们',
    description: '获取学校联系方式和地理位置信息',
    link: '/about/contact',
    icon: '/about/nav-icons/contact.svg',
    color: 'bg-orange-500',
  },
];

// 学校数据
const schoolData = [
  { id: 1, label: '创办时间', value: '1985年' },
  { id: 2, label: '占地面积', value: '80,000平方米' },
  { id: 3, label: '在校学生', value: '3,200人' },
  { id: 4, label: '教职工数', value: '280人' },
  { id: 5, label: '高级教师', value: '156人' },
  { id: 6, label: '特级教师', value: '28人' },
  { id: 7, label: '省级骨干', value: '45人' },
  { id: 8, label: '本科率', value: '98.5%' },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">学校概况</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">学校概况</h1>

        {/* 学校简介 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-full">
                <Image
                  src="/about/school-building.jpg"
                  alt="建设中学校园风光"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-4">学校简介</h2>
              <p className="text-gray-700 mb-4">
                建设中学创建于1985年，是一所市属重点高级中学，坐落于城市中心区域，占地面积8万平方米。
                学校秉承"厚德、博学、求实、创新"的校训，致力于培养德智体美劳全面发展的优秀人才。
              </p>
              <p className="text-gray-700 mb-4">
                建设中学拥有一支高素质的教师队伍，其中特级教师28人，高级教师156人，省市级骨干教师45人。
                学校教学设施先进，拥有现代化教学楼、科技楼、图书馆、体育馆等设施，为学生成长提供了优质的学习环境。
              </p>
              <p className="text-gray-700">
                几十年来，学校致力于素质教育，注重学生全面发展，培养了一批又一批优秀毕业生，为高等学府输送了大量人才，
                赢得了社会各界的广泛赞誉和认可。
              </p>
            </div>
          </div>
          
          {/* 学校数据 */}
          <div className="bg-blue-50 p-6">
            <h3 className="text-xl font-bold mb-4 text-center">学校概况数据</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {schoolData.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm text-center">
                  <div className="text-2xl font-bold text-blue-600">{item.value}</div>
                  <div className="text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 办学理念 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">办学理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">以人为本</h3>
              <p className="text-gray-700">
                尊重学生个性发展，关注学生身心健康，注重因材施教，培养学生综合素质。
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">创新教育</h3>
              <p className="text-gray-700">
                培养学生创新思维和实践能力，鼓励探索未知，勇于挑战，提升解决问题的能力。
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">国际视野</h3>
              <p className="text-gray-700">
                拓展学生国际化视野，加强国际交流与合作，培养具有全球竞争力的未来人才。
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-lg font-semibold text-blue-600">校训：厚德、博学、求实、创新</p>
            <p className="mt-2 text-gray-700">
              我们致力于为每位学生提供优质教育资源，营造良好的学习环境，
              引导学生树立正确的人生观、价值观和世界观，成为德才兼备的社会栋梁。
            </p>
          </div>
        </div>

        {/* 导航卡片 */}
        <h2 className="text-2xl font-bold text-center mb-6">了解更多</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {navItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.link}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`h-2 ${item.color}`}></div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                <div className="flex justify-end">
                  <span className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                    查看详情
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 特色教育 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">特色教育</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">红色教育</h3>
                <p className="text-gray-700">
                  传承红色基因，弘扬革命精神，通过参观红色教育基地、举办主题教育活动等，
                  培养学生的爱国情怀和社会责任感。
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">生态教育</h3>
                <p className="text-gray-700">
                  注重环保意识培养，建设校园生态园，开展环保实践活动，
                  提高学生的环保意识和可持续发展理念。
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">科技创新教育</h3>
                <p className="text-gray-700">
                  设立科技创新实验室，组织科技竞赛和创新活动，培养学生的科学精神、
                  创新思维和实践能力。
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">国际交流教育</h3>
                <p className="text-gray-700">
                  开展国际姊妹校交流项目，组织海外游学活动，邀请国外专家学者来校讲学，
                  拓展学生国际视野。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 