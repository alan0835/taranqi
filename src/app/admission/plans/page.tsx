'use client';

import Link from 'next/link';
import { 
  admissionPlans, 
  getAllYears, 
  getAllTypes, 
  getPlansByYearAndType,
  AdmissionPlan,
  AdmissionYear,
  AdmissionType,
  AdmissionStatus
} from '@/data/admissionData';
import PlanFilters from '@/components/admission/PlanFilters';

export default function AdmissionPlansPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const years = getAllYears();
  const types = getAllTypes();
  
  // 获取当前筛选参数，使用更安全的访问方式
  const yearParam = typeof searchParams?.year === 'string' ? searchParams.year as AdmissionYear : years[0];
  const typeParam = typeof searchParams?.type === 'string' ? searchParams.type as AdmissionType | '全部' : '全部';
  
  // 根据筛选条件获取招生计划
  const plans = typeParam === '全部'
    ? getPlansByYearAndType(yearParam)
    : getPlansByYearAndType(yearParam, typeParam as AdmissionType);

  // 获取状态颜色
  const getStatusColor = (status: AdmissionStatus) => {
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
  
  // 获取状态图标
  const getStatusIcon = (status: AdmissionStatus) => {
    switch (status) {
      case '报名中':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        );
      case '未开始':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '已结束':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/admission" className="hover:text-blue-600">招生信息</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">招生计划</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">招生计划</h1>
          <p className="text-gray-600">
            查看建设中学各学年各类型的招生计划详情，包括招生人数、考试安排、录取要求等信息。
          </p>
        </div>

        {/* 筛选表单 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <PlanFilters 
            years={years} 
            types={types} 
            defaultYear={years[0]} 
            defaultType="全部" 
          />
        </div>

        {/* 招生计划列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.length > 0 ? (
            plans.map((plan: AdmissionPlan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold">{plan.type}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(plan.status)}`}>
                      {getStatusIcon(plan.status)}
                      <span className="ml-1">{plan.status}</span>
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      计划招生: <span className="font-medium ml-1">{plan.planCount}人</span>
                    </div>
                    
                    {plan.classCount && (
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        计划班级: <span className="font-medium ml-1">{plan.classCount}个</span>
                      </div>
                    )}
                    
                    {plan.examSubjects && plan.examSubjects.length > 0 && (
                      <div className="flex items-start text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <div>
                          <span>考试科目:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {plan.examSubjects.map((subject: string, index: number) => (
                              <span key={index} className="inline-block px-2 py-1 bg-gray-100 rounded text-sm">
                                {subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <Link 
                    href={`/admission/plans/${plan.id}`} 
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    查看详情
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
              暂无符合条件的招生计划
            </div>
          )}
        </div>
        
        {/* 招生咨询 */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md p-8 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">需要招生咨询？</h2>
              <p className="text-blue-100 mb-4">
                如果您对招生计划有任何疑问，欢迎联系我们的招生办公室咨询。
              </p>
              <div className="flex items-center space-x-4">
                <a href="tel:01012345678" className="flex items-center text-white hover:text-blue-200 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  010-12345678
                </a>
                <a href="mailto:admissions@jszhongxue.edu.cn" className="flex items-center text-white hover:text-blue-200 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  发送邮件
                </a>
              </div>
            </div>
            <div>
              <Link 
                href="/admission/faq" 
                className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-medium py-2 px-6 rounded-md transition-colors"
              >
                查看常见问题
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 