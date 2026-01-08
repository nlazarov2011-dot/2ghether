import React, { useState, useEffect } from 'react';
import { useParams, Link } from '../lib/utils';
import { PRODUCTS } from '../lib/data';
import { useCartStore, useWishlistStore } from '../lib/store';
import { Heart, Truck, ShieldCheck, ChevronLeft } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import ProductGallery from '../components/ProductGallery';
import { formatCurrency } from '../lib/utils';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = PRODUCTS.find(p => p.slug === slug);
  
  const [selectedSize, setSelectedSize] = useState<string>("");
  
  const addToCart = useCartStore(state => state.addToCart);
  const toggleWishlist = useWishlistStore(state => state.toggleWishlist);
  const isInWishlist = useWishlistStore(state => product ? state.isInWishlist(product.id) : false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 text-center container mx-auto px-4">
        <h1 className="text-2xl font-bold text-white mb-4">Продуктът не е намерен</h1>
        <Link to="/shop" className="text-brand-accent hover:underline">Обратно към магазина</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
  };

  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Dynamic Back Link Logic
  const isMerch = product.category === "Merchandise";
  const backLink = isMerch ? "/merch" : "/shop";
  const backLabel = isMerch ? "МЪРЧ" : "МАГАЗИН";

  // Calculate prices for display
  const priceInEur = (product.price / 1.95583).toFixed(2);
  const priceInBgn = product.price.toFixed(2);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-24 pb-20">
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 mb-8">
        <div className="flex items-center gap-2 text-sm text-neutral-400">
          <Link 
            to={backLink} 
            className="hover:text-brand-accent transition-colors flex items-center gap-1 uppercase tracking-wider"
          >
            <ChevronLeft size={16} />
            {backLabel}
          </Link>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-medium uppercase truncate max-w-[200px] md:max-w-none">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Layout: Gallery Left, Info Right */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24 justify-center">
          
          {/* Main Image & Thumbnails Section */}
          <div className="w-full lg:w-1/2 lg:flex-shrink-0">
            {/* New Gallery Component */}
            <ProductGallery images={product.images} isSale={product.isSale} />
            
            {/* Specs Table (Desktop) */}
            <div className="mt-12 hidden lg:block">
               <h3 className="text-xl font-bold text-white mb-6 pl-4 border-l-4 border-brand-accent">Характеристики</h3>
               <div className="bg-neutral-900/50 rounded-2xl border border-neutral-800 overflow-hidden">
                 <table className="w-full text-left text-sm">
                   <tbody className="divide-y divide-neutral-800">
                     {Object.entries(product.specs).map(([key, value]) => (
                       <tr key={key} className="hover:bg-neutral-800/30">
                         <td className="p-5 text-neutral-500 font-medium capitalize w-1/3">{key}</td>
                         <td className="p-5 text-white font-mono">{value}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>

          {/* Right: Info Section */}
          <div className="w-full lg:w-1/2 max-w-xl mx-auto lg:mx-0">
            <div className="lg:sticky lg:top-32">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-2">
                   <Link to={`/shop?brand=${product.brand}`} className="text-brand-accent font-bold uppercase tracking-wider text-xs hover:underline">
                     {product.brand}
                   </Link>
                   <button 
                     onClick={() => toggleWishlist(product.id)}
                     className="text-neutral-400 hover:text-red-500 transition-colors"
                   >
                     <Heart fill={isInWishlist ? "currentColor" : "none"} className={isInWishlist ? "text-red-500" : ""} size={24} />
                   </button>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">{product.name}</h1>
                
                <div className="flex flex-col gap-1 mb-6">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                      €{priceInEur}
                    </span>
                    <span className="text-xl md:text-2xl font-medium text-neutral-400">
                      ({priceInBgn} лв.)
                    </span>
                  </div>
                  {product.originalPrice && (
                    <span className="text-lg text-neutral-500 line-through decoration-red-500/50">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Selectors */}
              <div className="space-y-6 mb-8 border-t border-neutral-800 pt-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-bold text-white uppercase">Размер</span>
                    <button className="text-xs text-neutral-500 underline hover:text-white">Таблица с размери</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-lg font-bold text-sm transition-all border ${
                          selectedSize === size 
                            ? 'bg-white text-black border-white' 
                            : 'bg-transparent text-neutral-400 border-neutral-800 hover:border-neutral-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col gap-3 mb-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`w-full py-4 rounded-xl font-black text-lg uppercase tracking-wider transition-all active:scale-[0.98] shadow-lg ${
                    product.inStock 
                    ? 'bg-brand-accent text-black hover:bg-cyan-400 hover:shadow-cyan-400/20' 
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Добави в количка' : 'Изчерпан'}
                </button>
                <p className="text-center text-xs text-neutral-500">
                  Безплатна доставка за поръчки над 50 лв.
                </p>
              </div>

              {/* Description & Value Props */}
              <div className="space-y-6">
                <div 
                  className="prose prose-invert prose-sm text-neutral-400"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                
                <div className="space-y-3 pt-6 border-t border-neutral-800">
                   <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <Truck size={18} className="text-neutral-500" />
                      <span>Бърза доставка с Еконт (1-2 дни)</span>
                   </div>
                   <div className="flex items-center gap-3 text-sm text-neutral-300">
                      <ShieldCheck size={18} className="text-neutral-500" />
                      <span>Право на преглед и тест</span>
                   </div>
                </div>
              </div>

              {/* Mobile Specs (Visible only on mobile) */}
              <div className="mt-8 pt-8 border-t border-neutral-800 lg:hidden">
                 <h3 className="font-bold text-white mb-4 uppercase text-sm tracking-wider">Характеристики</h3>
                 <div className="space-y-2 text-sm">
                   {Object.entries(product.specs).map(([key, value]) => (
                     <div key={key} className="flex justify-between border-b border-neutral-800 pb-2">
                       <span className="text-neutral-500 capitalize">{key}</span>
                       <span className="text-white font-mono">{value}</span>
                     </div>
                   ))}
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-32 border-t border-neutral-800 pt-16">
            <h2 className="text-3xl font-black text-white mb-12 uppercase tracking-tight">Може да харесате още</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;