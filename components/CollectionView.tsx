import React from 'react';
import { FlaskConical, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const CollectionView: React.FC = () => {
  // Mock Data for collections
  const collections = [
    { id: 'COL-8821', donor: 'John Doe', type: 'Whole Blood', amount: '450ml', date: '2023-10-25', status: 'Processed' },
    { id: 'COL-8822', donor: 'Sarah Conner', type: 'Platelets', amount: '250ml', date: '2023-10-25', status: 'Testing' },
    { id: 'COL-8823', donor: 'Mike Ross', type: 'Whole Blood', amount: '450ml', date: '2023-10-24', status: 'Processed' },
    { id: 'COL-8824', donor: 'Rachel Zane', type: 'Plasma', amount: '200ml', date: '2023-10-24', status: 'Rejected' },
    { id: 'COL-8825', donor: 'Harvey Specter', type: 'Whole Blood', amount: '450ml', date: '2023-10-23', status: 'Processed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Collection History</h2>
          <p className="text-slate-500">Track incoming donations and lab processing status</p>
        </div>
        <button className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center gap-2">
            <FlaskConical className="w-4 h-4" />
            New Collection
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Clock className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Pending Lab Test</p>
                <h3 className="text-2xl font-bold text-slate-800">12 Units</h3>
            </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-600">
                <CheckCircle className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Processed Today</p>
                <h3 className="text-2xl font-bold text-slate-800">45 Units</h3>
            </div>
        </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full text-red-600">
                <AlertCircle className="w-6 h-6" />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Rejected</p>
                <h3 className="text-2xl font-bold text-slate-800">2 Units</h3>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="p-4 text-sm font-semibold text-slate-500">Collection ID</th>
                    <th className="p-4 text-sm font-semibold text-slate-500">Donor Name</th>
                    <th className="p-4 text-sm font-semibold text-slate-500">Type</th>
                    <th className="p-4 text-sm font-semibold text-slate-500">Volume</th>
                    <th className="p-4 text-sm font-semibold text-slate-500">Date</th>
                    <th className="p-4 text-sm font-semibold text-slate-500">Lab Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
                {collections.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 font-mono text-sm text-slate-600">{item.id}</td>
                        <td className="p-4 font-medium text-slate-800">{item.donor}</td>
                        <td className="p-4 text-slate-600">{item.type}</td>
                        <td className="p-4 text-slate-600">{item.amount}</td>
                        <td className="p-4 text-slate-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 text-slate-400" />
                                {item.date}
                            </div>
                        </td>
                        <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Processed' ? 'bg-green-100 text-green-700' :
                                item.status === 'Testing' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                     item.status === 'Processed' ? 'bg-green-500' :
                                     item.status === 'Testing' ? 'bg-blue-500' :
                                     'bg-red-500'
                                }`}></span>
                                {item.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};