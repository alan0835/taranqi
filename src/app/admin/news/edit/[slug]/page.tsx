'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAlerts } from '@/contexts/AlertContext';
import dynamic from 'next/dynamic';
import { NewsCategory, allNews } from '@/data/newsData';
import Link from 'next/link';
import Image from 'next/image';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

// 动态导入富文本编辑器，避免SSR问题
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

// 编辑器工具栏配置
const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'color': [] }, { 'background': [] }],
    ['link', 'image'],
    ['clean'],
  ],
};

interface EditNewsPageProps {
  params: {
    slug: string;
  };
}

export default function EditNewsPage({ params }: EditNewsPageProps) {
  const { slug } = params;
  const router = useRouter();
  const { showSuccess, showError } = useAlerts();
  
  // 表单状态
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '校园新闻' as NewsCategory,
    date: new Date().toISOString().split('T')[0],
    summary: '',
    content: '',
    coverImage: '',
    author: '',
    source: '',
  });
  
  // 草稿状态
  const [isDraft, setIsDraft] = useState(false);
  
  // 图片预览
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // 上传状态
  const [isUploading, setIsUploading] = useState(false);
  
  // 提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 文件附件
  const [attachments, setAttachments] = useState<File[]>([]);
  
  // 加载状态
  const [isLoading, setIsLoading] = useState(true);
  
  // 获取新闻数据
  useEffect(() => {
    const loadNewsData = () => {
      // 查找匹配的新闻
      const news = allNews.find(item => item.slug === slug);
      
      if (news) {
        setFormData({
          title: news.title,
          slug: news.slug,
          category: news.category,
          date: new Date(news.date).toISOString().split('T')[0],
          summary: news.summary,
          content: news.content || '',
          coverImage: news.coverImage || '',
          author: news.author || '',
          source: news.source || '',
        });
        
        // 如果有封面图，设置预览
        if (news.coverImage) {
          // 实际项目中应该使用完整的图片URL
          // 这里模拟预览图片
          setImagePreview(`/news/${news.coverImage}`);
        }
      } else {
        // 未找到新闻，显示错误
        showError('加载失败', '找不到指定的新闻');
        router.push('/admin/news');
      }
      
      setIsLoading(false);
    };
    
    loadNewsData();
  }, [slug, router, showError]);
  
  // 处理表单字段变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // 如果标题变化，自动生成slug
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-') // 保留中文字符
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      setFormData((prev) => ({
        ...prev,
        slug,
      }));
    }
  };
  
  // 处理富文本编辑器内容变化
  const handleContentChange = (content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };
  
  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      // 检查文件类型
      if (!file.type.startsWith('image/')) {
        showError('上传失败', '只能上传图片文件');
        return;
      }
      
      // 检查文件大小 (最大2MB)
      if (file.size > 2 * 1024 * 1024) {
        showError('上传失败', '图片大小不能超过2MB');
        return;
      }
      
      // 在实际项目中，这里应该调用API上传图片
      // 这里仅作为示例，使用本地URL预览
      setIsUploading(true);
      
      // 模拟上传延迟
      setTimeout(() => {
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        setFormData((prev) => ({
          ...prev,
          coverImage: `${file.name}`, // 假设这是上传后的URL
        }));
        setIsUploading(false);
      }, 1000);
    }
  };
  
  // 处理文件附件上传
  const handleAttachmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // 将FileList转换为数组
      const newFiles = Array.from(files);
      setAttachments((prev) => [...prev, ...newFiles]);
    }
  };
  
  // 移除附件
  const handleRemoveAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent, saveAsDraft: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 验证表单
    if (!formData.title) {
      showError('提交失败', '请填写新闻标题');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.summary) {
      showError('提交失败', '请填写新闻摘要');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // 在实际项目中，这里应该调用API更新新闻
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (saveAsDraft) {
        showSuccess('草稿已保存', '您可以在草稿箱中查看和编辑');
      } else {
        showSuccess('新闻更新成功', '新闻已发布到网站');
      }
      
      router.push('/admin/news');
    } catch (error) {
      showError('提交失败', '发生错误，请稍后再试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 计算字数统计
  const contentCharCount = formData.content.replace(/<[^>]*>/g, '').length;
  
  // 加载中显示
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-lg text-gray-700">加载中...</span>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">编辑新闻</h1>
        <p className="mt-1 text-sm text-gray-500">
          编辑现有的校园新闻、通知公告或媒体报道
        </p>
      </div>
      
      <form onSubmit={(e) => handleSubmit(e, isDraft)}>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 左侧表单 */}
            <div className="space-y-6">
              {/* 标题 */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="请输入新闻标题"
                />
              </div>
              
              {/* URL路径 */}
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  URL路径
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                    /news/
                  </span>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="auto-generated-url"
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  谨慎修改，可能影响现有链接
                </p>
              </div>
              
              {/* 分类 */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  分类 <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="校园新闻">校园新闻</option>
                  <option value="通知公告">通知公告</option>
                  <option value="媒体聚焦">媒体聚焦</option>
                </select>
              </div>
              
              {/* 发布日期 */}
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  发布日期
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              
              {/* 作者 */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  作者
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="请输入作者姓名"
                />
              </div>
              
              {/* 来源 */}
              <div>
                <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
                  来源
                </label>
                <input
                  type="text"
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="请输入新闻来源，例如：建设中学"
                />
              </div>
            </div>
            
            {/* 右侧表单 */}
            <div className="space-y-6">
              {/* 封面图片 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  封面图片
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  {imagePreview ? (
                    <div className="space-y-2 w-full">
                      <div className="relative h-48 w-full overflow-hidden rounded-md">
                        <Image
                          src={imagePreview}
                          alt="封面预览"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex justify-center">
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData((prev) => ({ ...prev, coverImage: '' }));
                          }}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-700 bg-white rounded-md border border-gray-300 hover:bg-red-50"
                        >
                          移除图片
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <div className="relative h-48 w-full mb-3">
                        <PlaceholderImage category={formData.category} />
                      </div>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>{isUploading ? '上传中...' : '上传图片'}</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                          />
                        </label>
                        <p className="pl-1">或拖放图片到此处</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        支持PNG, JPG, GIF, 最大2MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* 摘要 */}
              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
                  摘要 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  rows={3}
                  required
                  value={formData.summary}
                  onChange={handleChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="请输入新闻摘要，100-200字"
                />
                <p className="mt-1 text-sm text-gray-500">
                  字数：{formData.summary.length}/200
                </p>
              </div>
              
              {/* 文件附件 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  文件附件
                </label>
                <div className="mt-1">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="attachment-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>上传文件</span>
                          <input
                            id="attachment-upload"
                            name="attachment-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleAttachmentUpload}
                            multiple
                          />
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        支持DOC, PDF, ZIP, 最大10MB
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* 附件列表 */}
                {attachments.length > 0 && (
                  <ul className="mt-3 divide-y divide-gray-100 border border-gray-200 rounded-md">
                    {attachments.map((file, index) => (
                      <li key={index} className="flex items-center justify-between py-2 px-3">
                        <div className="flex items-center">
                          <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm text-gray-800 truncate max-w-xs">{file.name}</span>
                          <span className="ml-2 text-xs text-gray-500">({(file.size / 1024).toFixed(1)}KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* 富文本编辑器 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              内容
            </label>
            <div className="border border-gray-300 rounded-md">
              {typeof window !== 'undefined' && (
                <ReactQuill
                  value={formData.content}
                  onChange={handleContentChange}
                  modules={modules}
                  className="h-64"
                  placeholder="请输入新闻正文内容..."
                />
              )}
            </div>
            <p className="mt-2 text-sm text-gray-500">
              字数：{contentCharCount} 字
            </p>
          </div>
        </div>
        
        {/* 按钮组 */}
        <div className="flex justify-end space-x-4 mt-8">
          <Link
            href="/admin/news"
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            取消
          </Link>
          <button
            type="button"
            onClick={(e) => {
              setIsDraft(true);
              handleSubmit(e, true);
            }}
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting && isDraft ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                保存中...
              </>
            ) : (
              '保存草稿'
            )}
          </button>
          <button
            type="submit"
            onClick={() => setIsDraft(false)}
            disabled={isSubmitting}
            className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSubmitting && !isDraft ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                更新中...
              </>
            ) : (
              '更新新闻'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 