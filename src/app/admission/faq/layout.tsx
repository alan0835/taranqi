import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '招生问答 - 建设中学',
  description: '建设中学招生常见问题解答，包括报名条件、考试内容、录取政策等相关信息',
};

export default function AdmissionFAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 