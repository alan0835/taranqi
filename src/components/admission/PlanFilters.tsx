'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AdmissionYear, AdmissionType } from '@/data/admissionData';

interface PlanFiltersProps {
  years: AdmissionYear[];
  types: AdmissionType[];
  defaultYear: AdmissionYear;
  defaultType: AdmissionType | '全部';
}

export default function PlanFilters({ years, types, defaultYear, defaultType }: PlanFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [selectedYear, setSelectedYear] = useState<AdmissionYear>(defaultYear);
  const [selectedType, setSelectedType] = useState<AdmissionType | '全部'>(defaultType);
  
  // 从URL参数初始化
  useEffect(() => {
    const yearParam = searchParams.get('year') as AdmissionYear | null;
    const typeParam = searchParams.get('type') as AdmissionType | '全部' | null;
    
    if (yearParam) setSelectedYear(yearParam);
    if (typeParam) setSelectedType(typeParam);
  }, [searchParams]);
  
  const handleYearChange = (year: string) => {
    setSelectedYear(year as AdmissionYear);
    const params = new URLSearchParams(searchParams.toString());
    params.set('year', year);
    router.push(`/admission/plans?${params.toString()}`);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type as AdmissionType | '全部');
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);
    router.push(`/admission/plans?${params.toString()}`);
  };

  const resetFilters = () => {
    setSelectedYear(defaultYear);
    setSelectedType('全部');
    router.push('/admission/plans');
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-2">
          招生年份
        </label>
        <select
          id="year"
          name="year"
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedYear}
          onChange={(e) => handleYearChange(e.target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
          招生类型
        </label>
        <select
          id="type"
          name="type"
          className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
        >
          <option value="全部">全部类型</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-end">
        <button
          type="button"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={resetFilters}
        >
          重置筛选
        </button>
      </div>
    </div>
  );
} 