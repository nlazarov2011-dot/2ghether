import React from 'react';
import { Link } from '../lib/utils';
import { COMPANY_INFO } from '../lib/data';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white">2GETHER<span className="text-neutral-600">BIKES</span></h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Официален дилър на Orbea, Santa Cruz и Giant. 
              Професионален велосипеден сервиз и колела под наем в сърцето на Варна.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-brand-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-brand-accent transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-brand-accent transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Магазин</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/shop?brand=Orbea" className="hover:text-white transition-colors">Orbea</Link></li>
              <li><Link to="/shop?brand=Santa Cruz" className="hover:text-white transition-colors">Santa Cruz</Link></li>
              <li><Link to="/shop?brand=Giant" className="hover:text-white transition-colors">Giant</Link></li>
              <li><Link to="/shop?category=Детски" className="hover:text-white transition-colors">Детски колела</Link></li>
              <li><Link to="/shop?category=Екипировка" className="hover:text-white transition-colors">Мърч</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Обслужване на клиенти</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li><Link to="/legal/delivery" className="hover:text-white transition-colors">Доставка</Link></li>
              <li><Link to="/legal/terms" className="hover:text-white transition-colors">Общи условия</Link></li>
              <li><Link to="/legal/privacy" className="hover:text-white transition-colors">Политика за поверителност</Link></li>
              <li><Link to="/service" className="hover:text-white transition-colors">Ценоразпис Сервиз</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Контакти</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <span className="block text-xs text-neutral-600 uppercase">Адрес</span>
                {COMPANY_INFO.address}
              </li>
              <li>
                <span className="block text-xs text-neutral-600 uppercase">Телефон</span>
                {COMPANY_INFO.phone}
              </li>
              <li>
                <span className="block text-xs text-neutral-600 uppercase">Имейл</span>
                {COMPANY_INFO.email}
              </li>
              <li>
                <span className="block text-xs text-neutral-600 uppercase">Работно Време</span>
                {COMPANY_INFO.storeHours} (Магазин)<br/>
                {COMPANY_INFO.supportHours} (Поддръжка)
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600">
          <p>Всички права запазени © 2021 2getherbikes.bg</p>
          <p>{COMPANY_INFO.name} | ЕИК {COMPANY_INFO.eik}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;