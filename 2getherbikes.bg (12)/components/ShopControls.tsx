import React, { useState } from "react";
import { motion as m, AnimatePresence } from 'framer-motion';
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";

const motion = m as any;

// Define Sort Options
const sortOptions = [
  { name: "По подразбиране", value: "default" },
  { name: "Име (А - Я)", value: "name-asc" },
  { name: "Име (Я - А)", value: "name-desc" },
  { name: "Цена (ниска > висока)", value: "price-asc" },
  { name: "Цена (висока > ниска)", value: "price-desc" },
];

interface ShopControlsProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
  activeBrand: string | null;
  setActiveBrand: (brand: string | null) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const ShopControls: React.FC<ShopControlsProps> = ({ 
  activeCategory, setActiveCategory, 
  activeBrand, setActiveBrand,
  sortBy, setSortBy 
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Mock Data for filters
  const brands = ["Всички", "Orbea", "Santa Cruz", "Giant"];
  const categories = ["Всички", "Планински", "Шосейни", "Електрически", "Градски", "Детски"];

  return (
    <div className="mb-8 relative z-20">
      {/* TOP BAR */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        
        {/* LEFT: FILTER TOGGLE */}
        <button 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className={`flex items-center gap-2 text-sm font-bold tracking-widest uppercase transition-colors ${isFiltersOpen ? 'text-brand-accent' : 'text-white hover:text-brand-accent'}`}
        >
          <SlidersHorizontal size={18} />
          Филтри
          <motion.span animate={{ rotate: isFiltersOpen ? 180 : 0 }}>
            <ChevronDown size={16} />
          </motion.span>
        </button>

        {/* RIGHT: SORT DROPDOWN */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 text-sm font-medium hover:text-brand-accent transition-colors text-white"
          >
            <span className="text-neutral-400 mr-1 hidden sm:inline">Сортирай по:</span>
            <span className="font-bold">{sortOptions.find(o => o.value === sortBy)?.name}</span>
            <ChevronDown size={16} />
          </button>

          {/* Sort Menu */}
          <AnimatePresence>
            {isSortOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 top-full mt-2 w-64 bg-[#111] border border-white/10 rounded-xl overflow-hidden shadow-2xl p-1 z-30"
                onMouseLeave={() => setIsSortOpen(false)}
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm flex justify-between items-center rounded-lg transition-colors ${
                      sortBy === option.value ? "bg-white/10 text-brand-accent font-bold" : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {option.name}
                    {sortBy === option.value && <Check size={14} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* EXPANDABLE FILTER PANEL */}
      <AnimatePresence>
        {isFiltersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10">
              
              {/* Brand Filter */}
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Марка</h3>
                <div className="flex flex-wrap gap-2">
                  {brands.map(brand => (
                    <button
                      key={brand}
                      onClick={() => setActiveBrand(brand === "Всички" ? null : brand)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        (activeBrand === brand) || (activeBrand === null && brand === "Всички")
                          ? "bg-brand-accent/20 border-brand-accent text-brand-accent font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                          : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Категория</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat === "Всички" ? null : cat)}
                      className={`px-4 py-2 rounded-full text-sm border transition-all ${
                        (activeCategory === cat) || (activeCategory === null && cat === "Всички")
                          ? "bg-purple-500/20 border-purple-500 text-purple-400 font-bold shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                          : "bg-white/5 border-white/5 text-neutral-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopControls;