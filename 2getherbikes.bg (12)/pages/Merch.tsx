import React from 'react';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { motion as m } from 'framer-motion';

const motion = m as any;

const Merch: React.FC = () => {
  const merchProducts = PRODUCTS.filter(p => p.category === 'Merchandise');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.shopify.com/s/files/1/0290/1632/6282/files/robbthompson_2021-06-17_0304_2048x2048.jpg?v=1646781094" 
            alt="2GETHER Lifestyle" 
            className="w-full h-full object-cover"
          />
          {/* General slight darken */}
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        {/* GRADIENT FADE OVERLAY */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10" />
        
        <div className="container mx-auto px-4 relative z-20 text-center mt-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center items-center"
          >
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-4 drop-shadow-2xl">
              <span className="text-white">2GETHER</span> <span className="text-brand-accent">LIFESTYLE</span>
            </h1>
            <p className="text-lg md:text-2xl text-neutral-100 max-w-2xl mx-auto font-medium drop-shadow-md leading-relaxed">
              Носете духа на колоезденето навсякъде с вас.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex justify-between items-end mb-12 border-b border-neutral-800 pb-6">
          <div>
            <h2 className="text-3xl font-black text-white uppercase mb-2">Ексклузивна Колекция</h2>
            <p className="text-neutral-400">Колаборация със Santa Cruz.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {merchProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Merch;