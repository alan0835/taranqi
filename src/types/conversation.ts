/**
 * 消息类型定义
 */
export interface MessageType {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'system-notification';
  content: string;
  timestamp: Date;
}

/**
 * 会话类型定义
 */
export interface Conversation {
  id: string;
  title: string;
  createdAt: Date;
  messages: MessageType[];
  tags?: string[];
} 