'use client';

import Link from 'next/link';
import Image from 'next/image';
import AdmissionPlanCard from '@/components/admission/AdmissionPlanCard';
import AdmissionCard from '@/components/admission/AdmissionCard';
import AdmissionFilters from '@/components/admission/AdmissionFilters';
import VisitBookingForm from '@/components/admission/VisitBookingForm';
import { 
  admissionPlans, 
  admissionNotices, 
  admissionPolicies, 
  getAllYears, 
  getAllTypes, 
  getPlansByYearAndType,
  getNoticesByYearAndType,
  getPoliciesByYearAndType,
  AdmissionYear, 
  AdmissionType 
} from '@/data/admissionData';

export default function AdmissionPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 使用解构或安全访问模式，避免直接访问 searchParams.year
  const yearParam = typeof searchParams?.year === 'string' ? searchParams.year as AdmissionYear : undefined;
  const typeParam = typeof searchParams?.type === 'string' ? searchParams.type as AdmissionType : undefined;
  
  // 获取当前年份
  const currentYear = getAllYears()[0]; // 默认第一个是最新的年份
  
  // 获取筛选后的招生计划
  const filteredPlans = getPlansByYearAndType(yearParam || currentYear, typeParam);
  
  // 获取最新的招生公告和政策
  const latestNotices = getNoticesByYearAndType(yearParam || currentYear, typeParam).slice(0, 3);
  const latestPolicies = getPoliciesByYearAndType(yearParam || currentYear, typeParam).slice(0, 2);
  
  // 获取所有年份和类型，用于筛选
  const allYears = getAllYears();
  const allTypes = getAllTypes();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 招生信息页面头部 */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg overflow-hidden shadow-xl mb-8">
        <div className="relative h-64">
          <Image
            src="/admission/header-banner.jpg"
            alt="招生信息"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
            <h1 className="text-4xl font-bold mb-4 text-center">2024年招生信息</h1>
            <p className="text-xl text-center max-w-2xl">
              欢迎加入建设中学，这里是培养未来领袖的摇篮，我们提供优质的教育资源和多元的发展机会
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link href="/admission/faq" className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-2 px-6 rounded-full transition-colors shadow-md">
                招生问答
              </Link>
              <Link href="/admission/guide" className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-2 px-6 rounded-full transition-colors">
                招生指南
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选器 */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <AdmissionFilters 
          years={allYears}
          types={allTypes}
          defaultYear={currentYear}
          currentYear={yearParam}
          typeParam={typeParam}
        />
      </div>

      {/* 招生计划区域 */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">招生计划</h2>
          <Link 
            href="/admission/plans" 
            className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
          >
            查看全部计划
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.length > 0 ? (
            filteredPlans.slice(0, 3).map((plan) => (
              <AdmissionPlanCard key={plan.id} plan={plan} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-gray-500">
              暂无符合条件的招生计划
            </div>
          )}
        </div>
      </div>

      {/* 最新公告与政策区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 最新公告区域 */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">最新公告</h2>
            <Link 
              href="/admission/notices" 
              className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            >
              查看全部公告
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {latestNotices.length > 0 ? (
              latestNotices.map((notice) => (
                <AdmissionCard key={notice.id} item={notice} type="notice" />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                暂无符合条件的招生公告
              </div>
            )}
          </div>
        </div>

        {/* 招生政策区域 */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">招生政策</h2>
            <Link 
              href="/admission/policies" 
              className="text-blue-600 hover:text-blue-800 flex items-center transition-colors"
            >
              查看全部政策
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="space-y-4">
            {latestPolicies.length > 0 ? (
              latestPolicies.map((policy) => (
                <AdmissionCard key={policy.id} item={policy} type="policy" />
              ))
            ) : (
              <div className="py-10 text-center text-gray-500">
                暂无符合条件的招生政策
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 招生咨询区域 */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-bold mb-4">招生咨询</h2>
            <p className="text-gray-700 mb-6">
              如果您在报名过程中有任何问题，或者希望了解更多关于我校的招生信息，欢迎通过以下方式联系我们的招生办公室。
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium">招生热线</p>
                  <p className="text-gray-600">010-12345678（工作日 8:30-16:30）</p>
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
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium">招生办公室</p>
                  <p className="text-gray-600">北京市海淀区建设路100号行政楼1层104室</p>
                </div>
              </div>
            </div>
          </div>
          <VisitBookingForm />
        </div>
      </div>
    </div>
  );
} 