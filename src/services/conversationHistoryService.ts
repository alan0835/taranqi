import { v4 as uuidv4 } from 'uuid';
import { MessageType, Conversation } from '@/types/conversation';

// 本地存储键
const STORAGE_KEY = 'majorConsultant_conversations';

/**
 * 会话历史存储服务
 * 提供会话历史的存储、检索、管理功能
 */
export const conversationHistoryService = {
  /**
   * 获取所有会话记录
   * @returns 会话记录数组，按创建时间倒序排列
   */
  getConversations(): Conversation[] {
    if (typeof window === 'undefined') return []; // 服务器端返回空数组
    
    // 从本地存储获取会话数据
    const conversationsJSON = localStorage.getItem(STORAGE_KEY);
    if (!conversationsJSON) return [];
    
    try {
      // 解析会话数据，并将日期字符串转换回Date对象
      const conversations: Conversation[] = JSON.parse(conversationsJSON, (key, value) => {
        if (key === 'createdAt' || key === 'timestamp') {
          return new Date(value);
        }
        return value;
      });
      
      // 按创建时间倒序排列
      return conversations.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } catch (error) {
      console.error('解析会话数据时出错:', error);
      return [];
    }
  },
  
  /**
   * 获取特定ID的会话
   * @param id 会话ID
   * @returns 会话对象，如果不存在则返回undefined
   */
  getConversationById(id: string): Conversation | undefined {
    return this.getConversations().find((conv) => conv.id === id);
  },
  
  /**
   * 保存会话
   * @param conversation 要保存的会话对象
   * @returns 保存后的会话对象
   */
  saveConversation(conversation: Conversation): Conversation {
    if (typeof window === 'undefined') return conversation; // 服务器端直接返回
    
    // 获取当前所有会话
    const conversations = this.getConversations();
    
    // 查找是否已存在该会话
    const existingIndex = conversations.findIndex((c) => c.id === conversation.id);
    
    if (existingIndex >= 0) {
      // 更新已存在的会话
      conversations[existingIndex] = conversation;
    } else {
      // 添加新会话
      conversations.unshift(conversation);
    }
    
    // 保存到本地存储
    this.saveConversationsToStorage(conversations);
    
    return conversation;
  },
  
  /**
   * 创建新会话
   * @returns 新会话对象
   */
  createConversation(): Conversation {
    const newConversation: Conversation = {
      id: uuidv4(),
      title: '新对话',
      createdAt: new Date(),
      messages: []
    };
    
    // 保存到本地存储
    this.saveConversation(newConversation);
    
    return newConversation;
  },
  
  /**
   * 添加消息到会话
   * @param conversationId 会话ID
   * @param message 要添加的消息
   * @returns 更新后的会话，如果会话不存在则返回undefined
   */
  addMessage(conversationId: string, message: MessageType): Conversation | undefined {
    const conversation = this.getConversationById(conversationId);
    if (!conversation) return undefined;
    
    // 添加消息
    const updatedConversation = {
      ...conversation,
      messages: [...conversation.messages, message]
    };
    
    // 保存更新后的会话
    this.saveConversation(updatedConversation);
    
    return updatedConversation;
  },
  
  /**
   * 删除会话
   * @param id 要删除的会话ID
   * @returns 是否删除成功
   */
  deleteConversation(id: string): boolean {
    if (typeof window === 'undefined') return false; // 服务器端直接返回
    
    const conversations = this.getConversations();
    const filteredConversations = conversations.filter((c) => c.id !== id);
    
    // 如果数组长度没有变化，表示没有找到要删除的会话
    if (filteredConversations.length === conversations.length) {
      return false;
    }
    
    // 保存更新后的会话列表
    this.saveConversationsToStorage(filteredConversations);
    
    return true;
  },
  
  /**
   * 清空所有会话
   */
  clearAllConversations(): void {
    if (typeof window === 'undefined') return; // 服务器端不执行
    localStorage.removeItem(STORAGE_KEY);
  },
  
  /**
   * 保存会话列表到本地存储
   * @param conversations 会话列表
   */
  saveConversationsToStorage(conversations: Conversation[]): void {
    if (typeof window === 'undefined') return; // 服务器端不执行
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  }
}; 