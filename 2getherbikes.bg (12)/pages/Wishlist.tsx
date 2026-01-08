import React, { useEffect, useState } from 'react';
import { useWishlistStore } from '../lib/store';
import { PRODUCTS } from '../lib/data';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from '../lib/utils';

const Wishlist: React.FC = () => {
  const wishlistIds = useWishlistStore(state => state.wishlist);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const wishlistProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

  if (!mounted) return null;

  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-neutral-900 rounded-full text-red-500 border border-neutral-800">
           <Heart size={32} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-white">Любими Продукти</h1>
          <p className="text-neutral-400">Запазете любимите си модели за по-късно.</p>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="text-center py-24 bg-neutral-900/30 rounded-2xl border border-neutral-800">
           <Heart size={64} className="mx-auto text-neutral-700 mb-6" />
           <h2 className="text-2xl font-bold text-white mb-2">Списъкът ви е празен</h2>
           <p className="text-neutral-400 mb-8 max-w-md mx-auto">Разгледайте нашия магазин и добавете продуктите, които харесвате.</p>
           <Link to="/shop" className="inline-flex items-center px-8 py-4 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-brand-accent transition-colors">
             Към Магазина <ArrowRight className="ml-2" size={20} />
           </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;