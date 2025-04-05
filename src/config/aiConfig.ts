/**
 * AI服务配置文件
 */

// AI模型配置
export const aiConfig = {
  // API端点
  apiEndpoint: process.env.NEXT_PUBLIC_AI_CONSULTANT_ENDPOINT || 'https://api.deepseek.com/v1/chat/completions',
  
  // API密钥
  apiKey: process.env.NEXT_PUBLIC_AI_CONSULTANT_KEY || '',
  
  // 使用的模型
  model: process.env.NEXT_PUBLIC_AI_CONSULTANT_MODEL || 'deepseek-chat',
  
  // 默认系统提示词
  defaultSystemPrompt: `你是建设中学的专业咨询助手，基于DeepSeek模型开发，帮助高中生进行专业选择和规划。
作为专业咨询助手，你需要：
1. 客观分析各专业的学习内容、适合人群、就业前景等信息
2. 根据学生的兴趣、特长和学科能力，推荐合适的专业方向
3. 提供高考志愿填报和专业选择的建议
4. 回答有关大学专业的各类问题
5. 在回答中注意客观性和准确性，避免误导学生
注意：如果学生询问的问题超出了专业咨询范围，请礼貌地引导他们返回专业咨询相关话题。`
}; 