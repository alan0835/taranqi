'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// 动态导入ClientAMapComponent组件，确保只在客户端渲染
const ClientAMapComponent = dynamic(
  () => import('@/components/ClientAMapComponent'),
  { ssr: false }
);

// 联系方式数据
const contactInfo = [
  {
    id: 1,
    title: '学校地址',
    content: '新疆维吾尔自治区伊犁哈萨克自治州霍城县江苏中学（新校区）',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '电子邮箱',
    content: '学校邮箱: info@hcjszx.edu.cn\n招生咨询: admission@hcjszx.edu.cn\n就业指导: career@hcjszx.edu.cn',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: '办公时间',
    content: '周一至周五: 8:00 - 17:30\n周六: 9:00 - 12:00\n周日: 休息',
    icon: (
      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
    email: 'principal@hcjszx.edu.cn',
  },
  {
    id: 2,
    department: '教务处',
    contact: '李主任',
    phone: '0123-4567890转802',
    email: 'academic@hcjszx.edu.cn',
  },
  {
    id: 3,
    department: '政教处',
    contact: '张主任',
    phone: '0123-4567890转803',
    email: 'discipline@hcjszx.edu.cn',
  },
  {
    id: 4,
    department: '总务处',
    contact: '赵主任',
    phone: '0123-4567890转804',
    email: 'logistics@hcjszx.edu.cn',
  },
  {
    id: 5,
    department: '招生办',
    contact: '陈老师',
    phone: '0123-4567891',
    email: 'admission@hcjszx.edu.cn',
  },
  {
    id: 6,
    department: '就业指导中心',
    contact: '黄老师',
    phone: '0123-4567890转806',
    email: 'career@hcjszx.edu.cn',
  },
];

// 社交媒体数据
const socialMedia = [
  {
    id: 1,
    name: '微信公众号',
    account: '霍城县江苏中学官方公众号',
    qrcode: '/about/contact/wechat-qr.jpg',
  },
  {
    id: 2,
    name: '微博',
    account: '@霍城县江苏中学官方微博',
    qrcode: '/about/contact/weibo-qr.jpg',
  },
  {
    id: 3,
    name: '抖音',
    account: '@霍城县江苏中学官方抖音',
    qrcode: '/about/contact/douyin-qr.jpg',
  },
];

export default function ContactPage() {
  // 添加表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 模拟表单提交
    setTimeout(() => {
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">联系我们</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">联系霍城县江苏中学</h1>

        {/* 联系方式 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactInfo.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex">
              <div className="flex-shrink-0 mr-4">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-700 whitespace-pre-line">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 地图 */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <h2 className="text-2xl font-bold p-6 border-b border-gray-200">学校位置</h2>
          <div className="relative w-full h-96">
            <ClientAMapComponent 
              longitude={80.860132}  // 霍城县江苏中学经度
              latitude={44.043420}   // 霍城县江苏中学纬度
              title="霍城县江苏中学（新校区）" 
              zoom={15}
              height="380px"
            />
          </div>
          <div className="p-6 bg-gray-50">
            <h3 className="font-bold text-lg mb-4">交通指南</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">公交路线：</span>乘坐霍城县公交1路、2路公交车，在"江苏中学站"下车，步行约100米可达
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">长途路线：</span>在霍城县汽车站下车后，可乘坐出租车前往学校，车程约15分钟
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">自驾路线：</span>导航至"霍城县江苏中学（新校区）"，校门口设有访客停车场
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-2">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-700">
                  <span className="font-medium">详细地址：</span>新疆维吾尔自治区伊犁哈萨克自治州霍城县江苏中学（新校区）（邮编：835200）
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* 部门联系人 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">部门联系人</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">部门</th>
                  <th className="py-3 px-4 text-left">联系人</th>
                  <th className="py-3 px-4 text-left">电话</th>
                  <th className="py-3 px-4 text-left">邮箱</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {departmentContacts.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4">{item.department}</td>
                    <td className="py-3 px-4">{item.contact}</td>
                    <td className="py-3 px-4">{item.phone}</td>
                    <td className="py-3 px-4">
                      <a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">
                        {item.email}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">关注我们</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {socialMedia.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.account}</p>
                <div className="relative h-48 w-48 mx-auto">
                  <Image
                    src={item.qrcode}
                    alt={`${item.name}二维码`}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">扫描二维码关注</p>
              </div>
            ))}
          </div>
        </div>

        {/* 留言反馈 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">留言反馈</h2>
          <p className="text-gray-700 mb-6 text-center">
            如有任何问题、建议或意见，欢迎填写以下表单与我们联系。我们将尽快回复您。
          </p>
          
          {!submitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入您的姓名"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    电话
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="请输入您的联系电话"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的邮箱地址"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  主题
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入留言主题"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  留言内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的留言内容"
                ></textarea>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  提交留言
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">留言提交成功</h3>
              <p className="text-gray-600 mb-4">感谢您的留言，我们会尽快与您联系。</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors"
              >
                再次留言
              </button>
            </div>
          )}
        </div>

        {/* 返回按钮 */}
        <div className="text-center mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
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