'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CarouselItem = {
  id: number;
  image: string;
  title: string;
  link: string;
  description: string;
};

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    image: '/carousel/banner1.jpg',
    title: '2024学年招生简章',
    description: '欢迎优秀初中毕业生报考我校，共创美好未来！',
    link: '/admission',
  },
  {
    id: 2,
    image: '/carousel/banner2.jpg',
    title: '校园开放日活动',
    description: '来校园参观，感受我们的教学环境和学术氛围',
    link: '/news/open-day',
  },
  {
    id: 3,
    image: '/carousel/banner3.jpg',
    title: '科技创新大赛',
    description: '我校学生在全国中学生科技创新大赛中荣获佳绩',
    link: '/achievements/science-competition',
  },
  {
    id: 4,
    image: '/carousel/banner4.jpg',
    title: '校园文化艺术节',
    description: '展示学生才艺，培养艺术素养，丰富校园文化生活',
    link: '/news/art-festival',
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // 手动切换到上一张
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // 手动切换到下一张
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <div className="relative w-full overflow-hidden h-[500px] rounded-xl">
      {/* 轮播内容 */}
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="min-w-full h-full relative">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              priority={item.id === 1}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
              <p className="mb-4 max-w-2xl">{item.description}</p>
              <Link 
                href={item.link}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                查看详情
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 指示器 */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>

      {/* 左右箭头 */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        onClick={prevSlide}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors"
        onClick={nextSlide}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
} 