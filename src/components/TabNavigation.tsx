
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Calendar, Compass, UserRound, Home, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface TabNavigationProps {
  activeTab?: 'explore' | 'bookings' | 'notifications' | 'profile' | 'my-home';
}

const TabNavigation = ({ activeTab = 'explore' }: TabNavigationProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // Hide the navigation on the photo app
  if (location.pathname.includes('/photos')) {
    return null;
  }
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg z-50 border-t border-gray-200 dark:border-gray-700">
      <div className={cn(
        "flex justify-around items-center h-16 max-w-screen-xl mx-auto",
        isMobile ? "px-2" : "px-2 max-w-md"
      )}>
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'explore' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Compass size={20} />
          <span className="text-xs mt-1">Explore</span>
        </Link>
        
        <Link 
          to="/bookings" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'bookings' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Calendar size={20} />
          <span className="text-xs mt-1">Bookings</span>
        </Link>

        <Link 
          to="/my-home" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'my-home' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Home size={20} />
          <span className="text-xs mt-1">My Home</span>
        </Link>
        
        <Link 
          to="/notifications" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'notifications' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <Bell size={20} />
          <span className="text-xs mt-1">Notifications</span>
        </Link>
        
        <Link 
          to="/menu" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16"
          )}
        >
          <Menu size={20} />
          <span className="text-xs mt-1">Menu</span>
        </Link>
      </div>
    </div>
  );
};

export default TabNavigation;
