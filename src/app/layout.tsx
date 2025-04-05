import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AlertProvider } from "@/contexts/AlertContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "霍城县江苏中学 - 官方网站",
  description: "霍城县江苏中学官方网站，提供学校概况、教师团队、招生信息等内容",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col`}
      >
        <AlertProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AlertProvider>
      </body>
    </html>
  );
}
