import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '教学成果 - 霍城县江苏中学',
  description: '霍城县江苏中学各类教学成果展示，包括教师荣誉、学生荣誉、学校荣誉、科研成果和特色项目',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 