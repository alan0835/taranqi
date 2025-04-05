/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 配置webpack，使用简化的配置避免错误
  webpack: (config, { isServer }) => {
    // 简化webpack配置，避免undefined错误
    if (!isServer) {
      // 默认情况下使用Next.js的配置而不进行深度修改
      if (config.optimization) {
        // 只设置最基本的优化选项
        config.optimization.minimize = true;
      }
    }
    
    return config;
  },
  
  // 配置外部脚本域名
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://webapi.amap.com https://restapi.amap.com https://*.amap.com; worker-src blob: 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://*.amap.com; connect-src 'self' https://*.amap.com https://restapi.amap.com; frame-src 'self' https://*.amap.com;",
          },
          // 添加缓存控制头，确保浏览器不会过度缓存
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // 配置外部图片域名
  images: {
    domains: ['webapi.amap.com', 'restapi.amap.com'],
    // 添加更多图片优化配置，确保生产环境正确加载图片
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 确保Next.js不预渲染客户端组件
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    },
    // 启用运行时JS优化
    optimizePackageImports: ['react-icons'],
    // 添加试验性渲染模式，确保客户端组件正确渲染
    serverComponentsExternalPackages: [],
  },

  // 配置静态生成参数
  staticPageGenerationTimeout: 120, // 增加超时时间到120秒
  
  // 忽略特定控制台警告
  onDemandEntries: {
    // 每页缓存时间（单位：秒）
    maxInactiveAge: 25 * 1000,
    // 最大页面数
    pagesBufferLength: 2,
  },
  
  // 关闭源码映射以加快构建速度
  productionBrowserSourceMaps: false,
  
  // 修改日志级别来忽略特定警告
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 加快构建
  swcMinify: true,
  
  // 增加一致性配置
  poweredByHeader: false,
  compress: true,
};

module.exports = nextConfig;
