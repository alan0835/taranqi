/**
 * 功能模板配置
 * 定义专业咨询助手的各种功能模板
 */

// 功能模板接口
export interface FeatureTemplate {
  title: string;         // 功能标题
  icon: string;          // 功能图标
  description: string;   // 功能描述
  systemPrompt: string;  // 使用的系统提示词类型
}

// 功能模板配置
export const FEATURE_TEMPLATES: Record<string, FeatureTemplate> = {
  // 专业推荐模板
  MAJOR_RECOMMENDATION: {
    title: "专业推荐",
    icon: "🎯",
    description: "根据您的兴趣、特长和学科偏好，推荐最适合的专业方向",
    systemPrompt: "MAJOR_RECOMMENDATION"
  },
  
  // 院校比较模板
  UNIVERSITY_COMPARISON: {
    title: "院校比较",
    icon: "🏫",
    description: "比较不同院校的专业优势、特色、就业前景等信息",
    systemPrompt: "UNIVERSITY_COMPARISON"
  },
  
  // 职业规划模板
  CAREER_PLANNING: {
    title: "职业规划",
    icon: "📊",
    description: "分析不同专业对应的职业发展路径和就业前景",
    systemPrompt: "CAREER_PLANNING"
  },
  
  // 选科指导
  SUBJECT_SELECTION: {
    title: "选科指导",
    icon: "📚",
    description: "根据专业兴趣，提供高中选课建议，避免专业受限",
    systemPrompt: "SUBJECT_SELECTION"
  }
} 