
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, Compass, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabNavigationProps {
  activeTab?: 'explore' | 'bookings' | 'notifications' | 'profile';
}

const TabNavigation = ({ activeTab = 'explore' }: TabNavigationProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Hide the navigation on the photo app
  if (location.pathname.includes('/photos')) {
    return null;
  }
  
  // If not on mobile, don't render the tab navigation
  if (!isMobile) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-around items-center h-16 px-2 max-w-screen-xl mx-auto">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2",
            activeTab === 'explore' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Compass size={24} />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link 
          to="/bookings" 
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2",
            activeTab === 'bookings' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Calendar size={24} />
          <span className="text-xs mt-1">Bookings</span>
        </Link>
        
        <Link 
          to="/notifications" 
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2",
            activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Bell size={24} />
          <span className="text-xs mt-1">Notifications</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={cn(
            "flex flex-col items-center justify-center w-1/4 py-2",
            activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <UserRound size={24} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default TabNavigation;
