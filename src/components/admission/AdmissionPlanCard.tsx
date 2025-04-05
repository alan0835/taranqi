'use client';

import { AdmissionPlan } from '@/data/admissionData';
import Link from 'next/link';

interface AdmissionPlanCardProps {
  plan: AdmissionPlan;
}

export default function AdmissionPlanCard({ plan }: AdmissionPlanCardProps) {
  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case '未开始':
        return 'bg-gray-100 text-gray-800';
      case '报名中':
        return 'bg-green-100 text-green-800';
      case '考试中':
        return 'bg-blue-100 text-blue-800';
      case '录取中':
        return 'bg-purple-100 text-purple-800';
      case '已结束':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取类型颜色
  const getTypeColor = (type: string) => {
    switch (type) {
      case '小升初':
        return 'border-blue-500';
      case '初升高':
        return 'border-green-500';
      case '国际班':
        return 'border-purple-500';
      case '艺术特长生':
        return 'border-pink-500';
      case '体育特长生':
        return 'border-orange-500';
      default:
        return 'border-gray-500';
    }
  };

  // 获取类型图标
  const getTypeIcon = (type: string) => {
    switch (type) {
      case '小升初':
        return (
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case '初升高':
        return (
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case '国际班':
        return (
          <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '艺术特长生':
        return (
          <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case '体育特长生':
        return (
          <svg className="w-10 h-10 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      default:
        return (
          <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  return (
    <div className={`bg-white border-l-4 rounded-lg shadow-md overflow-hidden ${getTypeColor(plan.type)}`}>
      <div className="p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-shrink-0">
            {getTypeIcon(plan.type)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-1">
              <span className={`${getStatusColor(plan.status)} text-xs font-medium px-2.5 py-1 rounded`}>
                {plan.status}
              </span>
              <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                {plan.year}年
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-1">{plan.year}年{plan.type}招生</h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <div>
              <div className="text-gray-700">计划招生人数</div>
              <div className="font-medium">{plan.planCount}人</div>
            </div>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div>
              <div className="text-gray-700">班级数</div>
              <div className="font-medium">{plan.classCount}个班</div>
            </div>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium mb-2">招生要求</h4>
          <p className="text-sm text-gray-700">{plan.requirements}</p>
        </div>

        {plan.examSubjects.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">考试科目</h4>
            <div className="flex flex-wrap gap-2">
              {plan.examSubjects.map((subject, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <Link 
            href={`/admission/details?year=${plan.year}&type=${encodeURIComponent(plan.type)}`} 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看详细信息
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
} 