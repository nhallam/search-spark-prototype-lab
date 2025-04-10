
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import EarningsHistory from '@/components/profile/EarningsHistory';

const ProfileEarnings = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Your Earnings</h1>
          <p className="text-muted-foreground">Track your earnings and rent savings over time</p>
        </div>
        
        <EarningsHistory />
      </main>
    </div>
  );
};

export default ProfileEarnings;
