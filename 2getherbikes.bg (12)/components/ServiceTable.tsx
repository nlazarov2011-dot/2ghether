import React from 'react';
import { SERVICES } from '../lib/data';
import { formatCurrency } from '../lib/utils';

const ServiceTable: React.FC = () => {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-900">
            <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider">Услуга</th>
            <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider hidden md:table-cell">Описание</th>
            <th className="p-4 text-xs font-bold text-neutral-400 uppercase tracking-wider text-right">Цена</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {SERVICES.map((service) => (
            <tr key={service.id} className="hover:bg-neutral-800/50 transition-colors">
              <td className="p-4 text-neutral-200 font-medium">{service.name}</td>
              <td className="p-4 text-neutral-500 text-sm hidden md:table-cell">{service.description}</td>
              <td className="p-4 text-brand-accent font-mono font-bold text-right whitespace-nowrap text-sm">
                {formatCurrency(service.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;