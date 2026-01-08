import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X, User, Heart, Search, LogOut } from 'lucide-react';
import { Link, useLocation } from '../lib/utils';
import { useCartStore, useWishlistStore, useUIStore, useAuthModalStore, useUserStore } from '../lib/store';
import { AnimatePresence, motion as m } from 'framer-motion';
import { formatCurrency } from '../lib/utils';
import { supabase } from '../lib/supabase';

const motion = m as any;

const GlobalHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Hydration safety
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = useCartStore(state => state.cartTotal());
  const cartCount = useCartStore(state => state.getCartCount());
  const openCart = useCartStore(state => state.openCart);
  
  const wishlistCount = useWishlistStore(state => state.wishlist.length);
  const openSearch = useUIStore(state => state.openSearch);
  const openAuth = useAuthModalStore(state => state.openAuth);
  
  const user = useUserStore(state => state.user);

  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (user) {
      setIsProfileOpen(!isProfileOpen);
    } else {
      openAuth();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
  };

  const navLinks = [
    { name: 'НАЧАЛО', path: '/' },
    { name: 'МАГАЗИН', path: '/shop' },
    { name: 'СЕРВИЗ', path: '/service' },
    { name: 'ПОД НАЕМ', path: '/rent' },
    { name: 'ОФРОУД', path: '/offroad', highlight: true }, // Highlighted Offroad
    { name: 'МЪРЧ', path: '/merch' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-neutral-950/90 backdrop-blur-xl border-b border-neutral-800 shadow-xl' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col z-50 group">
            <span className="text-2xl font-black tracking-tighter text-white group-hover:text-brand-accent transition-colors">
              2GETHER<span className="text-neutral-500">BIKES</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-neutral-400 font-medium">
              ВЕЛОМАГАЗИН & СЕРВИЗ
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-bold tracking-wide transition-colors duration-200 uppercase ${
                  location.pathname === link.path 
                    ? 'text-brand-accent' 
                    : link.highlight 
                      ? 'text-brand-accent hover:text-white' 
                      : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions Wrapper */}
          <div className="flex items-center gap-2 md:gap-5">
            
            {/* Utility Bar (Icons) */}
            <div className="flex items-center space-x-1 md:space-x-5">
              
              {/* Search - Hidden on mobile, visible on tablet+ */}
              <button 
                onClick={openSearch}
                className="hidden md:block text-neutral-400 hover:text-white transition-colors hover:bg-neutral-800 p-2 rounded-full" 
                title="Търсене"
              >
                <Search size={20} />
              </button>
              
              {/* Wishlist - Hidden on mobile */}
              <Link 
                to="/wishlist" 
                className="hidden md:block text-neutral-400 hover:text-white transition-colors relative group p-2 rounded-full hover:bg-neutral-800" 
                title="Любими"
              >
                <Heart size={20} />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-neutral-950" />
                )}
              </Link>
              
              {/* User Profile - Visible Always */}
              <div className="relative" ref={profileRef}>
                <button 
                  onClick={handleProfileClick}
                  className={`p-2 rounded-full transition-colors hover:bg-neutral-800 ${user ? 'text-brand-accent' : 'text-neutral-400 hover:text-white'}`}
                  title={user ? "Моят Профил" : "Вход"}
                >
                  <User size={20} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && user && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-72 bg-[#111] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                    >
                      <div className="p-5 border-b border-neutral-800">
                        <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">Профил</h3>
                        <div className="text-white font-bold text-lg truncate">
                          {user.user_metadata?.full_name || 'Потребител'}
                        </div>
                        <div className="text-neutral-400 text-xs truncate font-mono">
                          {user.email}
                        </div>
                      </div>
                      <div className="p-2">
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                        >
                          <LogOut size={16} />
                          Изход
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Cart Widget - Visible Always */}
              <div className="flex items-center gap-3 pl-1 md:pl-5 md:border-l border-neutral-800/50">
                <div className="text-right hidden lg:block leading-tight">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Количка</div>
                  <div className="text-xs font-bold text-white font-mono">
                    {mounted ? formatCurrency(total) : formatCurrency(0)}
                  </div>
                </div>
                <button 
                  onClick={openCart}
                  className="relative p-2 md:p-2.5 bg-transparent md:bg-white text-white md:text-black rounded-xl md:hover:bg-brand-accent transition-colors group md:shadow-lg md:shadow-white/5"
                >
                  <ShoppingBag size={20} strokeWidth={2.5} />
                  {mounted && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border border-neutral-950 md:border-2">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="xl:hidden z-50 p-2 text-white hover:bg-neutral-800 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 right-0 bg-neutral-900/95 backdrop-blur-xl border-b border-neutral-800 p-6 xl:hidden shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-lg font-bold py-2 border-b border-neutral-800/50 ${link.highlight ? 'text-brand-accent' : 'text-neutral-200 hover:text-brand-accent'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Additional Mobile Links */}
               <div className="flex flex-col gap-3 pt-2">
                  <button onClick={() => { setIsMenuOpen(false); openSearch(); }} className="flex items-center gap-3 text-neutral-400 hover:text-white py-2">
                     <Search size={20} /> Търсене
                  </button>
                  <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-neutral-400 hover:text-white py-2">
                     <Heart size={20} /> Любими
                  </Link>
               </div>

              <div className="pt-4 border-t border-neutral-800">
                {user ? (
                   <div className="flex flex-col gap-2 py-2">
                     <div className="flex items-center gap-3 text-brand-accent">
                        <User size={20} />
                        <span className="font-bold">{user.user_metadata?.full_name || user.email}</span>
                     </div>
                     <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 text-sm font-bold mt-2">
                       <LogOut size={16} /> Изход
                     </button>
                   </div>
                ) : (
                  <button onClick={() => { setIsMenuOpen(false); openAuth(); }} className="flex items-center gap-3 text-neutral-300 py-2">
                    <User size={20} /> Вход / Регистрация
                  </button>
                )}
              </div>
              <div className="pt-4 flex items-center justify-between">
                <span className="text-neutral-400">Общо в количката:</span>
                <span className="text-sm font-bold text-white font-mono">{mounted ? formatCurrency(total) : formatCurrency(0)}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default GlobalHeader;