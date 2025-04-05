import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '领导团队 - 建设中学',
  description: '建设中学领导团队成员介绍及其职责',
};

// 领导团队数据
const leadershipTeam = [
  {
    id: 1,
    name: '张明',
    title: '校长',
    education: '教育学博士',
    experience: '从教25年，特级教师',
    responsibility: '全面负责学校工作，统筹规划学校发展',
    image: '/about/principal.jpg',
    email: 'zhangming@jszhongxue.edu.cn',
  },
  {
    id: 2,
    name: '李红',
    title: '党委书记',
    education: '政治学硕士',
    experience: '从教20年，高级教师',
    responsibility: '负责学校党建和思想政治工作，协助校长开展学校管理',
    image: '/about/leader1.jpg',
    email: 'lihong@jszhongxue.edu.cn',
  },
  {
    id: 3,
    name: '王刚',
    title: '副校长',
    education: '教育管理硕士',
    experience: '从教18年，高级教师',
    responsibility: '分管教学工作，负责课程建设和教学管理',
    image: '/about/leader2.jpg',
    email: 'wanggang@jszhongxue.edu.cn',
  },
  {
    id: 4,
    name: '赵敏',
    title: '副校长',
    education: '心理学硕士',
    experience: '从教15年，高级教师',
    responsibility: '分管德育工作，负责学生管理和心理健康教育',
    image: '/about/leader3.jpg',
    email: 'zhaomin@jszhongxue.edu.cn',
  },
  {
    id: 5,
    name: '陈伟',
    title: '副校长',
    education: '管理学硕士',
    experience: '从教16年，高级教师',
    responsibility: '分管后勤工作，负责学校设施建设和安全保障',
    image: '/about/leader4.jpg',
    email: 'chenwei@jszhongxue.edu.cn',
  },
  {
    id: 6,
    name: '杨丽',
    title: '工会主席',
    education: '法学硕士',
    experience: '从教19年，高级教师',
    responsibility: '负责工会工作，关心教职工福利，组织文体活动',
    image: '/about/leader5.jpg',
    email: 'yangli@jszhongxue.edu.cn',
  },
];

export default function LeadershipPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">领导团队</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">领导团队</h1>

        {/* 团队介绍 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">团队介绍</h2>
          <p className="text-gray-700 mb-4">
            建设中学拥有一支高素质、专业化的领导团队。团队成员均具有丰富的教育教学和管理经验，
            他们在各自的岗位上勤勉尽责，团结协作，共同推动学校的改革与发展。
          </p>
          <p className="text-gray-700 mb-4">
            学校领导班子注重教育理念创新，坚持依法治校、民主管理，积极推进课程改革和教学创新，
            着力提升教育教学质量，为学生提供优质的教育资源和成长环境。
          </p>
        </div>

        {/* 领导团队成员 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {leadershipTeam.map((leader) => (
            <div key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
              {/* 照片 */}
              <div className="md:w-1/3 relative h-64 md:h-auto">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* 信息 */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-blue-600 font-medium">{leader.title}</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {leader.education}
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">教育经历</p>
                  <p className="text-gray-700">{leader.experience}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">工作职责</p>
                  <p className="text-gray-700">{leader.responsibility}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">联系方式</p>
                  <a
                    href={`mailto:${leader.email}`}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {leader.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 组织架构图 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">组织架构</h2>
          <div className="relative h-96 w-full mb-4">
            <Image
              src="/about/org-chart.jpg"
              alt="建设中学组织架构图"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-gray-600 italic">
            学校组织架构图 (点击查看大图)
          </p>
          <p className="text-gray-700 mt-6">
            建设中学实行校长负责制，下设教学、德育、后勤、科研、人事等部门，形成了科学高效的管理体系。
            各部门分工明确，协作紧密，共同保障学校各项工作的顺利开展。
          </p>
        </div>

        {/* 工作会议 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">工作会议制度</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">校务会议</h3>
              <p className="text-gray-700">
                每周一次，由校长主持，全体校级领导参加，讨论学校重大事项和近期工作安排。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">行政会议</h3>
              <p className="text-gray-700">
                每两周一次，由校长主持，校级领导和中层干部参加，研究具体工作实施方案。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">教学工作会议</h3>
              <p className="text-gray-700">
                每月一次，由分管教学的副校长主持，教务处和各教研组长参加，研究教学工作。
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">德育工作会议</h3>
              <p className="text-gray-700">
                每月一次，由分管德育的副校长主持，政教处和各年级组长参加，研究德育工作。
              </p>
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