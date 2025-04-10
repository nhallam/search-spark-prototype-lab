
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfileHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-white text-brand shadow-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">My Profile</h1>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
