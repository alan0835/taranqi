import { MessageType } from '@/types/conversation';
import { aiConfig } from '@/config/aiConfig';

/**
 * Message 类型定义
 * 用于AI消息交互
 */
export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

/**
 * 发送消息到咨询AI
 * @param messages 消息历史记录
 * @param systemPrompt 系统提示词
 * @returns 返回AI的回复消息
 */
export async function sendConsultantMessage(
  messages: Message[],
  systemPrompt: string = aiConfig.defaultSystemPrompt
): Promise<Message> {
  try {
    // 过滤系统通知消息，只保留user和assistant消息
    const filteredMessages = messages.filter(
      msg => msg.role === 'user' || msg.role === 'assistant'
    );
    
    // 准备API请求
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: filteredMessages,
        systemPrompt: systemPrompt,
        model: aiConfig.model,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 创建并返回AI回复消息
    return {
      role: 'assistant',
      content: data.response,
      timestamp: new Date()
    };
  } catch (error) {
    console.error('AI消息发送失败:', error);
    throw error;
  }
}

/**
 * 将MessageType转换为Message
 * @param message MessageType类型的消息
 * @returns Message类型的消息
 */
export function convertToMessage(message: MessageType): Message {
  return {
    role: message.role === 'system-notification' ? 'system' : message.role,
    content: message.content,
    timestamp: message.timestamp
  };
}

/**
 * 将Message转换为MessageType
 * @param message Message类型的消息
 * @returns MessageType类型的消息
 */
export function convertToMessageType(message: Message, id?: string): MessageType {
  return {
    id: id || crypto.randomUUID(),
    role: message.role === 'system' ? 'system-notification' : message.role,
    content: message.content,
    timestamp: message.timestamp || new Date()
  };
}
