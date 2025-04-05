'use client';

import { useState, useEffect } from 'react';
import { allTeachers, getAllDepartments, getAllTitles, TeacherDepartment, TeacherTitle } from '@/data/teachersData';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function TeachersPage() {
  const searchParams = useSearchParams();
  const [departmentParam, setDepartmentParam] = useState<TeacherDepartment | undefined>(undefined);
  const [titleParam, setTitleParam] = useState<TeacherTitle | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');
  
  // 初始化参数
  useEffect(() => {
    // 获取筛选参数
    const department = searchParams.get('department') as TeacherDepartment | null;
    const title = searchParams.get('title') as TeacherTitle | null;
    const search = searchParams.get('search');
    
    setDepartmentParam(department || undefined);
    setTitleParam(title || undefined);
    setSearchTerm(search || '');
  }, [searchParams]);
  
  // 获取所有学科部门和职称（用于筛选）
  const allDepartments = getAllDepartments();
  const allTitles = getAllTitles();
  
  // 筛选教师
  const filteredTeachers = allTeachers.filter(teacher => {
    // 按部门筛选
    if (departmentParam && teacher.department !== departmentParam) {
      return false;
    }
    
    // 按职称筛选
    if (titleParam && teacher.title !== titleParam) {
      return false;
    }
    
    // 按搜索词筛选（名字、简介、研究方向等）
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = teacher.name.toLowerCase().includes(searchLower);
      const introMatch = teacher.introduction.toLowerCase().includes(searchLower);
      const researchMatch = teacher.researchFields?.some(field => 
        field.toLowerCase().includes(searchLower)
      );
      
      return nameMatch || introMatch || (researchMatch || false);
    }
    
    return true;
  });
  
  // 教师团队统计数据
  const teacherStats = {
    total: allTeachers.length,
    special: allTeachers.filter(t => t.title === '特级教师').length,
    senior: allTeachers.filter(t => t.title === '高级教师').length,
    doctorates: allTeachers.filter(t => t.education.includes('博士')).length,
    masters: allTeachers.filter(t => t.education.includes('硕士')).length,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 页面标题 */}
      <h1 className="text-3xl font-bold text-center mb-6">教师团队</h1>
      
      {/* 简介和统计 */}
      <div className="bg-blue-50 rounded-lg p-6 mb-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 mb-6">
            建设中学拥有一支高素质、专业化的教师队伍，他们不仅学识渊博，教学经验丰富，更具有强烈的教育情怀和责任感。
            我们的教师团队中有特级教师{teacherStats.special}名，高级教师{teacherStats.senior}名，
            拥有博士学位{teacherStats.doctorates}名，硕士学位{teacherStats.masters}名。
            他们在各自的专业领域不断探索创新，为学生提供优质的教育教学服务。
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{teacherStats.total}</div>
              <div className="text-gray-600">教师总数</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{teacherStats.special}</div>
              <div className="text-gray-600">特级教师</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{teacherStats.senior}</div>
              <div className="text-gray-600">高级教师</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-3xl font-bold text-blue-600">{teacherStats.doctorates + teacherStats.masters}</div>
              <div className="text-gray-600">硕博学历</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 搜索和筛选 */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* 搜索框 */}
          <div className="md:w-1/3">
            <form>
              <div className="relative">
                <input
                  type="text"
                  name="search"
                  placeholder="搜索教师姓名、简介..."
                  defaultValue={searchTerm}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-10"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-3"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
          
          {/* 学科筛选 */}
          <div className="md:w-1/3">
            <select
              name="department"
              defaultValue={departmentParam}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('department', e.target.value);
                } else {
                  url.searchParams.delete('department');
                }
                window.location.href = url.toString();
              }}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">全部学科</option>
              {allDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          
          {/* 职称筛选 */}
          <div className="md:w-1/3">
            <select
              name="title"
              defaultValue={titleParam}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('title', e.target.value);
                } else {
                  url.searchParams.delete('title');
                }
                window.location.href = url.toString();
              }}
              className="w-full p-3 border border-gray-300 rounded-lg"
            >
              <option value="">全部职称</option>
              {allTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* 当前筛选条件 */}
        {(departmentParam || titleParam || searchTerm) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-gray-600">当前筛选:</span>
            {departmentParam && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                {departmentParam}
                <Link href={{
                  pathname: '/teachers',
                  query: {
                    ...(titleParam && { title: titleParam }),
                    ...(searchTerm && { search: searchTerm }),
                  }
                }}>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </span>
            )}
            {titleParam && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                {titleParam}
                <Link href={{
                  pathname: '/teachers',
                  query: {
                    ...(departmentParam && { department: departmentParam }),
                    ...(searchTerm && { search: searchTerm }),
                  }
                }}>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </span>
            )}
            {searchTerm && (
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                搜索: {searchTerm}
                <Link href={{
                  pathname: '/teachers',
                  query: {
                    ...(departmentParam && { department: departmentParam }),
                    ...(titleParam && { title: titleParam }),
                  }
                }}>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Link>
              </span>
            )}
            <Link 
              href="/teachers"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              清除全部
            </Link>
          </div>
        )}
      </div>
      
      {/* 教师列表 */}
      {filteredTeachers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <Link key={teacher.id} href={`/teachers/${teacher.slug}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex p-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={teacher.avatar}
                      alt={teacher.name}
                      fill
                      className="object-cover rounded-full"
                    />
                    {teacher.title === '特级教师' && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 py-0.5 rounded">
                        特级
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h2 className="text-xl font-bold">{teacher.name}</h2>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        {teacher.department}
                      </span>
                      <span className="text-sm bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                        {teacher.title}
                      </span>
                      {teacher.position && (
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          {teacher.position}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{teacher.education} · {teacher.major}</p>
                    <p className="text-sm text-gray-600">教龄: {teacher.teachingYears}年</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-gray-600 line-clamp-2 text-sm">
                    {teacher.introduction}
                  </p>
                  <div className="mt-3 flex justify-between items-center">
                    <div>
                      {teacher.researchFields && (
                        <div className="flex flex-wrap gap-1">
                          {teacher.researchFields.slice(0, 2).map((field, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                              {field}
                            </span>
                          ))}
                          {teacher.researchFields.length > 2 && (
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                              +{teacher.researchFields.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center">
                      详细介绍
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">未找到符合条件的教师</h3>
          <p className="text-gray-600 mb-4">请尝试调整筛选条件或搜索关键词</p>
          <Link
            href="/teachers"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            查看所有教师
          </Link>
        </div>
      )}
      
      {/* 团队文化 */}
      <div className="mt-12 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">我们的团队文化</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">专业引领</h3>
            <p className="text-gray-600">
              我们的教师团队始终保持专业学习的热情，不断更新教育理念，提升教学能力，引领教育教学改革创新。
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">关爱学生</h3>
            <p className="text-gray-600">
              我们的教师秉持"以学生为中心"的理念，关注每个学生的成长需求，尊重个体差异，因材施教，帮助学生全面发展。
            </p>
          </div>
          <div className="text-center p-4">
            <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">团队协作</h3>
            <p className="text-gray-600">
              我们鼓励教师间的经验分享与合作，通过集体备课、教研活动和跨学科合作，打造高效协作的教学团队文化。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 