import React from 'react';
import { useParams } from '../lib/utils';
import { LEGAL_TERMS } from '../lib/data';

const Legal: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Default to Terms if slug not found or invalid
  const data = slug && LEGAL_TERMS[slug] ? LEGAL_TERMS[slug] : LEGAL_TERMS['terms'];

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 p-10 rounded-2xl">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-neutral-800 pb-4">
          {data.title}
        </h1>
        <div className="space-y-4">
          {data.content.map((paragraph, index) => (
            <p key={index} className="text-neutral-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-neutral-800 text-sm text-neutral-500">
          Последна актуализация: 2024
        </div>
      </div>
    </div>
  );
};

export default Legal;