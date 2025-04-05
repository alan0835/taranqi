'use client';

import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaPaperPlane, FaRedo, FaPlus, FaHistory, FaFileAlt } from 'react-icons/fa';
import { aiConfig } from '@/config/aiConfig';
import { MessageType, Conversation } from '@/types/conversation';
import { getSystemPrompt } from '@/config/systemPrompts'; 
import ConversationHistory from './ConversationHistory';
import FeatureSelector from './FeatureSelector';
import QuickQuestions from './QuickQuestions';
import { conversationHistoryService } from '@/services/conversationHistoryService';
import { FeatureTemplate } from '@/config/featureTemplates';
import { useAlerts } from '@/contexts/AlertContext';

// 预设问题
const presetQuestions = [
  "我对计算机和数学都很感兴趣，适合学什么专业？",
  "高考如何选择适合自己的专业？",
  "文科生有哪些好的专业选择？",
  "就业前景比较好的专业有哪些？",
  "医学类专业需要做哪些准备？",
  "对艺术感兴趣，有哪些专业值得考虑？"
];

const MajorConsultant: React.FC = () => {
  // 状态管理
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [activeSystemPrompt, setActiveSystemPrompt] = useState<string>(getSystemPrompt('default'));
  const [showFeatureSelector, setShowFeatureSelector] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { showError, showSuccess, showInfo } = useAlerts();

  // 创建新对话
  const handleNewConversation = () => {
    const newConversation = conversationHistoryService.createConversation();
    setMessages([]);
    setCurrentConversation(newConversation);
    setActiveSystemPrompt(getSystemPrompt('default'));
    setIsSidebarOpen(false);
  };

  // 选择历史对话
  const handleSelectConversation = (conversation: Conversation) => {
    setMessages(conversation.messages);
    setCurrentConversation(conversation);
    setIsSidebarOpen(false);
  };

  // 选择功能模板
  const handleSelectFeature = (feature: FeatureTemplate) => {
    setActiveSystemPrompt(getSystemPrompt(feature.systemPrompt));
    setShowFeatureSelector(false);
    
    // 如果当前没有对话，创建一个新对话
    if (!currentConversation) {
      handleNewConversation();
    }
    
    // 添加功能描述消息
    const featureMessage: MessageType = {
      id: uuidv4(),
      role: 'system-notification',
      content: `已切换到${feature.title}模式。${feature.description}`,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, featureMessage];
    setMessages(newMessages);
    
    // 更新对话
    if (currentConversation) {
      const updatedConversation = {
        ...currentConversation,
        title: feature.title,
        messages: newMessages
      };
      setCurrentConversation(updatedConversation);
      conversationHistoryService.saveConversation(updatedConversation);
    }
  };

  // 发送消息
  const sendMessage = async (messageText: string) => {
    if (messageText.trim() === '' || isLoading) return;
    
    // 如果没有当前对话，创建一个新对话
    if (!currentConversation) {
      handleNewConversation();
    }
    
    setIsLoading(true);
    setInput('');
    
    // 用户消息
    const userMessage: MessageType = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    
    // 更新对话历史
    const conversationTitle = newMessages.length <= 2 ? 
      messageText.substring(0, 30) + (messageText.length > 30 ? '...' : '') : 
      currentConversation?.title || '新对话';
      
    const updatedConversation: Conversation = {
      id: currentConversation?.id || uuidv4(),
      title: conversationTitle,
      createdAt: currentConversation?.createdAt || new Date(),
      messages: newMessages
    };
    
    setCurrentConversation(updatedConversation);
    conversationHistoryService.saveConversation(updatedConversation);
    
    try {
      // 创建AI响应消息占位
      const aiMessage: MessageType = {
        id: uuidv4(),
        role: 'assistant',
        content: '',
        timestamp: new Date()
      };
      
      setMessages([...newMessages, aiMessage]);
      
      // 准备发送给AI的消息历史
      const history = newMessages.filter(msg => msg.role === 'user' || msg.role === 'assistant')
        .map(msg => ({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        }));
      
      // API调用
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: history,
          model: aiConfig.model,
          systemPrompt: activeSystemPrompt,
        }),
      });
      
      if (!response.ok) {
        throw new Error('AI响应失败');
      }
      
      const data = await response.json();
      
      // 更新AI消息
      const updatedAiMessage: MessageType = {
        ...aiMessage,
        content: data.response
      };
      
      const finalMessages = [...newMessages, updatedAiMessage];
      setMessages(finalMessages);
      
      // 再次更新对话历史
      const finalConversation: Conversation = {
        ...updatedConversation,
        messages: finalMessages
      };
      
      setCurrentConversation(finalConversation);
      conversationHistoryService.saveConversation(finalConversation);
      
    } catch (error) {
      console.error('发送消息错误:', error);
      // 添加错误消息
      const errorMessage: MessageType = {
        id: uuidv4(),
        role: 'system-notification',
        content: '消息发送失败，请稍后重试。',
        timestamp: new Date()
      };
      
      setMessages([...newMessages, errorMessage]);
      showError('消息发送失败', '请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 处理快速问题选择
  const handleQuickQuestionClick = (question: string) => {
    setInput(question);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 格式化时间
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // 滚动到底部
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 初始化：加载最近的对话
  useEffect(() => {
    const conversations = conversationHistoryService.getConversations();
    if (conversations.length > 0) {
      const mostRecent = conversations[0];
      setCurrentConversation(mostRecent);
      setMessages(mostRecent.messages);
    } else {
      handleNewConversation();
    }
  }, []);

  // 自动调整文本框高度
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="flex h-[700px] bg-gray-50 rounded-lg overflow-hidden">
      {/* 侧边栏：对话历史 */}
      <div 
        className={`w-80 bg-white border-r border-gray-200 flex-shrink-0 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 absolute md:relative h-full z-10`}
      >
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleNewConversation}
            className="flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            <FaPlus size={14} />
            <span>新对话</span>
          </button>
        </div>
        
        <ConversationHistory 
          onSelectConversation={handleSelectConversation} 
          currentConversationId={currentConversation?.id}
        />
      </div>
      
      {/* 主聊天界面 */}
      <div className="flex-1 flex flex-col h-full">
        {/* 对话内容 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaFileAlt className="text-blue-600" size={30} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">专业咨询助手</h2>
                <p className="text-gray-600 max-w-sm">
                  我可以为您提供专业选择指导、院校比较、就业前景分析等服务。请告诉我您想了解什么？
                </p>
              </div>
              <QuickQuestions onQuestionClick={handleQuickQuestionClick} />
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} ${
                    message.role === 'system-notification' ? 'justify-center' : ''
                  }`}
                >
                  {message.role === 'system-notification' ? (
                    <div className="max-w-3xl mx-auto">
                      <div className="bg-blue-50 text-blue-700 text-sm py-2 px-3 rounded-md">
                        {message.content}
                      </div>
                    </div>
                  ) : (
                    <div 
                      className={`max-w-3xl ${
                        message.role === 'user' 
                          ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg' 
                          : 'bg-white border border-gray-200 text-gray-800 rounded-r-lg rounded-bl-lg'
                      } p-4 shadow-sm`}
                    >
                      <div className="prose">
                        {message.content || (message.role === 'assistant' && isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-pulse">思考中</div>
                            <div className="animate-bounce delay-100">.</div>
                            <div className="animate-bounce delay-200">.</div>
                            <div className="animate-bounce delay-300">.</div>
                          </div>
                        ) : (
                          <div className="prose">{message.content}</div>
                        ))}
                      </div>
                      <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
        
        {/* 快速问题 */}
        {messages.length > 0 && (
          <div className="px-4">
            <QuickQuestions onQuestionClick={handleQuickQuestionClick} />
          </div>
        )}
        
        {/* 输入区域 */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex items-center mb-2 gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
              aria-label="历史记录"
            >
              <FaHistory size={16} className="text-gray-600" />
            </button>
            
            <div className="relative">
              <div 
                onClick={() => setShowFeatureSelector(!showFeatureSelector)}
                className="p-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-1 text-gray-700"
                aria-label="功能模板"
              >
                <FaFileAlt size={14} />
                <span className="text-sm">功能模板</span>
              </div>
              
              {/* 功能选择器弹出层 */}
              {showFeatureSelector && (
                <div className="absolute bottom-full left-0 mb-2 z-10">
                  <FeatureSelector onSelectFeature={handleSelectFeature} />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-end gap-2">
            <div className="flex-1 bg-gray-100 rounded-lg">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="请输入您的问题..."
                className="w-full bg-transparent border-0 rounded-lg p-3 min-h-[50px] max-h-[150px] focus:ring-0 focus:outline-none resize-none"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
              />
            </div>
            
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || input.trim() === ''}
              className={`p-3 rounded-full ${
                isLoading || input.trim() === '' 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } transition-colors flex-shrink-0`}
            >
              {isLoading ? <FaRedo className="animate-spin" /> : <FaPaperPlane />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorConsultant; 