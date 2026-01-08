import React from 'react';
import { motion as m } from 'framer-motion';
import { Gauge, CheckCircle2 } from 'lucide-react';
import { TourPackage } from '../types';
import { useBookingModalStore } from '../lib/store';
import { formatCurrency } from '../lib/utils';

const motion = m as any;

interface OffroadCardProps {
  tour: TourPackage;
  index: number;
}

const OffroadCard: React.FC<OffroadCardProps> = ({ tour, index }) => {
  const openBooking = useBookingModalStore(state => state.openBooking);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col hover:border-brand-accent/50 transition-colors shadow-xl"
    >
      <div className="h-64 overflow-hidden relative group">
        <img 
          src={tour.image} 
          alt={tour.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-80" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="inline-block px-3 py-1 bg-brand-accent text-black text-xs font-bold rounded-full mb-2">
            {tour.suitability}
          </div>
          <h3 className="text-2xl font-black text-white">{tour.name}</h3>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
          {tour.description}
        </p>

        <div className="bg-neutral-950/50 rounded-xl p-4 mb-6 border border-neutral-800">
          <h4 className="text-xs font-bold text-neutral-500 uppercase mb-3 tracking-wider flex items-center gap-2">
            <Gauge size={14} /> Ценоразпис
          </h4>
          <div className="space-y-3">
            {tour.prices.map((tier, i) => (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="text-neutral-300">{tier.duration}</span>
                <span className="font-mono font-bold text-brand-accent text-sm">{formatCurrency(tier.price)}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={openBooking}
          className="w-full mt-auto bg-white text-black font-bold uppercase py-4 rounded-xl hover:bg-brand-accent transition-colors tracking-wide text-sm"
        >
          Резервирай
        </button>
      </div>
    </motion.div>
  );
};

export default OffroadCard;