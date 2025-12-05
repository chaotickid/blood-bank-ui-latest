import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { InventoryView } from './components/InventoryView';
import { DonorsView } from './components/DonorsView';
import { AIAssistant } from './components/AIAssistant';
import { CollectionView } from './components/CollectionView';
import { IssueBloodView } from './components/IssueBloodView';
import { UsersView } from './components/UsersView';
import { BloodUnit, Donor, BloodGroup } from './types';

// Mock Initial Data
const INITIAL_UNITS: BloodUnit[] = [
  { id: 'BU-1001', bloodGroup: BloodGroup.A_POS, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
  { id: 'BU-1002', bloodGroup: BloodGroup.O_NEG, collectionDate: '2023-10-20', expiryDate: '2023-12-01', volume: 450, status: 'Available' },
  { id: 'BU-1003', bloodGroup: BloodGroup.B_POS, collectionDate: '2023-10-15', expiryDate: '2023-11-26', volume: 450, status: 'Reserved' },
  { id: 'BU-1004', bloodGroup: BloodGroup.AB_POS, collectionDate: '2023-10-28', expiryDate: '2023-12-09', volume: 450, status: 'Available' },
  { id: 'BU-1005', bloodGroup: BloodGroup.O_POS, collectionDate: '2023-10-26', expiryDate: '2023-12-07', volume: 450, status: 'Available' },
  { id: 'BU-1006', bloodGroup: BloodGroup.A_NEG, collectionDate: '2023-10-01', expiryDate: '2023-11-12', volume: 450, status: 'Expired' },
  { id: 'BU-1007', bloodGroup: BloodGroup.A_POS, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
  { id: 'BU-1008', bloodGroup: BloodGroup.A_POS, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
  { id: 'BU-1009', bloodGroup: BloodGroup.O_POS, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
  { id: 'BU-1010', bloodGroup: BloodGroup.O_POS, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
  { id: 'BU-1011', bloodGroup: BloodGroup.AB_NEG, collectionDate: '2023-10-25', expiryDate: '2023-12-06', volume: 450, status: 'Available' },
];

const INITIAL_DONORS: Donor[] = [
  { id: 'D-001', name: 'John Doe', age: 32, bloodGroup: BloodGroup.O_NEG, contact: '+1 555-0123', lastDonationDate: '2023-08-15', status: 'Active' },
  { id: 'D-002', name: 'Jane Smith', age: 28, bloodGroup: BloodGroup.A_POS, contact: '+1 555-0124', lastDonationDate: '2023-09-20', status: 'Active' },
  { id: 'D-003', name: 'Robert Johnson', age: 45, bloodGroup: BloodGroup.B_POS, contact: '+1 555-0125', lastDonationDate: '2023-01-10', status: 'Deferred' },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [units, setUnits] = useState<BloodUnit[]>(INITIAL_UNITS);
  const [donors, setDonors] = useState<Donor[]>(INITIAL_DONORS);

  const handleAddUnit = (unit: Omit<BloodUnit, 'id'>) => {
    const newUnit: BloodUnit = {
      ...unit,
      id: `BU-${Math.floor(Math.random() * 10000)}`
    };
    setUnits([newUnit, ...units]);
  };

  const handleDeleteUnit = (id: string) => {
    setUnits(units.filter(u => u.id !== id));
  };

  const handleAddDonor = (donor: Omit<Donor, 'id'>) => {
    const newDonor: Donor = {
      ...donor,
      id: `D-${Math.floor(Math.random() * 1000)}`
    };
    setDonors([newDonor, ...donors]);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard units={units} />;
      case 'inventory':
        return <InventoryView units={units} onAddUnit={handleAddUnit} onDeleteUnit={handleDeleteUnit} />;
      case 'collection':
        return <CollectionView />;
      case 'issue':
        return <IssueBloodView />;
      case 'donors':
        return <DonorsView donors={donors} onAddDonor={handleAddDonor} />;
      case 'users':
        return <UsersView />;
      case 'assistant':
        return <AIAssistant />;
      default:
        return <Dashboard units={units} />;
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans">
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      
      <main className="ml-64 flex-1 p-8 h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;