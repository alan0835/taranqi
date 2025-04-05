import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取请求路径
  const path = request.nextUrl.pathname;
  
  // 判断是否访问管理员路由
  const isAdminRoute = path.startsWith('/admin');
  const isLoginRoute = path === '/admin/login';
  
  // 检查是否已经登录
  const isAuthenticated = request.cookies.has('adminAuthenticated');
  
  // 如果是管理员路由（但不是登录页面）且没有登录，重定向到登录页面
  if (isAdminRoute && !isLoginRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }
  
  // 如果已经登录且试图访问登录页面，重定向到仪表盘
  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// 配置需要进行中间件检查的路径
export const config = {
  matcher: ['/admin/:path*'],
}; 