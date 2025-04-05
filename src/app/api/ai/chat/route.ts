'use server';

import { NextRequest, NextResponse } from 'next/server';
import { aiConfig } from '@/config/aiConfig';

export async function POST(request: NextRequest) {
  try {
    const { messages, model, systemPrompt } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: '无效的消息格式' },
        { status: 400 }
      );
    }

    // 准备发送给AI的消息
    const apiMessages = [
      { role: 'system', content: systemPrompt || aiConfig.defaultSystemPrompt },
      ...messages
    ];

    // 调用AI API
    const response = await fetch(aiConfig.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${aiConfig.apiKey}`
      },
      body: JSON.stringify({
        model: model || aiConfig.model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2000
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('AI API错误:', errorData);
      return NextResponse.json(
        { error: '调用AI服务失败' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    return NextResponse.json({
      response: data.choices[0].message.content
    });
  } catch (error) {
    console.error('处理请求时出错:', error);
    return NextResponse.json(
      { error: '服务器内部错误' },
      { status: 500 }
    );
  }
} 