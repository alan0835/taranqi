import { Metadata } from 'next';
import Link from 'next/link';
import MajorConsultant from '@/components/majors/MajorConsultant';

export const metadata: Metadata = {
  title: '专业咨询助手 - 建设中学',
  description: '基于深度学习技术的智能专业咨询助手，为您提供高考专业选择、院校推荐、职业规划等服务',
};

export default function MajorConsultantPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">专业咨询助手</h1>
          <p className="text-lg text-gray-600">
            智能咨询助手可为您提供专业选择、院校比较、职业规划等方面的个性化指导
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-0 overflow-hidden">
          <MajorConsultant />
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">使用指南</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>您可以直接提问关于专业选择、院校比较、就业前景等方面的问题</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>点击"功能模板"按钮，可使用预设的专业推荐、院校比较等功能</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>点击预设问题可快速发起常见咨询</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>您的对话历史将自动保存，方便随时查看和继续咨询</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>咨询助手提供的建议仅供参考，请结合个人实际情况做出决策</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 