
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import MarketAnalysis from '@/components/profile/MarketAnalysis';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ProfilePricingAdvice = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link to="/profile">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Pricing Advice</h1>
          </div>
          <p className="text-muted-foreground ml-10">Get market insights to help you price your listings</p>
        </div>
        
        <MarketAnalysis />
      </main>
    </div>
  );
};

export default ProfilePricingAdvice;
