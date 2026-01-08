import React from 'react';
import { motion as m } from 'framer-motion';
import { MapPin, ShieldCheck, Zap, Navigation } from 'lucide-react';
import { TOURS, OFFROAD_CONTENT } from '../lib/data';
import OffroadCard from '../components/OffroadCard';

const motion = m as any;

const Offroad: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral-950">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={OFFROAD_CONTENT.heroImage} 
            alt="Forest Trail" 
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-950/20 to-neutral-950" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase"
          >
            {OFFROAD_CONTENT.heroTitle}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed italic border-l-4 border-brand-accent pl-6 md:pl-10 text-left mx-auto max-w-3xl"
          >
            "{OFFROAD_CONTENT.poeticText}"
          </motion.p>
        </div>
      </section>

      {/* The Experience */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-white mb-6 uppercase">Преживяването</h2>
            <div className="flex items-start gap-4 mb-8">
              <MapPin className="text-brand-accent flex-shrink-0 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{OFFROAD_CONTENT.location.title}</h3>
                <p className="text-neutral-400">{OFFROAD_CONTENT.location.description}</p>
              </div>
            </div>

            <h3 className="font-bold text-white text-lg mb-4 uppercase text-sm tracking-wider">Какво получавате</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {OFFROAD_CONTENT.included.map((item, index) => (
                <li key={index} className="flex items-center gap-3 text-neutral-300 bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
                   <ShieldCheck className="text-brand-accent flex-shrink-0" size={18} />
                   <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden border border-neutral-800 h-[400px]">
             <img src={OFFROAD_CONTENT.location.image} className="w-full h-full object-cover" alt="Offroad Experience" />
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent opacity-60" />
             <div className="absolute bottom-8 left-8">
               <div className="flex items-center gap-2 text-white font-bold text-lg">
                 <Navigation className="text-brand-accent" />
                 Потайностите на Аладжа Манастир
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Bikes & Pricing */}
      <section className="py-24 bg-neutral-900/30 border-y border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Моторите & Цени</h2>
            <p className="text-neutral-400 max-w-2xl mx-auto">
              Изберете своята машина. Sur-Ron са електрически мотори от ново поколение - леки, мощни и екологични.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TOURS.map((tour, index) => (
              <OffroadCard key={tour.id} tour={tour} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 container mx-auto px-4">
         <div className="max-w-4xl mx-auto bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Изисквания към участниците</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
               {OFFROAD_CONTENT.requirements.map((req, i) => (
                 <div key={i} className="bg-black/40 px-6 py-3 rounded-full text-neutral-300 border border-neutral-800 flex items-center gap-2">
                    <Zap size={16} className="text-brand-accent" />
                    {req}
                 </div>
               ))}
            </div>
            <p className="mt-8 text-neutral-500 text-sm">
              *Всички участници преминават задължителен инструктаж за безопасност преди началото на обиколката.
            </p>
         </div>
      </section>
    </div>
  );
};

export default Offroad;