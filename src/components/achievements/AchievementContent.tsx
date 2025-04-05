'use client';

import { useState, useEffect } from 'react';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSanitize from 'rehype-sanitize';
import { unified } from 'unified';

export default function AchievementContent({ markdown }: { markdown: string }) {
  const [content, setContent] = useState<string>('');
  
  useEffect(() => {
    // 在客户端组件中安全地处理 Markdown
    const processMarkdown = async () => {
      const result = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeStringify)
        .process(markdown);
      
      setContent(result.toString());
    };
    
    processMarkdown();
  }, [markdown]);
  
  return (
    <article 
      className="prose prose-blue max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
} 