import React from 'react';
import { motion as m, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../lib/store';
import { Link } from '../lib/utils';
import { formatCurrency } from '../lib/utils';

const motion = m as any;

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, removeFromCart, updateQuantity, cartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-neutral-950 border-l border-neutral-800 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50 backdrop-blur">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-brand-accent" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">Вашата количка</h2>
              </div>
              <button 
                onClick={closeCart}
                className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-4">
                  <ShoppingBag size={48} className="text-neutral-800" />
                  <p>Количката ви е празна.</p>
                  <button onClick={closeCart} className="text-brand-accent hover:underline font-bold text-sm">
                    Продължи пазаруването
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-800">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/shop/${item.slug}`} onClick={closeCart} className="font-bold text-white text-sm line-clamp-1 hover:text-brand-accent transition-colors">
                          {item.name}
                        </Link>
                        <div className="text-xs text-neutral-500 mt-1 flex items-center gap-2">
                           <span>{item.brand}</span>
                           <span className="w-1 h-1 rounded-full bg-neutral-700" />
                           <span className="text-neutral-300">Размер: {item.selectedSize}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="font-mono text-white text-xs font-bold">
                          {formatCurrency(item.price)}
                        </div>
                        
                        {/* Qty Controls */}
                        <div className="flex items-center bg-neutral-900 rounded border border-neutral-800">
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors text-xs"
                          >
                            -
                          </button>
                          <span className="text-xs w-6 text-center text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-neutral-600 hover:text-red-500 transition-colors p-1 self-start"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-900/80 backdrop-blur">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-neutral-400 text-sm font-medium uppercase">Общо</span>
                  <span className="text-lg font-black text-white font-mono tracking-tight">
                    {formatCurrency(cartTotal())}
                  </span>
                </div>
                <Link 
                  to="/checkout"
                  onClick={closeCart}
                  className="block w-full text-center bg-white text-black font-black text-sm uppercase py-4 rounded-xl hover:bg-brand-accent hover:shadow-lg hover:shadow-brand-accent/20 transition-all active:scale-[0.98]"
                >
                  Към Плащане
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;