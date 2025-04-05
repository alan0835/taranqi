'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 高德地图属性接口
interface AMapProps {
  longitude: number;
  latitude: number;
  title: string;
}

// 声明全局AMap接口
declare global {
  interface Window {
    AMap?: any;
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

// 动态导入的地图组件占位符
const MapPlaceholder = () => (
  <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
    <div className="text-center">
      <svg className="w-12 h-12 text-gray-400 mx-auto mb-4 animate-spin" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p className="text-gray-500">地图加载中...</p>
    </div>
  </div>
);

// 使用动态导入确保客户端渲染
const ClientAMapComponent = dynamic(
  () => import('@/components/map/AMapComponent').then(mod => mod.default),
  {
    ssr: false,
    loading: () => <MapPlaceholder />
  }
);

// 联系方式数据
const contactInfo = [
  {
    id: 1,
    title: '学校地址',
    content: '新疆伊犁哈萨克自治州霍城县江苏中学（新校区）',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '联系电话',
    content: '总机: 0123-4567890\n招生办: 0123-4567891\n办公室: 0123-4567892',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '电子邮箱',
    content: '学校邮箱: info@jszhongxue.edu.cn\n招生咨询: admission@jszhongxue.edu.cn\n就业指导: career@jszhongxue.edu.cn',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '办公时间',
    content: '周一至周五: 8:00 - 17:30\n周六: 9:00 - 12:00\n周日: 休息',
    icon: (
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// 部门联系人数据
const departmentContacts = [
  {
    id: 1,
    department: '校长办公室',
    contact: '王主任',
    phone: '0123-4567890转801',
    email: 'principal@jszhongxue.edu.cn',
  },
  {
    id: 2,
    department: '教务处',
    contact: '李主任',
    phone: '0123-4567890转802',
    email: 'academic@jszhongxue.edu.cn',
  },
  {
    id: 3,
    department: '政教处',
    contact: '张主任',
    phone: '0123-4567890转803',
    email: 'discipline@jszhongxue.edu.cn',
  },
  {
    id: 4,
    department: '总务处',
    contact: '赵主任',
    phone: '0123-4567890转804',
    email: 'logistics@jszhongxue.edu.cn',
  },
  {
    id: 5,
    department: '招生办',
    contact: '陈老师',
    phone: '0123-4567891',
    email: 'admission@jszhongxue.edu.cn',
  },
  {
    id: 6,
    department: '就业指导中心',
    contact: '黄老师',
    phone: '0123-4567890转806',
    email: 'career@jszhongxue.edu.cn',
  },
];

// 社交媒体数据
const socialMedia = [
  {
    id: 1,
    name: '微信公众号',
    account: '建设中学官方公众号',
    qrcode: '/contact/wechat-qr.jpg',
    icon: (
      <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.667 11.511a.996.996 0 110-1.992.996.996 0 010 1.992zm6.666 0a.996.996 0 110-1.992.996.996 0 010 1.992zm-9.247 6.217l-1.215.408c-.24.08-.486-.158-.424-.41l.309-.99a.892.892 0 00-.118-.898C3.002 14.116 2 12.366 2 10.477c0-3.765 3.582-6.817 8-6.817s8 3.052 8 6.817c0 3.765-3.582 6.817-8 6.817-1.032 0-2.015-.138-2.92-.362a.893.893 0 00-.724.178l-2.32 2.618z"/>
      </svg>
    ),
  },
  {
    id: 2,
    name: '微博',
    account: '@建设中学官方微博',
    qrcode: '/contact/weibo-qr.jpg',
    icon: (
      <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.194 14.487c0 3.625-4.655 6.56-10.394 6.56-5.738 0-10.393-2.935-10.393-6.56 0-3.624 4.655-6.56 10.393-6.56 5.739 0 10.394 2.936 10.394 6.56zm-15.067.889a.584.584 0 01-.775-.066.538.538 0 01.052-.772c.823-.771 1.918-1.017 2.971-.718a1.32 1.32 0 011.014 1.19c.015.326-.117.635-.357.835-.24.199-.56.277-.867.209-.307-.067-.585-.279-.753-.575a.985.985 0 00-1.285-.103zm3.285 2.604c-.154.223-.492.328-.753.233-.261-.094-.347-.348-.193-.57.153-.223.491-.328.752-.234.261.095.347.349.194.571zm.344-1.902c-1.338-.341-2.857.314-3.442 1.459-.596 1.17-.019 2.47 1.331 2.896 1.4.44 3.055-.234 3.635-1.509.57-1.258-.142-2.518-1.524-2.846zm11.245-7.223l-.3.008a.614.614 0 00-.082-.011h-.953v-1.274a.64.64 0 00-.64-.64h-.426a.64.64 0 00-.64.64v1.274h-1.696a.736.736 0 00-.736.736v.384c0 .406.33.736.736.736h1.696v1.103h-2.059a.614.614 0 00-.614.614v.365c0 .34.275.615.614.615h2.06v1.236c0 .34.286.618.638.618h.43a.628.628 0 00.637-.618v-1.236h.952a.736.736 0 00.736-.736v-.365a.736.736 0 00-.736-.735h-.953v-1.103h1.697c.407 0 .736-.33.736-.736v-.384a.736.736 0 00-.736-.736h-1.697V8.42h.953c.34 0 .618-.274.618-.613v-.324a.616.616 0 00-.535-.628z"/>
      </svg>
    ),
  },
  {
    id: 3,
    name: '抖音',
    account: '@建设中学官方抖音',
    qrcode: '/contact/douyin-qr.jpg',
    icon: (
      <svg className="w-8 h-8 text-black" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
];

// 常见咨询主题
const commonTopics = [
  { id: 1, name: '招生咨询' },
  { id: 2, name: '就读指南' },
  { id: 3, name: '校园参观' },
  { id: 4, name: '教师招聘' },
  { id: 5, name: '合作交流' },
  { id: 6, name: '其他问题' },
];

export default function ContactPage() {
  // 状态管理
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 处理表单输入
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // 验证表单
    if (!formData.name || !formData.phone || !formData.email || !formData.topic || !formData.message) {
      setError('请填写所有必填字段');
      return;
    }

    // 模拟表单提交
    setSubmitting(true);
    
    // 模拟API调用
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      // 重置表单
      setFormData({
        name: '',
        phone: '',
        email: '',
        topic: '',
        message: '',
      });
      
      // 3秒后重置提交状态
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部banner */}
      <div className="relative bg-blue-600 h-48 md:h-64">
        <div className="absolute inset-0 bg-blue-700 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-indigo-700 opacity-80"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">联系我们</h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              有任何问题或建议？我们随时欢迎您的来信来电！
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-10">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">联系我们</span>
        </nav>

        {/* 主要联系方式 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">{item.title}</h3>
                <p className="text-gray-700 whitespace-pre-line text-center">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* 地图和交通指南 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <h2 className="text-2xl font-bold p-6 border-b border-gray-200">
                学校位置
              </h2>
              <div className="relative w-full">
                <ClientAMapComponent longitude={80.860132} latitude={44.043420} title="霍城县江苏中学（新校区）" />
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">交通指南</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="mt-1 flex-shrink-0 text-blue-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700">地址：新疆维吾尔自治区伊犁哈萨克自治州霍城县霍城县江苏中学（新校区）</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 flex-shrink-0 text-blue-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7h-4v4h4V7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">公交路线：</p>
                        <p className="text-gray-700">乘坐霍城县1路、2路公交车至"江苏中学站"下车，步行约3分钟可达</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 flex-shrink-0 text-blue-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">自驾路线：</p>
                        <p className="text-gray-700">导航搜索"霍城县江苏中学（新校区）"即可。校内设有访客停车场。</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mt-1 flex-shrink-0 text-blue-600 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gray-700 font-medium">乘坐出租车：</p>
                        <p className="text-gray-700">在霍城县汽车站打车至江苏中学新校区，车程约15分钟。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 联系表单 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="text-2xl font-bold p-6 border-b border-gray-200">
              在线咨询
            </h2>
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入您的姓名"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      电话 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入您的联系电话"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      邮箱 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入您的邮箱地址"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                      咨询主题 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">请选择咨询主题</option>
                      {commonTopics.map(topic => (
                        <option key={topic.id} value={topic.name}>{topic.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      留言内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="请输入您的咨询内容"
                      required
                    ></textarea>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                      {error}
                    </div>
                  )}
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 transition-colors"
                    >
                      {submitting ? '提交中...' : '提交咨询'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-8">
                  <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">提交成功！</h3>
                  <p className="text-gray-600 mb-4">
                    感谢您的留言，我们会尽快与您联系。
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 focus:outline-none transition-colors"
                  >
                    再次咨询
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 部门联系人 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">部门联系人</h2>
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">负责人</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">联系电话</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">电子邮箱</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {departmentContacts.map((contact, index) => (
                  <tr key={contact.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{contact.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.contact}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-800">
                      <a href={`mailto:${contact.email}`}>{contact.email}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 关注我们 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">关注我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {socialMedia.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-6">{item.account}</p>
                <div className="relative h-48 w-48 mx-auto bg-gray-100 rounded-lg overflow-hidden">
                  {/* 实际项目中替换为真实二维码图片 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-gray-500">扫描关注{item.name}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 常见问题引导 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg shadow-md p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">还有其他问题？</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            您可以查看我们的常见问题解答，或直接与我们联系获取更多帮助和支持。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/admission/faq" 
              className="px-6 py-3 bg-white text-blue-700 font-medium rounded-md hover:bg-blue-50 transition-colors"
            >
              查看常见问题
            </Link>
            <a 
              href="tel:0123-4567891" 
              className="px-6 py-3 bg-blue-700 text-white font-medium rounded-md border border-blue-400 hover:bg-blue-800 transition-colors"
            >
              立即咨询热线
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 