import React from 'react';
import { Product } from '../types';
import { useCartStore, useWishlistStore } from '../lib/store';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion as m } from 'framer-motion';
import { Link } from '../lib/utils';
import { formatCurrency } from '../lib/utils';

const motion = m as any;

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => state.isInWishlist(product.id));

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  // Calculate prices for display
  const priceInEur = (product.price / 1.95583).toFixed(2);
  const priceInBgn = product.price.toFixed(2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative bg-[#111] rounded-xl overflow-hidden flex flex-col h-full hover:shadow-xl hover:shadow-black/50 transition-all duration-300 border border-neutral-900"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {product.isSale && (
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg">
            -{discountPercentage}% SALE
          </span>
        )}
        {!product.inStock && (
          <span className="bg-neutral-800 text-neutral-400 text-[10px] font-bold px-2 py-1 rounded">
            Изчерпан
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id); }}
        className="absolute top-3 right-3 z-20 p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : ""} />
      </button>

      {/* Image Area - Clickable to Detail */}
      <Link to={`/shop/${product.slug}`} className="block aspect-[4/3] overflow-hidden bg-neutral-900 relative">
        <motion.img 
          src={product.images[0]} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${!product.inStock ? 'opacity-50 grayscale' : 'opacity-90 group-hover:opacity-100'}`}
        />
      </Link>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Row 1: Brand & Category */}
        <div className="flex justify-between items-start mb-1">
          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">{product.brand}</div>
          <div className="text-[10px] text-gray-500 font-medium uppercase">{product.category}</div>
        </div>

        {/* Row 2: Title */}
        <Link to={`/shop/${product.slug}`} className="block mb-3">
          <h3 className="text-white font-bold text-lg leading-tight line-clamp-1 hover:text-cyan-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Row 3: Size Chips */}
        <div className="flex gap-1.5 mb-4 flex-wrap">
          {product.sizes.slice(0, 4).map(size => (
            <span key={size} className="text-[10px] border border-gray-700 text-gray-400 px-2 py-0.5 rounded uppercase font-medium">
              {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
             <span className="text-[10px] text-gray-600 px-1 pt-1">...</span>
          )}
        </div>
        
        {/* Row 4: Footer - Price & Quick Add */}
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-500 line-through mb-0.5">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-xl md:text-2xl font-bold text-white">
                €{priceInEur}
              </span>
              <span className="text-xs font-medium text-neutral-400">
                ({priceInBgn} лв.)
              </span>
            </div>
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`
              p-3 rounded-lg transition-all duration-300 shadow-lg 
              ${!product.inStock 
                ? 'bg-neutral-800 text-neutral-600 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-cyan-400 hover:text-black hover:shadow-cyan-400/20 active:scale-95'
              }
            `}
          >
            <ShoppingBag size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;