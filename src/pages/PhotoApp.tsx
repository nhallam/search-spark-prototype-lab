
import React, { useState } from 'react';
import Feed from '@/components/photo-app/Feed';
import Profile from '@/components/photo-app/Profile';

const PhotoApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'profile'>('profile'); // Set default to profile for testing
  
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Kiki Photos</h1>
          
          <div className="flex gap-4">
            <button 
              className={`${activeTab === 'feed' ? 'font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('feed')}
            >
              Feed
            </button>
            <button 
              className={`${activeTab === 'profile' ? 'font-semibold' : 'text-gray-500'}`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        {activeTab === 'feed' ? <Feed /> : <Profile />}
      </main>
    </div>
  );
};

export default PhotoApp;
