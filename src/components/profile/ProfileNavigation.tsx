
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfileNavigation = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="bg-white border-b py-2 sticky top-0 z-10 min-h-[48px] flex items-center">
      <div className="container mx-auto px-4">
        {/* Navigation menu has been removed as requested */}
      </div>
    </div>
  );
};

export default ProfileNavigation;
