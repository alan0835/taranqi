import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '校长致辞 - 建设中学',
  description: '建设中学校长对学校发展的愿景和对学生的期望',
};

export default function PrincipalPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 面包屑导航 */}
        <nav className="flex items-center text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-blue-600">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/about" className="hover:text-blue-600">学校概况</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-800 font-medium">校长致辞</span>
        </nav>

        <h1 className="text-3xl font-bold text-center mb-10">校长致辞</h1>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* 校长照片 */}
            <div className="md:w-1/3 flex flex-col items-center">
              <div className="relative h-80 w-full mb-4">
                <Image
                  src="/about/principal.jpg"
                  alt="张明校长"
                  fill
                  className="object-cover object-top rounded-lg"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold">张明</h3>
                <p className="text-gray-600">建设中学校长</p>
                <p className="text-gray-600">教育学博士，特级教师</p>
              </div>
            </div>

            {/* 致辞内容 */}
            <div className="md:w-2/3">
              <blockquote className="text-xl italic text-gray-700 border-l-4 border-blue-500 pl-4 mb-6">
                "教育不仅是传授知识，更是点亮心灵的火炬。我们致力于培养具有创新精神和社会责任感的未来领袖。"
              </blockquote>

              <div className="prose prose-blue max-w-none">
                <p>
                  尊敬的家长、亲爱的同学们、各位来宾：
                </p>
                <p>
                  欢迎来到建设中学！作为校长，我很荣幸能与您分享我们学校的教育理念和发展愿景。
                </p>
                <p>
                  建设中学成立于1985年，经过近四十年的发展，已成为一所以培养学生全面发展为目标的现代化学校。我们秉承"厚德载物，自强不息"的校训，致力于为每一位学生提供优质的教育资源和成长环境。
                </p>
                <p>
                  在当今这个迅速变化的世界中，教育面临着前所未有的挑战和机遇。作为教育工作者，我们不仅要传授知识，更要培养学生的创新思维、批判精神和终身学习能力。建设中学始终坚持以学生为中心，关注每个学生的个性发展，帮助他们发现自己的潜能和兴趣，为未来的人生奠定坚实基础。
                </p>
                <p>
                  我们学校拥有一支高素质的教师队伍，他们不仅学识渊博，更具有教育情怀和专业精神。我们鼓励教师不断学习和成长，以适应教育改革和社会发展的需要。同时，我们也注重与家长和社会各界的合作，共同为学生的成长创造良好的环境。
                </p>
                <p>
                  建设中学注重学生的全面发展，我们不仅关注学术成就，还重视学生的品德教育、艺术素养、体育锻炼和社会实践。我们鼓励学生积极参与各类活动，发展多元智能，培养健全人格。
                </p>
                <p>
                  展望未来，建设中学将继续坚持教育创新，推进课程改革，加强信息化建设，为学生提供更加个性化、多元化的教育。我们的目标是将学校建设成为一所具有国际视野、中国特色的现代化学校，为社会培养更多具有创新精神和社会责任感的高素质人才。
                </p>
                <p>
                  最后，我衷心希望每一位建设中学的学生都能在这里度过充实而有意义的学习生活，实现自己的梦想，成为有用之才。也欢迎各位家长和社会各界朋友对我们的工作提出宝贵意见和建议，共同为教育事业的发展贡献力量。
                </p>
                <p>
                  谢谢大家！
                </p>
                <div className="mt-8 text-right">
                  <p className="font-bold">张明</p>
                  <p>建设中学校长</p>
                  <p>2023年9月1日</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 校长简介 */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">校长简介</h2>
          <p className="text-gray-700 mb-4">
            张明，教育学博士，特级教师，国家级骨干教师，曾获全国优秀教育工作者称号。1995年毕业于北京师范大学教育系，2001年获教育学博士学位。
          </p>
          <p className="text-gray-700 mb-4">
            张校长有着丰富的教育教学和管理经验，曾在多所知名中学任教和担任管理工作。2015年起担任建设中学校长，任职期间，学校教育教学质量稳步提升，
            办学特色日益鲜明，多次获得省市级荣誉称号。
          </p>
          <p className="text-gray-700 mb-4">
            张校长积极推动教育改革和创新，主持多项教育科研课题，发表多篇教育研究论文，出版教育专著2部。他倡导"以学生为中心"的教育理念，
            注重学生的全面发展和个性化培养，深受师生和家长的尊敬与爱戴。
          </p>
        </div>

        {/* 办学理念 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">我们的办学理念</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-blue-600 text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">创新思维</h3>
              <p className="text-gray-600">培养学生的创新精神和批判性思维，鼓励他们提出问题、思考解决方案</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-blue-600 text-4xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold mb-2">人文关怀</h3>
              <p className="text-gray-600">注重学生的心理健康和情感教育，培养他们的同理心和社会责任感</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <div className="text-blue-600 text-4xl mb-4">🌎</div>
              <h3 className="text-xl font-semibold mb-2">国际视野</h3>
              <p className="text-gray-600">培养学生的全球意识和跨文化交流能力，帮助他们适应未来的国际化环境</p>
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