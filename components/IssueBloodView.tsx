import React, { useState } from 'react';
import { FileOutput, Building2, User, Search, ArrowRight, Plus, X, Stethoscope, Activity, Mail, Droplet, DollarSign } from 'lucide-react';

interface BloodRequest {
  id: string;
  hospital: string;
  patient: string;
  email: string;
  group: string;
  urgency: 'Critical' | 'High' | 'Normal';
  status: 'Pending' | 'Approved' | 'Dispatched';
  quantity: number;
  purpose: string;
  referredBy: string;
  userType: 'Donor' | 'Receiver';
  amount: number;
}

const INITIAL_REQUESTS: BloodRequest[] = [
  { 
    id: 'REQ-2023-001', 
    hospital: 'City General Hospital', 
    patient: 'Alice Williams', 
    email: 'alice.w@example.com',
    group: 'A+', 
    urgency: 'Critical', 
    status: 'Pending',
    quantity: 2,
    purpose: 'Emergency Surgery',
    referredBy: 'Dr. Smith',
    userType: 'Receiver',
    amount: 250.00
  },
  { 
    id: 'REQ-2023-002', 
    hospital: 'St. Mary Medical Center', 
    patient: 'Bob Brown', 
    email: 'b.brown@example.com',
    group: 'O-', 
    urgency: 'Normal', 
    status: 'Approved',
    quantity: 1,
    purpose: 'Anemia Treatment',
    referredBy: 'Dr. Johnson',
    userType: 'Donor',
    amount: 0.00
  },
  { 
    id: 'REQ-2023-003', 
    hospital: 'City General Hospital', 
    patient: 'Charlie Davis', 
    email: 'charlie.d@example.com',
    group: 'B+', 
    urgency: 'High', 
    status: 'Dispatched',
    quantity: 3,
    purpose: 'Trauma',
    referredBy: 'Dr. Emily White',
    userType: 'Receiver',
    amount: 375.50
  },
];

