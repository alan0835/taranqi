import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '校园风光 - 建设中学',
  description: '建设中学校园环境、建筑设施及校园生活展示',
};

// 校园风光图片数据
const campusGallery = [
  {
    id: 1,
    category: '校园建筑',
    images: [
      {
        id: 101,
        title: '教学楼',
        description: '现代化教学楼，配备多媒体教室和智慧黑板',
        image: '/about/campus/building1.jpg',
      },
      {
        id: 102,
        title: '图书馆',
        description: '藏书20万册，电子资源丰富，为师生提供良好的阅读环境',
        image: '/about/campus/library.jpg',
      },
      {
        id: 103,
        title: '科技楼',
        description: '配备各类实验室和创客空间，支持学生科学探究',
        image: '/about/campus/science-building.jpg',
      },
      {
        id: 104,
        title: '艺术中心',
        description: '包含音乐厅、舞蹈室、美术室，满足艺术教育需求',
        image: '/about/campus/art-center.jpg',
      },
      {
        id: 105,
        title: '体育馆',
        description: '室内体育场馆，配备篮球场、羽毛球场、乒乓球室等设施',
        image: '/about/campus/gym.jpg',
      },
      {
        id: 106,
        title: '行政楼',
        description: '学校行政办公区，各职能部门办公场所',
        image: '/about/campus/admin-building.jpg',
      },
    ],
  },
  {
    id: 2,
    category: '运动场所',
    images: [
      {
        id: 201,
        title: '田径场',
        description: '标准400米塑胶跑道，足球场，满足体育教学和运动会需求',
        image: '/about/campus/track.jpg',
      },
      {
        id: 202,
        title: '篮球场',
        description: '室外标准篮球场6个，供学生课余锻炼使用',
        image: '/about/campus/basketball-court.jpg',
      },
      {
        id: 203,
        title: '乒乓球场',
        description: '室外乒乓球台12张，方便学生随时锻炼',
        image: '/about/campus/pingpong.jpg',
      },
      {
        id: 204,
        title: '游泳池',
        description: '室内恒温游泳池，全年开放，用于游泳教学',
        image: '/about/campus/pool.jpg',
      },
    ],
  },
  {
    id: 3,
    category: '校园环境',
    images: [
      {
        id: 301,
        title: '中心广场',
        description: '学校中心区域，举行重大活动和师生集会的场所',
        image: '/about/campus/square.jpg',
      },
      {
        id: 302,
        title: '生态园',
        description: '校内小型生态园，用于生物课实践和环保教育',
        image: '/about/campus/eco-garden.jpg',
      },
      {
        id: 303,
        title: '樱花大道',
        description: '校内主干道，两侧种植樱花树，春季绽放美不胜收',
        image: '/about/campus/cherry-road.jpg',
      },
      {
        id: 304,
        title: '校园小溪',
        description: '穿过校园的小溪，增添校园生态气息',
        image: '/about/campus/stream.jpg',
      },
      {
        id: 305,
        title: '文化长廊',
        description: '展示学校历史、成就和学生作品的室外长廊',
        image: '/about/campus/culture-corridor.jpg',
      },
    ],
  },
  {
    id: 4,
    category: '校园生活',
    images: [
      {
        id: 401,
        title: '社团活动',
        description: '丰富多彩的学生社团活动，培养兴趣特长',
        image: '/about/campus/club.jpg',
      },
      {
        id: 402,
        title: '运动会',
        description: '每年春季举办的校运动会，增强学生体魄',
        image: '/about/campus/sports-meeting.jpg',
      },
      {
        id: 403,
        title: '艺术节',
        description: '展示学生艺术才华的校园艺术节',
        image: '/about/campus/art-festival.jpg',
      },
      {
        id: 404,
        title: '科技节',
        description: '激发学生创新思维的科技节活动',
        image: '/about/campus/science-festival.jpg',
      },
      {
        id: 405,
        title: '读书角',
        description: '学生在校园内阅读交流的场景',
        image: '/about/campus/reading.jpg',
      },
    ],
  },
];

