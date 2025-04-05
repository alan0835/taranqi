import React from 'react';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
  const questions = [
    "我适合什么类型的专业？",
    "计算机科学与人工智能专业有什么区别？",
    "文科生有哪些好就业的专业推荐？",
    "医学专业需要具备什么素质？",
    "如何选择一个既符合兴趣又有就业前景的专业？"
  ];

  return (
    <div className="mt-4 mb-2">
      <p className="text-sm text-gray-500 mb-2">快速提问：</p>
      <div className="flex flex-wrap gap-2">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-full hover:bg-gray-50 text-gray-700 transition-colors"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickQuestions; 