import React, { useState } from 'react';
import { 
  Plus, 
  X, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Edit2, 
  Trash2, 
  Droplet,
  Search,
  Filter
} from 'lucide-react';

interface AppUser {
  id: number;
  fullName: string;
  age: number;
  sex: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  status: 'Active' | 'Inactive';
}

const INITIAL_USERS: AppUser[] = [
  { 
    id: 1, 
    fullName: 'Alexander Arnold', 
    age: 28, 
    sex: 'Male', 
    bloodGroup: 'O+', 
    email: 'alex.arnold@example.com', 
    phone: '+1 (555) 123-4567', 
    address: '42 Willow Lane, Springfield',
    status: 'Active'
  },
  { 
    id: 2, 
    fullName: 'Sarah Jenkins', 
    age: 34, 
    sex: 'Female', 
    bloodGroup: 'A-', 
    email: 'sarah.j@example.com', 
    phone: '+1 (555) 987-6543', 
    address: '15 Maple Ave, Shelbyville',
    status: 'Active'
  },
  { 
    id: 3, 
    fullName: 'Michael Chang', 
    age: 45, 
    sex: 'Male', 
    bloodGroup: 'B+', 
    email: 'm.chang@example.com', 
    phone: '+1 (555) 456-7890', 
    address: '88 Oak Street, Capital City',
    status: 'Inactive'
  },
];

export const UsersView: React.FC = () => {
  const [users, setUsers] = useState<AppUser[]>(INITIAL_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [formData, setFormData] = useState<Omit<AppUser, 'id'>>({
    fullName: '',
    age: 18,
    sex: 'Male',
    bloodGroup: 'O+',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      fullName: '',
      age: 18,
      sex: 'Male',
      bloodGroup: 'O+',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: AppUser) => {
    setEditingId(user.id);
    setFormData({
      fullName: user.fullName,
      age: user.age,
      sex: user.sex,
      bloodGroup: user.bloodGroup,
      email: user.email,
      phone: user.phone,
      address: user.address,
      status: user.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setUsers(prev => prev.map(u => u.id === editingId ? { ...formData, id: editingId } : u));
    } else {
      const newUser: AppUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bloodGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Directory</h2>
          <p className="text-slate-500">Manage registered users, donors, and recipients</p>
        </div>
        <button 
            onClick={handleOpenAdd}
            className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-brand-600/20 hover:bg-brand-700 transition-all flex items-center gap-2 transform active:scale-95"
        >
            <Plus className="w-5 h-5" />
            Add New User
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users by name, email, or blood group..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 px-4 border border-slate-200 rounded-lg bg-slate-50 text-slate-600">
           <Filter className="w-4 h-4" />
           <span className="text-sm font-medium">Filter</span>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="p-4 pl-6">User Details</th>
                <th className="p-4">Personal Info</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Contact & Address</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-lg border border-brand-100">
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{user.fullName}</h3>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-600">
                        <span className="block font-medium">{user.age} Years</span>
                        <span className="text-slate-400 text-xs">{user.sex}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 font-bold text-sm border border-red-100">
                        <Droplet className="w-3 h-3 fill-current" />
                        {user.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {user.phone}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 max-w-[200px] truncate">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          {user.address}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEdit(user)}
                          className="p-2 text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="Edit User"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                   <User className="w-5 h-5" />
                </div>
                {editingId ? 'Update User Information' : 'Register New User'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                    placeholder="Enter full legal name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                    placeholder="name@example.com"
                  />
                </div>

                 {/* Phone */}
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Age</label>
                  <input 
                    type="number" 
                    required
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>

                {/* Sex */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Sex</label>
                  <select 
                    value={formData.sex}
                    onChange={(e) => setFormData({...formData, sex: e.target.value as any})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Blood Group */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Blood Group</label>
                  <select 
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white font-medium"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Status</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Address</label>
                  <textarea 
                    rows={3}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 resize-none"
                    placeholder="Street address, City, State, Zip Code"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-3 bg-brand-600 rounded-xl text-white hover:bg-brand-700 font-semibold shadow-lg shadow-brand-600/20 transition-all transform hover:translate-y-[-1px]"
                >
                  {editingId ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};