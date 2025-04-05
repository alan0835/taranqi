import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '历史沿革 - 建设中学',
  description: '建设中学的发展历程和重要历史里程碑',
};

// 学校发展里程碑
const milestones = [
  {
    year: 1985,
    title: '学校成立',
    description: '建设中学正式成立，最初仅有12个教学班，36名教师和480名学生。',
    image: '/about/history-1985.jpg',
  },
  {
    year: 1990,
    title: '首次扩建',
    description: '校园进行首次扩建，新建教学楼一栋，实验楼一栋，学校规模扩大到24个教学班。',
    image: '/about/history-1990.jpg',
  },
  {
    year: 1995,
    title: '十周年校庆',
    description: '举行建校十周年庆典，学校被评为市级重点中学。',
    image: '/about/history-1995.jpg',
  },
  {
    year: 2000,
    title: '新世纪发展',
    description: '迎接新世纪，学校制定了新的发展规划，加强信息化建设，建成多媒体教室。',
    image: '/about/history-2000.jpg',
  },
  {
    year: 2005,
    title: '二十周年校庆',
    description: '举行建校二十周年庆典，学校被评为省级示范性高中。',
    image: '/about/history-2005.jpg',
  },
  {
    year: 2010,
    title: '课程改革',
    description: '积极推进新课程改革，开设丰富的校本课程，培养学生综合素质。',
    image: '/about/history-2010.jpg',
  },
  {
    year: 2015,
    title: '三十周年校庆',
    description: '举行建校三十周年庆典，启动"建设中学2025"发展战略规划。',
    image: '/about/history-2015.jpg',
  },
  {
    year: 2020,
    title: '智慧校园',
    description: '完成智慧校园建设，实现教学、管理、服务的智能化和数字化。',
    image: '/about/history-2020.jpg',
  },
  {
    year: 2023,
    title: '现代化发展',
    description: '引入人工智能教育，建设现代化的STEAM教学中心，培养学生未来核心竞争力。',
    image: '/about/history-2023.jpg',
  },
];

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">历史沿革</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">历史沿革</h1>

        {/* 历史介绍 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">建设中学的发展历程</h2>
          <div className="relative h-64 w-full mb-6">
            <Image
              src="/about/history-banner.jpg"
              alt="建设中学历史照片"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <p className="text-gray-700 mb-4">
            建设中学创建于1985年，是改革开放初期为满足城市发展对教育需求而建立的一所现代化学校。经过近四十年的发展，
            学校从最初的十几个教学班发展成为一所拥有近百个教学班、数千名学生的大型现代化学校。
          </p>
          <p className="text-gray-700 mb-4">
            学校始终秉承"厚德载物，自强不息"的校训，坚持"以学生为中心"的教育理念，培养了数万名优秀毕业生，
            为国家和社会培养了大批优秀人才。多年来，学校不断追求教育创新，积极推进课程改革，提升教育质量，
            为学生的全面发展和终身学习奠定坚实基础。
          </p>
        </div>

        {/* 发展里程碑 */}
        <h2 className="text-2xl font-bold mb-6 text-center">发展里程碑</h2>
        <div className="relative">
          {/* 时间线 */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

          {/* 里程碑项目 */}
          {milestones.map((milestone, index) => (
            <div key={milestone.year} className={`flex items-start relative mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              {/* 时间点 */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white z-10"></div>
              
              {/* 内容 */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image
                      src={milestone.image}
                      alt={`${milestone.year}: ${milestone.title}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                    <p className="text-gray-700">{milestone.description}</p>
                  </div>
                </div>
              </div>

              {/* 占位 */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>

        {/* 校友成就 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 my-12">
          <h2 className="text-2xl font-bold mb-6 text-center">杰出校友</h2>
          <p className="text-center text-gray-700 mb-6">
            建设中学培养了众多各行各业的优秀人才，他们在科学、教育、文化、艺术、商业等领域做出了卓越贡献。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
              <p className="text-gray-700">院士和学者</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <p className="text-gray-700">企业家和创业者</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-700">艺术家和文化工作者</p>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="text-center mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回学校概况
          </Link>
        </div>
      </div>
    </div>
  );
} 