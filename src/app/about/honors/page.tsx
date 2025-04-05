import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '学校荣誉 - 建设中学',
  description: '建设中学历年获得的各类荣誉、奖项及认证',
};

// 荣誉数据
const honorCategories = [
  {
    id: 1,
    title: '国家级荣誉',
    honors: [
      { id: 101, title: '全国文明校园', year: 2022 },
      { id: 102, title: '全国青少年校园足球特色学校', year: 2020 },
      { id: 103, title: '全国教育科研先进单位', year: 2019 },
      { id: 104, title: '全国首批示范性高中', year: 2006 },
      { id: 105, title: '全国德育工作先进集体', year: 2018 },
    ]
  },
  {
    id: 2,
    title: '省级荣誉',
    honors: [
      { id: 201, title: '省级文明单位', year: 2023 },
      { id: 202, title: '省级教育教学示范校', year: 2021 },
      { id: 203, title: '省级艺术教育特色学校', year: 2022 },
      { id: 204, title: '省级信息化应用示范校', year: 2020 },
      { id: 205, title: '省级心理健康教育示范校', year: 2019 },
      { id: 206, title: '省级体育传统项目学校', year: 2018 },
      { id: 207, title: '省优秀教育管理奖', year: 2021 },
    ]
  },
  {
    id: 3,
    title: '市级荣誉',
    honors: [
      { id: 301, title: '市级五星级学校', year: 2023 },
      { id: 302, title: '市级教育质量优秀奖', year: 2022 },
      { id: 303, title: '市级教师队伍建设先进单位', year: 2021 },
      { id: 304, title: '市级德育工作先进单位', year: 2023 },
      { id: 305, title: '市级绿色学校', year: 2022 },
      { id: 306, title: '市级平安校园', year: 2023 },
      { id: 307, title: '市级校园文化建设示范校', year: 2021 },
      { id: 308, title: '市级家校共育示范校', year: 2022 },
    ]
  }
];

// 重要奖项数据
const specialAwards = [
  {
    id: 1,
    title: '全国教育系统先进集体',
    year: 2021,
    issuer: '教育部',
    description: '表彰在教育教学改革、学校管理、师资队伍建设等方面取得显著成绩的学校。',
    image: '/about/award1.jpg',
  },
  {
    id: 2,
    title: '省级教学成果特等奖',
    year: 2022,
    issuer: '省教育厅',
    description: '表彰学校在"创新人才培养模式"的探索与实践中取得的突出成果。',
    image: '/about/award2.jpg',
  },
  {
    id: 3,
    title: '全国中小学德育工作优秀成果奖',
    year: 2020,
    issuer: '中国教育学会',
    description: '表彰学校在德育工作创新与实践中形成的特色模式与经验。',
    image: '/about/award3.jpg',
  },
];

// 学生获奖数据
const studentAwards = [
  { id: 1, competition: '全国中学生物理奥林匹克竞赛', awards: 'S级金牌3枚，银牌5枚', years: '2020-2023' },
  { id: 2, competition: '全国中学生化学奥林匹克竞赛', awards: '金牌4枚，银牌6枚', years: '2020-2023' },
  { id: 3, competition: '全国中学生数学奥林匹克竞赛', awards: '金牌2枚，银牌8枚，铜牌12枚', years: '2020-2023' },
  { id: 4, competition: '全国中学生信息学奥林匹克竞赛', awards: '金牌1枚，银牌3枚，铜牌5枚', years: '2020-2023' },
  { id: 5, competition: '全国中学生英语能力大赛', awards: '特等奖2名，一等奖7名', years: '2020-2023' },
  { id: 6, competition: '全国中学生"创新杯"科技竞赛', awards: '一等奖3项，二等奖5项', years: '2020-2023' },
  { id: 7, competition: '全国中学生辩论赛', awards: '冠军1次，亚军2次', years: '2020-2023' },
  { id: 8, competition: '全国中学生艺术展演', awards: '舞蹈类金奖，合唱类金奖', years: '2020-2023' },
];

export default function HonorsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">学校荣誉</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-8">学校荣誉</h1>
        
        {/* 荣誉简介 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">荣誉简介</h2>
          <p className="text-gray-700 mb-4">
            建设中学自创校以来，在教育教学、学校管理、师资队伍建设等方面取得了显著成绩，
            先后获得多项国家级、省级和市级荣誉。学校始终秉持"育人为本、追求卓越"的办学理念，
            不断提升教育教学质量，为社会培养了大批优秀人才。
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">38+</div>
              <div className="text-gray-600">国家级荣誉</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">120+</div>
              <div className="text-gray-600">省级荣誉</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <div className="text-gray-600">市级荣誉</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">学生获奖</div>
            </div>
          </div>
        </div>

        {/* 重要荣誉展示 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">重要荣誉展示</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialAwards.map((award) => (
              <div key={award.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={award.image}
                    alt={award.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">{award.title}</h3>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">颁发单位: {award.issuer}</p>
                  <p className="text-gray-700">{award.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 按类别展示荣誉 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">荣誉列表</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {honorCategories.map((category, index) => (
              <div key={category.id} className={`p-6 ${index !== honorCategories.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <h3 className="text-xl font-bold mb-4 text-blue-700">{category.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.honors.map((honor) => (
                    <div key={honor.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{honor.title}</span>
                      <span className="text-gray-500 text-sm">{honor.year}年</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 学生获奖情况 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">学生获奖情况 (2020-2023)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">竞赛名称</th>
                  <th className="py-3 px-4 text-left">获奖情况</th>
                  <th className="py-3 px-4 text-left">年份</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentAwards.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.competition}</td>
                    <td className="py-3 px-4">{item.awards}</td>
                    <td className="py-3 px-4">{item.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 教师荣誉 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">教师荣誉</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">28</div>
              <div className="text-gray-700">特级教师</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-gray-700">高级教师</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">45</div>
              <div className="text-gray-700">省市级骨干教师</div>
            </div>
          </div>
          <p className="text-gray-700 text-center">
            近三年来，我校教师在各级各类评选中获得省级以上荣誉80余项，
            发表学术论文200余篇，出版专著、教材30余部，
            多人次获评"优秀教师"、"优秀教育工作者"、"模范班主任"等称号。
          </p>
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