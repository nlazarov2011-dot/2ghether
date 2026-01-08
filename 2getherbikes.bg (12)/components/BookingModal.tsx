import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Phone, CalendarCheck } from 'lucide-react';
import { useBookingModalStore } from '../lib/store';
import { COMPANY_INFO } from '../lib/data';

const motion = m as any;

const BookingModal: React.FC = () => {
  const { isBookingOpen, closeBooking } = useBookingModalStore();

  if (!isBookingOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeBooking}
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden p-8"
        >
          {/* Close Button */}
          <button 
            onClick={closeBooking}
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 text-brand-accent">
              <CalendarCheck size={32} />
            </div>

            <h2 className="text-2xl font-black text-white mb-3">Резервация по Телефона</h2>
            
            <p className="text-neutral-400 mb-8 leading-relaxed">
              За да гарантираме наличността на моторите и екипировката, моля обадете се за потвърждение.
            </p>

            <a 
              href={`tel:${COMPANY_INFO.phoneBooking.replace(/\s/g, '')}`}
              className="text-3xl font-black text-white font-mono mb-8 hover:text-brand-accent transition-colors"
            >
              {COMPANY_INFO.phoneBooking}
            </a>

            <a 
              href={`tel:${COMPANY_INFO.phoneBooking.replace(/\s/g, '')}`}
              className="w-full bg-brand-accent text-black font-black uppercase py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors shadow-lg shadow-brand-accent/20"
            >
              <Phone size={20} className="fill-current" />
              Обади се сега
            </a>

            <p className="text-xs text-neutral-600 mt-6">
              Моля, обаждайте се в рамките на работното време: {COMPANY_INFO.storeHours}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;