
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { generateMockData } from '@/components/profile/EarningsHistory';
import { connections } from '@/data/photoAppData';

// Import the refactored components
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import UserProfileCard from '@/components/profile/UserProfileCard';
import KikiCircles from '@/components/profile/KikiCircles';
import EarningsHistory from '@/components/profile/EarningsHistory';
import FrequentlyAskedQuestions from '@/components/profile/FrequentlyAskedQuestions';
import MarketAnalysis from '@/components/profile/MarketAnalysis';
import InviteDialog from '@/components/profile/InviteDialog';
import HomeListingForm from '@/components/profile/HomeListingForm';

const Profile = () => {
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  const allTimeEarningsData = generateMockData(24);
  const totalEarnings = allTimeEarningsData.reduce((sum, item) => sum + item.earnings, 0);
  
  const userData = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
    inviteCode: 'AB123',
    earningRank: 11,
    totalEarnings: totalEarnings
  };
  
  const openListingDialog = () => {
    setIsListingDialogOpen(true);
  };
  
  const openInviteDialog = () => {
    setIsInviteDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <UserProfileCard 
            userData={userData}
            openListingDialog={openListingDialog}
          />
          
          <div className="md:col-span-2 space-y-6">
            <KikiCircles 
              connections={connections}
              openInviteDialog={openInviteDialog}
            />
            
            <div id="earnings">
              <EarningsHistory />
            </div>
            
            <FrequentlyAskedQuestions />
            
            <MarketAnalysis />
          </div>
        </div>
      </main>
      
      <Dialog open={isListingDialogOpen} onOpenChange={setIsListingDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>List Your Home</DialogTitle>
            <DialogDescription>
              Fill out the details about your apartment to start earning money on Kiki.
            </DialogDescription>
          </DialogHeader>
          <HomeListingForm onClose={() => setIsListingDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <InviteDialog 
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        inviteCode={userData.inviteCode}
      />
    </div>
  );
};

export default Profile;
