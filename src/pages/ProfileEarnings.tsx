
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import EarningsHistory from '@/components/profile/EarningsHistory';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Sample user data that would typically come from a user context or API
const userData = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
  inviteCode: 'AB123',
  earningRank: 11,
  totalEarnings: 12500
};

const ProfileEarnings = () => {
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
            <h1 className="text-2xl font-bold">Your Earnings</h1>
          </div>
          <p className="text-muted-foreground ml-10">Track your earnings and rent savings over time</p>
        </div>
        
        <div className="bg-brand/5 p-4 rounded-lg mb-6 border border-brand/10 max-w-md">
          <p className="text-sm text-muted-foreground mb-1">Your Earnings Rank</p>
          <p className="text-lg font-bold text-brand mb-1">#{userData.earningRank} Top Earner</p>
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">Total Rent Saved:</span>
            <span className="text-sm font-semibold">${userData.totalEarnings.toLocaleString()}</span>
          </div>
        </div>
        
        <EarningsHistory />
      </main>
    </div>
  );
};

export default ProfileEarnings;
