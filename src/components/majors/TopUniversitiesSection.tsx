import { University } from '@/data/majorsData';

interface TopUniversitiesSectionProps {
  universities: University[];
}

export default function TopUniversitiesSection({ universities }: TopUniversitiesSectionProps) {
  return (
    <section className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <svg className="w-5 h-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        知名院校
      </h2>
      <div className="space-y-3">
        {universities.map((university, index) => (
          <div key={index} className="flex justify-between items-center p-3 border-b border-gray-100 last:border-0">
            <div>
              <span className="font-medium block">{university.name}</span>
              <span className="text-sm text-gray-500">{university.location}</span>
            </div>
            {university.ranking && (
              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-1 rounded">
                排名 #{university.ranking}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
} 