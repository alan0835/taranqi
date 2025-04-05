import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 - 建设中学',
  description: '建设中学联系方式、地址、交通指南及在线咨询表单',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 