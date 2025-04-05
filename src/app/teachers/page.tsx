'use client';

import { useState, useEffect, Suspense } from 'react';
import { allTeachers, getAllDepartments, getAllTitles, TeacherDepartment, TeacherTitle } from '@/data/teachersData';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

// 使用 useSearchParams 的客户端组件
function TeachersContent() {
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
                      src={teacher.avatar || '/images/avatar-placeholder.jpg'}
                      alt={teacher.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-800">{teacher.name}</h3>
                    <p className="text-gray-600">{teacher.title}</p>
                    <p className="text-sm text-gray-500">{teacher.department}</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-gray-600 line-clamp-2 text-sm">{teacher.introduction}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">未找到符合条件的教师</h3>
          <p className="mt-1 text-gray-500">请尝试调整筛选条件</p>
        </div>
      )}
    </div>
  );
}

// 使用 Suspense 包裹的主页面组件
export default function TeachersPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">加载中...</div>}>
      <TeachersContent />
    </Suspense>
  );
} 