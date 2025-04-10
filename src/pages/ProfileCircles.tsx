
import React, { useState } from 'react';
import { connections } from '@/data/photoAppData';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import KikiCircles from '@/components/profile/KikiCircles';
import InviteDialog from '@/components/profile/InviteDialog';

const ProfileCircles = () => {
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  const openInviteDialog = () => {
    setIsInviteDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Kiki Circles</h1>
          <p className="text-muted-foreground">Manage your connections on Kiki</p>
        </div>
        
        <KikiCircles 
          connections={connections}
          openInviteDialog={openInviteDialog}
        />
      </main>
      
      <InviteDialog 
        isOpen={isInviteDialogOpen}
        onOpenChange={setIsInviteDialogOpen}
        inviteCode="AB123"
      />
    </div>
  );
};

export default ProfileCircles;
