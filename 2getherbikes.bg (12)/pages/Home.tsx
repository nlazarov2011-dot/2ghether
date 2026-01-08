import React from 'react';
import { Link } from '../lib/utils';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { motion as m } from 'framer-motion';

const motion = m as any;

const Home: React.FC = () => {
  // Select high-ticket featured items
  const featuredProducts = PRODUCTS.filter(p => p.price > 5000).slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://ridebig.com/wp-content/uploads/2025/08/types-of-mtb-trails.webp" 
            alt="Hero Background" 
            className="w-full h-full object-cover filter brightness-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content (Text) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl lg:flex-1"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
                ИСТИНСКАТА СВОБОДА ЗАПОЧВА ТАМ, <span className="text-brand-accent">КЪДЕТО СВЪРШВА ПЪТЯ.</span>
              </h1>
              <p className="text-xl text-neutral-300 mb-8 max-w-xl font-light">
                Премиум велосипеди, експертен сервиз и незабравими преживявания. Вашият оторизиран дилър на Orbea, Santa Cruz и Giant във Варна.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors">
                  Към Магазина
                </Link>
                <Link to="/service" className="px-8 py-4 border border-white/30 text-white font-bold text-sm uppercase tracking-wider rounded hover:bg-white/10 transition-colors backdrop-blur-sm">
                  Запази Час
                </Link>
              </div>
            </motion.div>

            {/* Right Content (Floating Sticker Logo) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="relative z-20 lg:mr-32 mt-12 lg:mt-0"
            >
              <motion.img 
                src="https://2getherbikes.bg/image/catalog/image0.png" 
                alt="2gether Logo" 
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)] filter"
                animate={{ y: [0, -20, 0] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Bento Grid Navigation */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Main Sales Block */}
          <Link to="/shop" className="md:col-span-2 relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
            <div className="absolute inset-0 z-0">
               <img src="https://alvento.cc/wp-content/uploads/2023/08/20230615_111719-1-scaled.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Bicycles" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
            </div>
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <h2 className="text-4xl font-bold text-white mb-2">Продажби</h2>
              <p className="text-neutral-300 mb-4">Разгледайте нашата колекция от премиум планински, шосейни и електрически велосипеди.</p>
              <span className="flex items-center text-brand-accent font-bold uppercase text-sm tracking-wider">
                Купи Сега <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          <div className="grid grid-rows-2 gap-6">
            {/* Service Block */}
            <Link to="/service" className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
              <div className="absolute inset-0 z-0">
                <img src="https://www.parktool.com/assets/img/repairhelp/New-Shop-Recommended-Tool-List-01.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Service" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-1">Сервиз</h2>
                <p className="text-neutral-400 text-sm">Експертна поддръжка.</p>
              </div>
            </Link>

            {/* Rent Block */}
            <Link to="/rent" className="relative group overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800">
              <div className="absolute inset-0 z-0">
                <img src="https://chattahoochee.whitewaterexpress.com/wp-content/uploads/sites/4/2020/03/yellow-bike-rentals-chattahoochee-whitewater-express-2-e1598905480969.jpg" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Rent" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
              </div>
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <h2 className="text-2xl font-bold text-white mb-1">Велосипеди под наем</h2>
                <p className="text-neutral-400 text-sm">Разгледайте Варна на две колела.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-neutral-900/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">На Фокус</h2>
              <p className="text-neutral-400">Топ модели и инженерни шедьоври от Santa Cruz & Orbea.</p>
            </div>
            <Link to="/shop" className="text-brand-accent font-bold hover:text-white transition-colors">Виж Всички</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;