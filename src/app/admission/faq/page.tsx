'use client';

import Link from 'next/link';
import { useState } from 'react';
import { admissionFAQs, getFAQsByCategory } from '@/data/admissionData';
import { AdmissionFAQ } from '@/data/admissionData';

export default function AdmissionFAQPage() {
  const faqCategories = [
    '全部',
    '报名条件',
    '考试内容',
    '录取政策',
    '缴费事项',
    '其他',
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/admission" className="hover:text-blue-600">招生信息</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">招生问答</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-2xl font-bold mb-2">招生问答</h1>
          <p className="text-gray-600">
            这里汇总了家长和学生在报名、考试、录取等方面常见的问题及解答。
            如果您有其他疑问，欢迎联系我校招生办公室。
          </p>
        </div>

        {/* FAQ分类和内容 */}
        <div className="space-y-8">
          {/* 客户端分类组件 */}
          <FAQCategoriesClient faqCategories={faqCategories} faqs={admissionFAQs} />
        </div>

        {/* 联系信息 */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">还有其他问题？</h2>
          <p className="text-gray-700 mb-4">
            如果您没有在上述问答中找到需要的信息，请随时通过以下方式联系我们的招生办公室：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

// 客户端组件用于处理交互
interface FAQCategoriesClientProps {
  faqCategories: string[];
  faqs: AdmissionFAQ[];
}

function FAQCategoriesClient({ faqCategories, faqs }: FAQCategoriesClientProps) {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);

  // 根据类别筛选FAQ
  const filteredFAQs = activeCategory === '全部'
    ? faqs
    : faqs.filter(faq => faq.category === activeCategory);

  // 处理FAQ的展开/折叠
  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id) 
        : [...prev, id]
    );
  };

  return (
    <>
      {/* 分类标签 */}
      <div className="flex flex-wrap gap-2">
        {faqCategories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            } transition-colors`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ列表 */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all"
            >
              <button
                className="flex justify-between items-start w-full p-5 text-left"
                onClick={() => toggleFAQ(faq.id)}
              >
                <h3 className="text-lg font-medium pr-8">{faq.question}</h3>
                <svg
                  className={`w-5 h-5 text-gray-500 transform ${
                    openFAQs.includes(faq.id) ? 'rotate-180' : ''
                  } transition-transform`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div 
                className={`px-5 pb-5 transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                  openFAQs.includes(faq.id) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      {faq.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center text-gray-500">
            暂无相关问题
          </div>
        )}
      </div>
    </>
  );
} 