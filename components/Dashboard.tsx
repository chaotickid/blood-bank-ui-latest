import React from 'react';
import { BloodUnit, BloodGroup } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  units: BloodUnit[];
}

export const Dashboard: React.FC<DashboardProps> = ({ units }) => {
  // Data for Bar Chart
  const groupData = Object.values(BloodGroup).map(group => ({
    name: group,
    units: units.filter(u => u.bloodGroup === group && u.status === 'Available').length
  }));

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight">Blood Stock Analytics</h2>
          <p className="text-slate-500 mt-1">Real-time visualization of available blood units by group.</p>
        </div>
        <div className="text-right">
             <span className="text-sm font-medium text-slate-400">Total Units Available</span>
             <p className="text-2xl font-bold text-brand-600">
                {units.filter(u => u.status === 'Available').length}
             </p>
        </div>
      </div>

      <div className="flex-1 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-bl-full opacity-50 pointer-events-none" />
        
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={groupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e11d48" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#fda4af" stopOpacity={0.6}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748b', fontSize: 14, fontWeight: 600}} 
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#94a3b8'}} 
            />
            <Tooltip 
              cursor={{fill: '#fff1f2', radius: 8}}
              contentStyle={{
                backgroundColor: '#ffffff', 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                padding: '12px 16px'
              }}
              itemStyle={{ color: '#be123c', fontWeight: 'bold' }}
              formatter={(value: number) => [`${value} Units`, 'Stock']}
            />
            <Bar 
                dataKey="units" 
                fill="url(#colorUv)" 
                radius={[12, 12, 12, 12]} 
                barSize={60}
                animationDuration={1500}
            >
              {groupData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="url(#colorUv)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};