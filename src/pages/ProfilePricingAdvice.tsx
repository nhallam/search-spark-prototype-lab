
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import MarketAnalysis from '@/components/profile/MarketAnalysis';

const ProfilePricingAdvice = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Pricing Advice</h1>
          <p className="text-muted-foreground">Get market insights to help you price your listings</p>
        </div>
        
        <MarketAnalysis />
      </main>
    </div>
  );
};

export default ProfilePricingAdvice;
