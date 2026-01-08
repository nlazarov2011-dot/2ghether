import React from 'react';
import ServiceTable from '../components/ServiceTable';
import { Wrench } from 'lucide-react';
import { COMPANY_INFO } from '../lib/data';

const Service: React.FC = () => {
  return (
    <div className="pt-28 pb-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-neutral-800 rounded-full mb-6 text-brand-accent">
            <Wrench size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Експертен Велосипеден Сервиз</h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Професионална поддръжка за Orbea, Santa Cruz и всички други основни марки. 
            Ние се грижим за всяко колело, сякаш е наше собствено.
          </p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-12 shadow-2xl">
           <h2 className="text-2xl font-bold text-white mb-6 border-b border-neutral-800 pb-4">Ценоразпис Сервизни Услуги</h2>
           <ServiceTable />
        </div>

        <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Запази Час за Ремонт</h2>
          <p className="text-neutral-400 mb-8">
            Обадете ни се директно или посетете магазина в работно време.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
             <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                <span className="block text-neutral-500 uppercase text-xs font-bold mb-1">Телефон</span>
                <span className="text-white text-lg font-mono">{COMPANY_INFO.phone}</span>
             </div>
             <div className="bg-black/30 p-4 rounded-lg backdrop-blur-sm">
                <span className="block text-neutral-500 uppercase text-xs font-bold mb-1">Работно Време</span>
                <span className="text-white text-lg font-mono">{COMPANY_INFO.storeHours}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;