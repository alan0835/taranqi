'use client';

import { useState, useEffect } from 'react';
import { FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { Conversation } from '@/types/conversation';
import { conversationHistoryService } from '@/services/conversationHistoryService';

interface ConversationHistoryProps {
  onSelectConversation: (conversation: Conversation) => void;
  currentConversationId?: string;
}

export default function ConversationHistory({
  onSelectConversation,
  currentConversationId
}: ConversationHistoryProps) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [showConfirmDelete, setShowConfirmDelete] = useState<string | null>(null);
  
  // 加载会话历史
  useEffect(() => {
    loadConversations();
    // 监听存储变化
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // 加载会话历史的方法
  const loadConversations = () => {
    const loadedConversations = conversationHistoryService.getConversations();
    setConversations(loadedConversations);
  };
  
  // 处理本地存储变化
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'majorConsultant_conversations') {
      loadConversations();
    }
  };
  
  // 格式化日期
  const formatDate = (date: Date) => {
    // 如果日期是字符串，转换为Date对象
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // 是否是今天
    if (dateObj.toDateString() === today.toDateString()) {
      return `今天 ${dateObj.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }
    // 是否是昨天
    else if (dateObj.toDateString() === yesterday.toDateString()) {
      return `昨天 ${dateObj.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`;
    }
    // 其他日期
    else {
      return dateObj.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
    }
  };
  
  // 处理删除会话
  const handleDeleteConversation = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (showConfirmDelete === id) {
      // 确认删除
      conversationHistoryService.deleteConversation(id);
      loadConversations();
      setShowConfirmDelete(null);
    } else {
      // 显示确认删除提示
      setShowConfirmDelete(id);
    }
  };
  
  // 处理清空所有会话
  const handleClearAll = () => {
    if (window.confirm('确定要清空所有对话历史吗？此操作无法撤销。')) {
      conversationHistoryService.clearAllConversations();
      loadConversations();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h3 className="text-lg font-medium text-gray-700 px-4 py-3 border-b border-gray-200">对话历史</h3>
        
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            暂无对话历史
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {conversations.map((conversation) => (
              <li 
                key={conversation.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
                  conversation.id === currentConversationId ? 'bg-blue-50' : ''
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{conversation.title}</p>
                  <p className="text-xs text-gray-500">{formatDate(conversation.createdAt)}</p>
                </div>
                <button
                  className={`p-1 rounded-full ${
                    showConfirmDelete === conversation.id ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={(e) => handleDeleteConversation(conversation.id, e)}
                  title={showConfirmDelete === conversation.id ? '确认删除' : '删除对话'}
                >
                  {showConfirmDelete === conversation.id ? <FaExclamationTriangle /> : <FaTrash />}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {conversations.length > 0 && (
        <div className="p-3 border-t border-gray-200">
          <button 
            onClick={handleClearAll}
            className="text-xs text-red-600 hover:text-red-800 transition-colors"
          >
            清空所有对话历史
          </button>
        </div>
      )}
    </div>
  );
} 