import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '组织架构 - 建设中学',
  description: '建设中学组织架构及各部门职责介绍',
};

// 部门数据
const departments = [
  {
    id: 1,
    name: '校长办公室',
    description: '负责学校日常行政事务，协助校长处理各类文件、会议安排、接待来访等工作，是学校日常运转的枢纽。',
    responsibilities: [
      '负责学校行政公文处理、印发及档案管理工作',
      '负责校长办公会议及全校性大型会议的组织工作',
      '负责学校重大活动的组织协调工作',
      '负责学校对外联络和接待工作',
      '负责学校信息公开工作',
    ],
    director: '王丽',
    staffCount: 5,
  },
  {
    id: 2,
    name: '教务处',
    description: '负责学校教学工作的计划、组织和管理，包括课程安排、教学计划制定、教学质量监控等，是学校教学工作的中枢。',
    responsibilities: [
      '制定学校教学计划和教学管理制度',
      '负责课程建设和教学改革工作',
      '组织教学质量检测与评估',
      '负责教学设备和实验室的管理',
      '组织教学研究和教学竞赛活动',
    ],
    director: '张伟',
    staffCount: 8,
  },
  {
    id: 3,
    name: '政教处（德育处）',
    description: '负责学校德育工作和学生日常管理，包括思想政治教育、行为规范养成、心理健康教育等，是学校德育工作的主要部门。',
    responsibilities: [
      '负责学生思想政治教育和品德教育工作',
      '负责学生行为规范养成教育和日常管理',
      '组织学生活动和社会实践',
      '负责班主任工作的指导和管理',
      '负责学生心理健康教育和咨询工作',
    ],
    director: '李强',
    staffCount: 7,
  },
  {
    id: 4,
    name: '教科室',
    description: '负责学校教育科研工作，包括教学研究、教育改革实验、学科建设等，是学校教育教学创新的重要部门。',
    responsibilities: [
      '组织开展教育教学研究活动',
      '负责教师专业发展和继续教育工作',
      '组织教育教学改革实验项目',
      '负责学科建设和教学资源建设',
      '组织教师参与市级以上科研项目和竞赛',
    ],
    director: '陈明',
    staffCount: 6,
  },
  {
    id: 5,
    name: '总务处',
    description: '负责学校后勤保障工作，包括校舍维护、设备采购、安全保卫、膳食管理等，为学校正常运转提供物质保障。',
    responsibilities: [
      '负责学校财务管理和资产管理',
      '负责学校基建维修和环境管理',
      '负责学校安全保卫工作',
      '负责学校食堂和宿舍管理',
      '负责学校水电和设备维护管理',
    ],
    director: '赵刚',
    staffCount: 12,
  },
  {
    id: 6,
    name: '党委办公室',
    description: '负责学校党建工作，包括党员教育管理、组织发展、思想建设等，是学校党组织的工作机构。',
    responsibilities: [
      '负责党员发展和教育管理工作',
      '组织党内政治学习和主题教育活动',
      '负责党建工作的计划制定和实施',
      '负责工青妇等群团组织的指导工作',
      '负责廉政建设和党风党纪教育工作',
    ],
    director: '张红',
    staffCount: 4,
  },
  {
    id: 7,
    name: '工会办公室',
    description: '负责教职工福利和权益保障，组织文体活动，协调劳资关系，是教职工的"娘家人"。',
    responsibilities: [
      '维护教职工合法权益',
      '组织教职工文化体育活动',
      '参与学校民主管理和监督',
      '负责教职工福利和慰问工作',
      '组织教师节等重大节日庆祝活动',
    ],
    director: '杨丽',
    staffCount: 3,
  },
  {
    id: 8,
    name: '年级组',
    description: '负责各年级的教育教学和学生管理工作，是连接学校和班级的重要纽带。',
    responsibilities: [
      '组织实施年级教育教学计划',
      '协调各班级工作和活动',
      '负责年级学生的日常管理和教育',
      '组织年级教学研讨和经验交流',
      '负责与家长的沟通和联系',
    ],
    director: '各年级组长',
    staffCount: '每年级4-5人',
  },
];

export default function StructurePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">组织架构</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">组织架构</h1>

        {/* 组织架构简介 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">组织架构简介</h2>
          <p className="text-gray-700 mb-4">
            建设中学实行校长负责制，下设校长办公室、教务处、政教处、教科室、总务处等职能部门，
            形成了科学高效的管理体系。各部门分工明确，协作紧密，各司其职，共同保障学校各项工作的顺利开展。
          </p>
          <p className="text-gray-700 mb-6">
            学校设有党委办公室和工会办公室，负责学校党建工作和教职工权益保障。
            以年级组和教研组为基层组织单位，形成了完善的三级管理体系。
          </p>
        </div>

        {/* 组织架构图 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">组织架构图</h2>
          <div className="relative h-96 md:h-[500px] w-full mb-4">
            <Image
              src="/about/org-chart.jpg"
              alt="建设中学组织架构图"
              fill
              className="object-contain"
            />
          </div>
          <p className="text-center text-gray-600 italic mb-6">
            建设中学组织架构图 (点击查看大图)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-center">学校领导层</h3>
              <p className="text-sm text-center">校长、党委书记、副校长</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-center">中层管理部门</h3>
              <p className="text-sm text-center">各处室、年级组、教研组</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-center">基层教学组织</h3>
              <p className="text-sm text-center">各班级、教师团队</p>
            </div>
          </div>
        </div>

        {/* 部门职责 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">部门职责</h2>
          <div className="space-y-6">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-600 text-white p-4">
                  <h3 className="text-xl font-bold">{dept.name}</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-700">{dept.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="bg-blue-50 px-3 py-1 rounded-full text-sm text-blue-700">
                      负责人: {dept.director}
                    </div>
                    <div className="bg-green-50 px-3 py-1 rounded-full text-sm text-green-700">
                      工作人员: {dept.staffCount}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">主要职责:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {dept.responsibilities.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 管理制度 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">管理制度</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">会议制度</h3>
              <ul className="space-y-2 text-gray-700">
                <li>校务会议：每周一次，由校长主持</li>
                <li>行政会议：每两周一次，研究具体工作方案</li>
                <li>教学工作会议：每月一次，研究教学工作</li>
                <li>德育工作会议：每月一次，研究德育工作</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">决策机制</h3>
              <ul className="space-y-2 text-gray-700">
                <li>重大事项：校长办公会议集体讨论决定</li>
                <li>常规工作：分管校长负责决策</li>
                <li>教职工重大利益事项：教职工代表大会讨论</li>
                <li>专业教学事项：教学委员会研究决定</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">考核评价</h3>
              <ul className="space-y-2 text-gray-700">
                <li>部门考核：每学期一次，年终总结评价</li>
                <li>教师考核：教学质量、师德表现、工作业绩</li>
                <li>学生评价：综合素质评价，多维度发展</li>
                <li>360度评价：领导、同事、学生多方评价</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">监督机制</h3>
              <ul className="space-y-2 text-gray-700">
                <li>党委监督：全面从严治党，廉洁自律</li>
                <li>民主监督：教职工代表大会监督</li>
                <li>家长监督：家长委员会参与监督</li>
                <li>社会监督：社会各界参与和监督</li>
              </ul>
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