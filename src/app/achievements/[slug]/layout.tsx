import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '教学成果详情 - 霍城县江苏中学',
  description: '霍城县江苏中学教学成果详细信息',
};

export default function Layout({ 
  children,
  params
}: { 
  children: React.ReactNode,
  params: { slug: string }
}) {
  return <>{children}</>;
} 