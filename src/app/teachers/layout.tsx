import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '教师团队 - 建设中学',
  description: '建设中学优秀教师团队介绍，包括特级教师、学科带头人及各学科教研组教师',
};

export default function TeachersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 