// 校园设施数据
const facilities = [
  { id: 1, name: '多媒体教室', count: 60, unit: '间' },
  { id: 2, name: '实验室', count: 15, unit: '间' },
  { id: 3, name: '图书馆藏书', count: 200000, unit: '册' },
  { id: 4, name: '运动场地面积', count: 15000, unit: '平方米' },
  { id: 5, name: '校园总面积', count: 80000, unit: '平方米' },
  { id: 6, name: '校园绿化率', count: 40, unit: '%' },
];

export default function CampusPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">校园风光</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-8">校园风光</h1>
        
        {/* 校园简介 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">校园环境</h2>
          <p className="text-gray-700 mb-4">
            建设中学位于城市中心区域，占地面积80000平方米，校园环境优美，绿树成荫。学校建筑
            融合现代与传统元素，既有现代化的教学设施，又保留了传统校园的文化氛围。
          </p>
          <p className="text-gray-700 mb-6">
            学校重视校园文化建设，环境育人，处处彰显人文关怀和科学精神。校园内设有文化长廊、
            生态园、樱花大道等特色景观，为师生提供了优美的学习和生活环境。
          </p>

          {/* 设施数据 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {facilities.map((item) => (
              <div key={item.id} className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{item.count.toLocaleString()}{item.unit}</div>
                <div className="text-gray-700">{item.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 校园全景 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">校园全景</h2>
          <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/about/campus/panorama.jpg"
              alt="建设中学校园全景"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <p className="text-white text-xl md:text-3xl font-bold">建设中学·美丽校园</p>
            </div>
          </div>
        </div>

        {/* 分类展示校园图片 */}
        {campusGallery.map((category) => (
          <div key={category.id} className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">{category.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {category.images.map((image) => (
                <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={image.image}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{image.title}</h3>
                    <p className="text-gray-600 text-sm">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 校园四季 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">校园四季</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative rounded-lg overflow-hidden h-60">
              <Image
                src="/about/campus/spring.jpg"
                alt="春季校园"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                <p className="text-white text-xl font-bold p-4">春·生机勃勃</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-60">
              <Image
                src="/about/campus/summer.jpg"
                alt="夏季校园"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                <p className="text-white text-xl font-bold p-4">夏·活力四射</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-60">
              <Image
                src="/about/campus/autumn.jpg"
                alt="秋季校园"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                <p className="text-white text-xl font-bold p-4">秋·硕果累累</p>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-60">
              <Image
                src="/about/campus/winter.jpg"
                alt="冬季校园"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end">
                <p className="text-white text-xl font-bold p-4">冬·静谧沉思</p>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-600 italic mt-4">
            四季更替，校园常新，建设中学以其独特的魅力吸引着每一位访客
          </p>
        </div>

        {/* 校园视频 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">校园视频</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="aspect-w-16 aspect-h-9">
              <div className="flex items-center justify-center bg-gray-200 h-full rounded-lg">
                <div className="text-center p-4">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="mt-4 text-gray-600">点击播放《美丽校园·建设中学》宣传片</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                播放视频
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                下载视频
              </button>
            </div>
          </div>
        </div>

        {/* 参观信息 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">校园参观</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">参观预约</h3>
              <p className="text-gray-700 mb-4">
                欢迎社会各界人士和学生家长参观我校。为确保校园安全和参观质量，
                请提前3个工作日预约，我们将安排专人接待。
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">预约方式：</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    电话：0123-4567890
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    邮箱：visit@jszhongxue.edu.cn
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    时间：周一至周五 9:00-16:00
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">交通指南</h3>
              <p className="text-gray-700 mb-4">
                我校位于市中心区域，交通便利，可通过多种方式抵达。
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="font-medium mb-2">到校方式：</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>公交：乘坐10路、15路、25路、36路公交车，在"建设中学站"下车</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>地铁：乘坐2号线至"文化广场站"B出口，步行500米即到</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 mr-2 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>自驾：导航至"建设中学"，校门口设有临时停车位（限停30分钟）</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="text-center mt-12">
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
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