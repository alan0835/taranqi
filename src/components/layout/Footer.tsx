import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 联系信息 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系我们</h3>
            <address className="not-italic">
              <div className="flex items-start mb-2">
                <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>北京市海淀区知春路123号</span>
              </div>
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <span>010-12345678</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>info@jszhongxue.edu.cn</span>
              </div>
            </address>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-300 transition-colors">
                  学校概况
                </Link>
              </li>
              <li>
                <Link href="/admission" className="hover:text-blue-300 transition-colors">
                  招生信息
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-300 transition-colors">
                  新闻动态
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300 transition-colors">
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* 关注我们 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">关注我们</h3>
            <div className="flex space-x-4">
              <div className="relative w-32 h-32">
                <Image 
                  src="/wechat-qr.png" 
                  alt="微信公众号" 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="mb-2">扫描二维码关注</p>
                <p className="text-sm">获取学校最新动态</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} 建设中学 版权所有</p>
          <p className="mt-1">
            <Link href="/privacy" className="hover:text-blue-300 transition-colors">
              隐私政策
            </Link>
            {' | '}
            <Link href="/terms" className="hover:text-blue-300 transition-colors">
              使用条款
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
} 