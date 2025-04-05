import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '招生计划 - 建设中学',
  description: '建设中学招生计划信息，包括各年度初升高、小升初、国际班、艺术特长生等招生计划详情。',
};

export default function AdmissionPlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 