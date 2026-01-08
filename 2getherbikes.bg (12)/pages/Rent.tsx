import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { COMPANY_INFO } from '../lib/data';
import { formatCurrency } from '../lib/utils';

const Rent: React.FC = () => {
  return (
    <div className="pt-28 pb-20 container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Велосипеди Под Наем</h1>
          <p className="text-xl text-neutral-400 mb-8 leading-relaxed">
            Разгледайте красивото крайбрежие на Варна с нашия премиум флот под наем. 
            Перфектно поддържани велосипеди, готови за вашето приключение.
          </p>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
               <MapPin className="text-brand-accent mt-1 flex-shrink-0" />
               <div>
                 <h3 className="text-white font-bold mb-1">Локация</h3>
                 <p className="text-neutral-400">{COMPANY_INFO.location}</p>
                 <p className="text-neutral-500 text-sm mt-1">Варна, България</p>
               </div>
            </div>
            <div className="flex items-start gap-4">
               <Clock className="text-brand-accent mt-1 flex-shrink-0" />
               <div>
                 <h3 className="text-white font-bold mb-1">Работно Време</h3>
                 <p className="text-neutral-400">Всеки ден {COMPANY_INFO.storeHours}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pricing Card 1 */}
          <div className="group relative bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-brand-accent transition-colors">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <span className="text-9xl font-black text-white">3Ч</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Кратка Разходка</h3>
            <p className="text-neutral-400 mb-6">Перфектно за бърза обиколка из Морската градина.</p>
            <div className="text-xl font-mono font-bold text-brand-accent">{formatCurrency(15)}</div>
            <p className="text-neutral-500 text-sm mt-2">До 3 часа</p>
          </div>

          {/* Pricing Card 2 */}
          <div className="group relative bg-white text-black border border-white rounded-3xl p-8 transform md:translate-x-[-20px] shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <span className="text-9xl font-black">1Д</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Цял Ден</h3>
            <p className="text-neutral-600 mb-6">Вземете колелото за целия ден и стигнете по-далеч.</p>
            <div className="text-xl font-mono font-bold text-black">{formatCurrency(20)}</div>
            <p className="text-neutral-500 text-sm mt-2">24 Часа</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rent;