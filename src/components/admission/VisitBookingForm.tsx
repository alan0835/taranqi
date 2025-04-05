'use client';

import { useState } from 'react';

export default function VisitBookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 这里可以添加实际的表单提交逻辑
    // 例如发送API请求到后端
    
    // 模拟提交过程
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage('预约信息已提交成功！我们的工作人员将尽快与您联系。');
      setFormData({
        name: '',
        phone: '',
        email: ''
      });
    }, 1000);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">预约参观</h3>
      <p className="text-gray-600 mb-4">
        我们定期组织校园开放日活动，欢迎感兴趣的学生和家长预约参观我校。
      </p>
      
      {submitMessage ? (
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <p className="text-green-700">{submitMessage}</p>
          <button 
            onClick={() => setSubmitMessage('')}
            className="mt-2 text-sm text-green-700 underline hover:no-underline"
          >
            提交新的预约
          </button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              姓名
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="请输入您的姓名"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              联系电话
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="请输入您的联系电话"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              电子邮箱
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="请输入您的电子邮箱"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? '提交中...' : '提交预约'}
          </button>
        </form>
      )}
    </div>
  );
} 