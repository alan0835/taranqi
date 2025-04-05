'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdmissionYear, AdmissionType } from '@/data/admissionData';

interface AdmissionFiltersProps {
  years: AdmissionYear[];
  types: AdmissionType[];
  defaultYear: AdmissionYear;
  currentYear?: string;
  typeParam?: string;
}

export default function AdmissionFilters({ 
  years, 
  types, 
  defaultYear,
  currentYear,
  typeParam 
}: AdmissionFiltersProps) {
  const router = useRouter();
  
  const [selectedYear, setSelectedYear] = useState<string>(currentYear || defaultYear);
  const [selectedType, setSelectedType] = useState<string>(typeParam || '');
  
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;
    setSelectedYear(year);
    
    const url = new URL(window.location.href);
    url.searchParams.set('year', year);
    router.push(url.toString());
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setSelectedType(type);
    
    const url = new URL(window.location.href);
    if (type) {
      url.searchParams.set('type', type);
    } else {
      url.searchParams.delete('type');
    }
    router.push(url.toString());
  };

  const resetFilters = () => {
    setSelectedYear(defaultYear);
    setSelectedType('');
    router.push('/admission');
  };
  
  return (
    <form className="flex flex-wrap gap-4 items-center">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
          招生年份
        </label>
        <select
          id="year"
          name="year"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5"
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}年</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
          招生类型
        </label>
        <select
          id="type"
          name="type"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-36 p-2.5"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="">全部类型</option>
          {types.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      {(selectedYear !== defaultYear || selectedType !== '') && (
        <button
          type="button"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mt-6"
          onClick={resetFilters}
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          清除筛选
        </button>
      )}
    </form>
  );
} 