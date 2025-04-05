'use client';

import { FeatureTemplate, FEATURE_TEMPLATES } from '@/config/featureTemplates';

interface FeatureSelectorProps {
  onSelectFeature: (template: FeatureTemplate) => void;
}

export default function FeatureSelector({ onSelectFeature }: FeatureSelectorProps) {
  const handleSelectFeature = (templateKey: string) => {
    const template = FEATURE_TEMPLATES[templateKey];
    if (template) {
      onSelectFeature(template);
    }
  };
  
  return (
    <div className="w-72 bg-white rounded-md shadow-lg z-10 overflow-hidden">
      <div className="p-2 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">选择咨询功能</h3>
        <p className="text-xs text-gray-500 mt-1">使用预设模板快速获取专业咨询</p>
      </div>
      <ul className="max-h-80 overflow-y-auto">
        {Object.entries(FEATURE_TEMPLATES).map(([key, template]) => (
          <li 
            key={key}
            onClick={() => handleSelectFeature(key)}
            className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
          >
            <div className="flex items-start">
              <span className="text-xl mr-3">{template.icon}</span>
              <div>
                <h4 className="text-sm font-medium text-gray-800">{template.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{template.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
} 