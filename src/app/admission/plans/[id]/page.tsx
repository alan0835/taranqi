import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { 
  admissionPlans,
  getExamSchedule,
  getPoliciesByYearAndType,
  getAdmissionScore,
  AdmissionPlan,
  AdmissionYear,
  AdmissionType,
  AdmissionPolicy,
  AdmissionScore,
  ExamSchedule
} from '@/data/admissionData';

interface PlanDetailPageProps {
  params: {
    id: string;
  };
}

// 根据ID获取招生计划
const getAdmissionPlanById = (id: string): AdmissionPlan | undefined => {
  return admissionPlans.find(plan => plan.id === id);
};

// 根据年份和类型获取历年分数线
const getAdmissionScoresByYearAndType = (year: AdmissionYear, type: AdmissionType): AdmissionScore[] => {
  const scores: AdmissionScore[] = [];
  const currentYearScore = getAdmissionScore(year, type);
  if (currentYearScore) {
    scores.push(currentYearScore);
  }
  
  // 如果有历年数据，可以添加
  return scores;
};

// 根据年份和类型获取考试安排
const getExamScheduleByYearAndType = (year: AdmissionYear, type: AdmissionType): ExamSchedule | undefined => {
  return getExamSchedule(year, type);
};

// 根据年份和类型获取相关政策
const getAdmissionPoliciesByYearAndType = (year: AdmissionYear, type: AdmissionType): AdmissionPolicy[] => {
  return getPoliciesByYearAndType(year, type);
};

export async function generateMetadata({ params }: PlanDetailPageProps): Promise<Metadata> {
  const plan = getAdmissionPlanById(params.id);
  
  if (!plan) {
    return {
      title: '计划不存在 - 建设中学招生信息',
    };
  }

  return {
    title: `${plan.year}年${plan.type}招生计划 - 建设中学`,
    description: `建设中学${plan.year}年${plan.type}招生计划详情，包括招生人数、录取要求、考试科目等信息。`,
  };
}

export default function PlanDetailPage({ params }: PlanDetailPageProps) {
  const plan = getAdmissionPlanById(params.id);
  
  if (!plan) {
    notFound();
  }

  // 获取相关考试安排
  const examSchedule = getExamScheduleByYearAndType(plan.year, plan.type);
  
  // 获取相关招生政策
  const policies = getAdmissionPoliciesByYearAndType(plan.year, plan.type);
  
  // 获取历年分数
  const scores = getAdmissionScoresByYearAndType(plan.year, plan.type);

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '报名中':
        return 'bg-green-100 text-green-800';
      case '未开始':
        return 'bg-gray-100 text-gray-800';
      case '已结束':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/admission" className="hover:text-blue-600">招生信息</Link>
          <span className="mx-2">/</span>
          <Link href="/admission/plans" className="hover:text-blue-600">招生计划</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">{plan.year}年{plan.type}</span>
        </nav>

        {/* 招生计划标题卡片 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{plan.year}年{plan.type}招生计划</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plan.status)}`}>
              {plan.status}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
              <span className="text-3xl font-bold text-blue-600">{plan.planCount}</span>
              <span className="text-gray-600">计划招生人数</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-indigo-50 rounded-lg">
              <span className="text-3xl font-bold text-indigo-600">{plan.classCount}</span>
              <span className="text-gray-600">计划班级数</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-purple-50 rounded-lg">
              <span className="text-3xl font-bold text-purple-600">{examSchedule ? '已安排' : '待定'}</span>
              <span className="text-gray-600">考试安排</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* 招生要求 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                招生要求
              </h2>
              <p className="text-gray-700">{plan.requirements}</p>
            </div>

            {/* 考试科目 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                考试科目
              </h2>
              {plan.examSubjects && plan.examSubjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plan.examSubjects.map((subject: string, index: number) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3">
                        {index + 1}
                      </span>
                      <span>{subject}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">具体考试科目待定</p>
              )}
            </div>

            {/* 历年录取分数 */}
            {scores && scores.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  历年录取分数
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">年份</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最低分</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">平均分</th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">最高分</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {scores.map((score: AdmissionScore, index: number) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{score.year}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{score.minimumScore}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{score.averageScore}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{score.highestScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {/* 考试安排 */}
            {examSchedule && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  考试安排
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">报名时间</h3>
                    <p className="text-gray-800">{examSchedule.registrationStart} 至 {examSchedule.registrationEnd}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">考试日期</h3>
                    <p className="text-gray-800">{examSchedule.examDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">考试地点</h3>
                    <p className="text-gray-800">{examSchedule.examLocation}</p>
                  </div>
                </div>

                {plan.status === '报名中' && (
                  <div className="mt-6">
                    <Link href="/admission/apply" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors">
                      立即报名
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* 相关政策 */}
            {policies && policies.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  相关政策
                </h2>
                <div className="space-y-3">
                  {policies.map((policy: AdmissionPolicy, index: number) => (
                    <Link 
                      key={index} 
                      href={`/admission/policies/${policy.id}`}
                      className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="font-medium text-blue-600">{policy.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">发布时间: {policy.publishDate}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 咨询方式 */}
            <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">咨询方式</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium">招生热线</p>
                    <p className="text-gray-600">010-12345678</p>
                    <p className="text-gray-500 text-sm">工作日 8:30-16:30</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">电子邮箱</p>
                    <p className="text-gray-600">admissions@jszhongxue.edu.cn</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admission/faq" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  查看常见问题
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 