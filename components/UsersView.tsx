import React from 'react';
import { ShieldCheck, Mail, MoreVertical, Plus } from 'lucide-react';

export const UsersView: React.FC = () => {
  const users = [
    { id: 1, name: 'Dr. Sarah Wilson', role: 'Medical Director', email: 'sarah.w@hemolife.org', status: 'Active', avatar: 'S' },
    { id: 2, name: 'James Martin', role: 'Lab Technician', email: 'james.m@hemolife.org', status: 'Active', avatar: 'J' },
    { id: 3, name: 'Emily Chen', role: 'Administrator', email: 'emily.c@hemolife.org', status: 'Away', avatar: 'E' },
    { id: 4, name: 'Michael Brown', role: 'Nurse', email: 'michael.b@hemolife.org', status: 'Active', avatar: 'M' },
  ];

  return (
    <div className="space-y-6">
       <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500">Manage staff access and roles</p>
        </div>
        <button className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg hover:bg-brand-700 transition-all flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add User
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {users.map((user) => (
                <div key={user.id} className="border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow relative group">
                    <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-600">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
                            {user.avatar}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">{user.name}</h3>
                            <p className="text-sm text-brand-600 font-medium mb-1">{user.role}</p>
                             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Mail className="w-3 h-3" />
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                         <span className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-md ${
                             user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
                         }`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${
                                 user.status === 'Active' ? 'bg-green-500' : 'bg-amber-500'
                             }`}></span>
                             {user.status}
                         </span>
                         <span className="text-xs text-slate-400">Last login: 2h ago</span>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};