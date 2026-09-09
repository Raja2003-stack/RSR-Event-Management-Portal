import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function StatsCard({ title, value, subtitle, icon: Icon, color, trend }) {
  const colors = {
    blue: { bg: 'bg-blue-50', icon: 'bg-blue-700', text: 'text-blue-700' },
    amber: { bg: 'bg-amber-50', icon: 'bg-amber-500', text: 'text-amber-600' },
    green: { bg: 'bg-green-50', icon: 'bg-green-500', text: 'text-green-600' },
    purple: { bg: 'bg-purple-50', icon: 'bg-purple-600', text: 'text-purple-600' },
    rose: { bg: 'bg-rose-50', icon: 'bg-rose-500', text: 'text-rose-500' },
  };
  const c = colors[color] || colors.blue;

  return (
    <div className={`${c.bg} rounded-2xl p-5 flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div className={`${c.icon} rounded-xl p-2.5 w-fit`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-100 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3" />{trend}
          </div>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold ${c.text}`} style={{fontFamily:'Poppins,sans-serif'}}>{value}</p>
        <p className="text-sm font-semibold text-gray-700 mt-0.5" style={{fontFamily:'Poppins,sans-serif'}}>{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}