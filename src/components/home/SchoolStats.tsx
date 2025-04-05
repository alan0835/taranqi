'use client';

import { useEffect, useState, useRef } from 'react';

type StatItem = {
  id: number;
  title: string;
  value: number;
  suffix: string;
  description: string;
  icon: React.ReactNode;
};

export default function SchoolStats() {
  const statItems: StatItem[] = [
    {
      id: 1,
      title: '高考升学率',
      value: 98.7,
      suffix: '%',
      description: '近三年平均本科升学率',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: '重点高校录取',
      value: 52,
      suffix: '%',
      description: '985/211重点大学录取比例',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      id: 3,
      title: '竞赛获奖人数',
      value: 387,
      suffix: '人',
      description: '奥赛等全国性学科竞赛获奖',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: '师资力量',
      value: 82,
      suffix: '%',
      description: '硕博学历或高级职称老师比例',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
    },
  ];

  const [counters, setCounters] = useState(statItems.map(() => 0));
  const targetRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // 数字动画函数
  const animateNumbers = () => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    
    const duration = 2000; // 动画持续时间（毫秒）
    const frames = 60; // 动画帧数
    const interval = duration / frames;
    
    let frame = 0;
    const timer = setInterval(() => {
      if (frame >= frames) {
        clearInterval(timer);
        setCounters(statItems.map((item) => item.value));
        return;
      }
      
      const newCounters = statItems.map((item, index) => {
        const progress = frame / frames;
        // 使用缓动函数使动画更自然
        const easeOutQuad = 1 - Math.pow(1 - progress, 2);
        return Math.floor(item.value * easeOutQuad);
      });
      
      setCounters(newCounters);
      frame++;
    }, interval);
  };

  // 监听滚动，当组件进入视口时开始动画
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 py-12" ref={targetRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-10">学校荣誉</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statItems.map((item, index) => (
            <div 
              key={item.id} 
              className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center text-center"
            >
              <div className="text-blue-600 mb-4">{item.icon}</div>
              <h3 className="text-lg font-medium mb-2">{item.title}</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {counters[index]}{item.suffix}
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 