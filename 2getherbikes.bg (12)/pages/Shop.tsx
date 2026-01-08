import React, { useState, useMemo } from 'react';
import { useSearchParams } from '../lib/utils';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import ShopControls from '../components/ShopControls';
import { motion as m } from 'framer-motion';

const motion = m as any;

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  
  // Parse initial state from URL or default to null ("Всички")
  const initialBrandParam = searchParams.get('brand');
  const initialBrand = (initialBrandParam && initialBrandParam !== 'Всички') ? initialBrandParam : null;

  const initialCategoryParam = searchParams.get('category');
  const initialCategory = (initialCategoryParam && initialCategoryParam !== 'Всички') ? initialCategoryParam : null;

  const [activeBrand, setActiveBrand] = useState<string | null>(initialBrand);
  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    // 1. Filter
    let result = PRODUCTS.filter(product => {
      // Logic: Must NOT be merchandise.
      if (product.category === 'Merchandise') return false;

      const matchBrand = !activeBrand || product.brand === activeBrand;
      const matchCategory = !activeCategory || product.category === activeCategory;
      return matchBrand && matchCategory;
    });

    // 2. Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Optional: ensure consistent default order if needed, e.g. by ID
        break;
    }

    return result;
  }, [activeBrand, activeCategory, sortBy]);

  return (
    <div className="pt-20 pb-20 container mx-auto px-4 min-h-screen">
      
      {/* Hero Header Section */}
      <div className="relative h-[50vh] w-full overflow-hidden mb-8 rounded-b-3xl">
        {/* MAIN IMAGE - Using Direct Source URL for stability */}
        <img
          src="https://cms.bikesociety.com.au/wp-content/uploads/2024/03/Bike-Society_Hero-Adelaide-Bike-Shop.jpg"
          alt="Premium Bike Shop Interior"
          className="w-full h-full object-cover brightness-[0.6]"
        />
        
        {/* GRADIENT FADE - Blends image into background (No hard cut) */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />

        {/* TEXT CONTENT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight drop-shadow-2xl">
            МАГАЗИН
          </h1>
          <p className="text-neutral-200 text-lg md:text-xl mt-2 font-medium drop-shadow-md">
            Премиум велосипеди и екипировка
          </p>
        </div>
      </div>

      {/* Controls */}
      <ShopControls 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        activeBrand={activeBrand}
        setActiveBrand={setActiveBrand}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Product Grid - Full Width */}
      <div className="w-full">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-white font-bold text-lg">
            {activeBrand || 'Всички Велосипеди'}
          </span>
          <span className="px-2 py-0.5 bg-neutral-800 text-neutral-400 text-xs font-mono rounded">
            {filteredProducts.length}
          </span>
        </div>
        
        {filteredProducts.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center text-neutral-500 bg-neutral-900/20 rounded-2xl border border-neutral-800 border-dashed"
          >
            <p className="text-xl font-medium mb-2">Няма намерени велосипеди.</p>
            <p className="text-sm">Опитайте да промените критериите за търсене.</p>
            <button 
              onClick={() => { setActiveBrand(null); setActiveCategory(null); }}
              className="mt-6 px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-brand-accent transition-colors"
            >
              Изчисти филтрите
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Shop;