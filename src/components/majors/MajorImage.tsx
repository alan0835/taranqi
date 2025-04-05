'use client';

import Image from 'next/image';

interface MajorImageProps {
  slug: string;
  name: string;
  category: string;
}

export default function MajorImage({ slug, name, category }: MajorImageProps) {
  return (
    <Image
      src={`/majors/${slug}.jpg`}
      alt={name}
      fill
      className="object-cover"
      onError={(e) => {
        // 图片加载失败时使用备用图片
        const target = e.target as HTMLImageElement;
        target.src = `/majors/${category.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      }}
    />
  );
} 