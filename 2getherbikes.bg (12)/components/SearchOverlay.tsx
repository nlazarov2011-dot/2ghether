import React, { useState, useEffect, useRef } from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Search, ChevronRight, Wrench } from 'lucide-react';
import { useUIStore } from '../lib/store';
import { PRODUCTS, SERVICES } from '../lib/data';
import { Link } from '../lib/utils';
import { formatCurrency } from '../lib/utils';

const motion = m as any;

const SearchOverlay: React.FC = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSearchOpen]);

  const filteredProducts = query 
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const filteredServices = query
    ? SERVICES.filter(s =>
        s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-neutral-950/95 backdrop-blur-xl flex flex-col"
        >
          {/* Header */}
          <div className="container mx-auto px-4 pt-8 pb-4 flex items-center gap-4 border-b border-neutral-800">
            <Search className="text-neutral-500" size={24} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Търси продукти или услуги..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-2xl font-bold text-white placeholder-neutral-600 focus:outline-none"
            />
            <button 
              onClick={closeSearch}
              className="p-2 text-neutral-400 hover:text-white rounded-full bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Results */}
          <div className="container mx-auto px-4 py-8 overflow-y-auto">
            {query.length > 0 && filteredProducts.length === 0 && filteredServices.length === 0 && (
              <div className="text-center text-neutral-500 mt-20">
                <p className="text-xl">Няма намерени резултати за "{query}"</p>
              </div>
            )}

            {/* Products Section */}
            {filteredProducts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-6">Намерени Продукти</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <Link 
                      key={product.id} 
                      to={`/shop/${product.slug}`}
                      onClick={closeSearch}
                      className="group flex gap-4 bg-neutral-900/50 p-4 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-colors"
                    >
                      <div className="w-20 h-20 bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="text-[10px] text-neutral-500 uppercase font-bold">{product.brand}</span>
                        <h4 className="font-bold text-white text-sm line-clamp-1 group-hover:text-brand-accent transition-colors">{product.name}</h4>
                        <span className="text-neutral-400 font-mono text-xs mt-1">{formatCurrency(product.price)}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Services Section */}
            {filteredServices.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-6">Услуги</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map(service => (
                    <Link 
                      key={service.id}
                      to="/service"
                      onClick={closeSearch}
                      className="flex items-center justify-between p-4 bg-neutral-900/30 border border-neutral-800 rounded-xl hover:bg-neutral-900 hover:border-brand-accent/30 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-neutral-800 rounded-lg text-neutral-400 group-hover:text-brand-accent transition-colors">
                          <Wrench size={18} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{service.name}</h4>
                          <span className="text-xs text-neutral-500">Сервиз</span>
                        </div>
                      </div>
                      <span className="font-mono text-brand-accent font-bold text-xs">{formatCurrency(service.price)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Suggestions if empty */}
            {!query && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-neutral-500">
                <div>
                   <h4 className="font-bold text-white mb-4">Популярни търсения</h4>
                   <div className="flex flex-wrap gap-2">
                     {['Orbea', 'Santa Cruz', 'Каска', 'Електрически', 'Гуми'].map(term => (
                       <button 
                         key={term}
                         onClick={() => setQuery(term)}
                         className="px-3 py-1.5 bg-neutral-900 rounded-lg text-sm hover:text-white hover:bg-neutral-800 transition-colors"
                       >
                         {term}
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;