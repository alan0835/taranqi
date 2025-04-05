import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '新闻动态 - 建设中学',
  description: '建设中学最新校园新闻、通知公告及媒体报道',
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 