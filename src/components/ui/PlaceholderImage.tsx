export default function PlaceholderImage({
  category = '校园新闻',
  className = 'w-full h-full',
}: {
  category?: string;
  className?: string;
}) {
  // 根据分类选择不同的背景颜色
  let bgColor = 'bg-blue-500';
  let textColor = 'text-white';
  
  if (category === '通知公告') {
    bgColor = 'bg-amber-500';
  } else if (category === '媒体聚焦') {
    bgColor = 'bg-purple-500';
  }
  
  return (
    <div 
      className={`${className} ${bgColor} ${textColor} flex items-center justify-center`}
    >
      <div className="text-center">
        <div className="text-3xl font-bold mb-2">建设中学</div>
        <div className="text-lg">{category}</div>
      </div>
    </div>
  );
} 