'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 计算总页数
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // 如果只有一页，不显示分页
  if (totalPages <= 1) {
    return null;
  }
  
  // 创建一个新的URLSearchParams实例，以便我们可以修改
  const createPageURL = (pageNumber: number) => {
    // 将 ReadonlyURLSearchParams 转换为普通对象
    const params = new URLSearchParams();
    
    // 复制现有参数
    for (const [key, value] of searchParams.entries()) {
      params.set(key, value);
    }
    
    // 设置页码
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  
  // 生成页码数组
  const generatePagination = () => {
    // 如果总页数小于7，显示所有页码
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // 显示首页、尾页和当前页附近的页码
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  };
  
  const pagination = generatePagination();
  
  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center space-x-2" aria-label="分页导航">
        {/* 上一页按钮 */}
        <Link
          href={currentPage > 1 ? createPageURL(currentPage - 1) : '#'}
          className={`px-3 py-2 rounded-md ${
            currentPage === 1
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white hover:bg-gray-100'
          } border`}
          aria-disabled={currentPage === 1}
        >
          上一页
        </Link>
        
        {/* 页码按钮 */}
        {pagination.map((pageNumber, index) => (
          pageNumber === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-2">
              ...
            </span>
          ) : (
            <Link
              key={`page-${pageNumber}`}
              href={createPageURL(pageNumber as number)}
              className={`px-3 py-2 rounded-md ${
                currentPage === pageNumber
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 bg-white hover:bg-gray-100 border'
              }`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          )
        ))}
        
        {/* 下一页按钮 */}
        <Link
          href={currentPage < totalPages ? createPageURL(currentPage + 1) : '#'}
          className={`px-3 py-2 rounded-md ${
            currentPage >= totalPages
              ? 'text-gray-400 cursor-not-allowed bg-gray-100'
              : 'text-gray-700 bg-white hover:bg-gray-100'
          } border`}
          aria-disabled={currentPage >= totalPages}
        >
          下一页
        </Link>
      </nav>
    </div>
  );
} 