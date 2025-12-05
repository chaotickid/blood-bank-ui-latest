import React from 'react';
import { FileOutput, Building2, User, Search, ArrowRight } from 'lucide-react';

export const IssueBloodView: React.FC = () => {
  const requests = [
    { id: 'REQ-2023-001', hospital: 'City General Hospital', patient: 'Alice Williams', group: 'A+', urgency: 'Critical', status: 'Pending' },
    { id: 'REQ-2023-002', hospital: 'St. Mary Medical Center', patient: 'Bob Brown', group: 'O-', urgency: 'Normal', status: 'Approved' },
    { id: 'REQ-2023-003', hospital: 'City General Hospital', patient: 'Charlie Davis', group: 'B+', urgency: 'High', status: 'Dispatched' },
    { id: 'REQ-2023-004', hospital: 'Community Clinic', patient: 'Diana Evans', group: 'AB+', urgency: 'Normal', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Issue Blood</h2>
          <p className="text-slate-500">Manage hospital requests and blood dispatch</p>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
            <FileOutput className="w-4 h-4" />
            Create Request
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search requests by hospital or ID..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
        </div>
        <select className="border border-slate-200 rounded-lg px-4 py-2 text-slate-600 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Dispatched</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {requests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-6 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                        req.urgency === 'Critical' ? 'bg-red-100 text-red-600 animate-pulse' :
                        req.urgency === 'High' ? 'bg-orange-100 text-orange-600' :
                        'bg-slate-100 text-slate-600'
                    }`}>
                        {req.group}
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-800">{req.hospital}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${
                                req.urgency === 'Critical' ? 'bg-red-500 text-white' :
                                req.urgency === 'High' ? 'bg-orange-500 text-white' :
                                'bg-blue-500 text-white'
                            }`}>
                                {req.urgency}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                                <User className="w-3 h-3" /> {req.patient}
                            </span>
                            <span className="font-mono text-slate-400">#{req.id}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                    <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                         req.status === 'Dispatched' ? 'bg-green-50 text-green-700 border border-green-100' :
                         req.status === 'Approved' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                         'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}>
                        {req.status}
                    </div>
                    {req.status === 'Pending' && (
                        <button className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700">
                            Process <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};