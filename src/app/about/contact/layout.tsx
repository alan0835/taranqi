import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 - 霍城县江苏中学',
  description: '霍城县江苏中学联系方式、地址、交通指南及反馈渠道',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 