export const IssueBloodView: React.FC = () => {
  const [requests, setRequests] = useState<BloodRequest[]>(INITIAL_REQUESTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    userType: 'Receiver',
    quantity: 1,
    bloodGroup: 'A+',
    urgency: 'Normal',
    purpose: '',
    referredBy: '',
    hospital: '',
    amount: 0
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isDonor = formData.userType === 'Donor';

    const newReq: BloodRequest = {
        id: `REQ-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`,
        hospital: isDonor ? 'HemoLife Center' : formData.hospital,
        patient: formData.userName || formData.email.split('@')[0], 
        email: formData.email,
        group: formData.bloodGroup,
        urgency: isDonor ? 'Normal' : formData.urgency as any,
        status: 'Pending',
        quantity: formData.quantity,
        purpose: isDonor ? 'Blood Donation' : formData.purpose,
        referredBy: isDonor ? 'Self' : formData.referredBy,
        userType: formData.userType as any,
        amount: isDonor ? 0 : formData.amount
    };

    setRequests([newReq, ...requests]);
    setIsModalOpen(false);
    
    // Reset form
    setFormData({
      email: '',
      userName: '',
      userType: 'Receiver',
      quantity: 1,
      bloodGroup: 'A+',
      urgency: 'Normal',
      purpose: '',
      referredBy: '',
      hospital: '',
      amount: 0
    });
  };

  const filteredRequests = requests.filter(req => 
    req.hospital.toLowerCase().includes(searchTerm.toLowerCase()) || 
    req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Issue Blood</h2>
          <p className="text-slate-500">Manage hospital requests and blood dispatch</p>
        </div>
        <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center gap-2"
        >
            <Plus className="w-4 h-4" />
            Create Request
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search requests by hospital, patient or ID..." 
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        {filteredRequests.map((req) => (
            <div key={req.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
                <div className="flex items-start gap-6 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 border-2 ${
                        req.urgency === 'Critical' ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' :
                        req.urgency === 'High' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                        'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                        {req.group}
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-800 text-lg">{req.hospital}</h3>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide ${
                                req.urgency === 'Critical' ? 'bg-red-500 text-white' :
                                req.urgency === 'High' ? 'bg-orange-500 text-white' :
                                'bg-blue-500 text-white'
                            }`}>
                                {req.urgency}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide bg-slate-100 text-slate-500">
                                {req.userType}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-500 mt-2">
                            <span className="flex items-center gap-2">
                                <User className="w-4 h-4 text-slate-400" /> 
                                <span className="font-medium text-slate-700">{req.patient}</span>
                            </span>
                            <span className="flex items-center gap-2 font-mono text-slate-400">
                                <span className="text-xs bg-slate-100 px-1.5 rounded">ID</span> 
                                {req.id}
                            </span>
                             <span className="flex items-center gap-2">
                                <Stethoscope className="w-4 h-4 text-slate-400" />
                                Referred by {req.referredBy}
                            </span>
                             <span className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-slate-400" />
                                Purpose: {req.purpose}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end gap-3 w-full lg:w-auto pl-18 lg:pl-0 border-t lg:border-t-0 border-slate-50 pt-4 lg:pt-0">
                    <div className="flex items-center gap-6">
                         <div className="text-right">
                            <p className="text-xs text-slate-400 font-semibold uppercase">Amount</p>
                            <p className="font-bold text-slate-700">${(req.amount || 0).toLocaleString()}</p>
                        </div>
                         <div className="text-right mr-2">
                            <p className="text-xs text-slate-400 font-semibold uppercase">Quantity</p>
                            <p className="font-bold text-slate-700">{req.quantity} Units</p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            req.status === 'Dispatched' ? 'bg-green-50 text-green-700 border border-green-100' :
                            req.status === 'Approved' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                            'bg-yellow-50 text-yellow-700 border border-yellow-100'
                        }`}>
                            {req.status}
                        </div>
                    </div>
                    
                    {req.status === 'Pending' && (
                        <button className="flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 px-4 py-2 rounded-lg hover:bg-brand-100 transition-colors w-full lg:w-auto justify-center">
                            Process Request <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        ))}
      </div>

       {/* Create Request Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <div className="bg-slate-100 p-2 rounded-lg text-slate-700">
                   <FileOutput className="w-5 h-5" />
                </div>
                Create Blood Request
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleCreate} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Search User by Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Search User</label>
                  <div className="relative flex gap-2">
                    <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400"
                            placeholder="Enter user email address..."
                        />
                    </div>
                    <button type="button" className="px-4 py-2 bg-slate-100 text-slate-600 font-medium rounded-xl hover:bg-slate-200 transition-colors flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        <span className="hidden sm:inline">Check</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 ml-1">The system will auto-fill details if the user exists.</p>
                </div>

                {/* User Name */}
                <div>
                   <label className="block text-sm font-semibold text-slate-700 mb-1.5">User Name</label>
                   <input 
                      type="text" 
                      required
                      value={formData.userName}
                      onChange={(e) => setFormData({...formData, userName: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                      placeholder="Full Name"
                    />
                </div>

                {/* User Type */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">User Type</label>
                  <select 
                    value={formData.userType}
                    onChange={(e) => setFormData({...formData, userType: e.target.value as any})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
                  >
                    <option value="Receiver">Receiver (Patient)</option>
                    <option value="Donor">Donor</option>
                  </select>
                </div>

                {/* Blood Group */}
                 <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Required Blood Group</label>
                  <div className="relative">
                    <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500" />
                    <select 
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white font-medium"
                    >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Quantity Required (Units)</label>
                  <input 
                    type="number" 
                    required
                    min="1"
                    max="10"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                </div>

                {/* Total Amount - Condition: Receiver only */}
                {formData.userType === 'Receiver' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Total Amount</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="number" 
                        required
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: Number(e.target.value)})}
                        className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                )}

                 {/* Urgency - Condition: Receiver only */}
                 {formData.userType === 'Receiver' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Urgency Level</label>
                    <select 
                      value={formData.urgency}
                      onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all bg-white"
                    >
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                 )}

                {/* Hospital Name - Condition: Receiver only */}
                {formData.userType === 'Receiver' && (
                  <div className="md:col-span-2">
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Hospital Name</label>
                     <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                              type="text" 
                              required
                              value={formData.hospital}
                              onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                              placeholder="e.g. City General Hospital"
                              />
                     </div>
                  </div>
                )}

                {/* Referred By - Condition: Receiver only */}
                {formData.userType === 'Receiver' && (
                  <div>
                     <label className="block text-sm font-semibold text-slate-700 mb-1.5">Referred By</label>
                     <input 
                        type="text" 
                        required
                        value={formData.referredBy}
                        onChange={(e) => setFormData({...formData, referredBy: e.target.value})}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                        placeholder="Dr. Name"
                      />
                  </div>
                )}

                {/* Purpose - Condition: Receiver only */}
                {formData.userType === 'Receiver' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Purpose of Issue</label>
                    <textarea 
                      rows={3}
                      required
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all placeholder:text-slate-400 resize-none"
                      placeholder="Describe the medical reason..."
                    />
                  </div>
                )}
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
                  className="flex-1 px-4 py-3 bg-slate-900 rounded-xl text-white hover:bg-slate-800 font-semibold shadow-lg shadow-slate-900/20 transition-all transform hover:translate-y-[-1px]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};