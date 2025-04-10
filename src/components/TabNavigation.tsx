
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Compass, UserRound, Home, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '@/components/ui/badge';

interface TabNavigationProps {
  activeTab?: 'explore' | 'bookings' | 'profile' | 'my-home' | 'messages';
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
            "flex flex-col items-center justify-center py-2 relative",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'my-home' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <div className="relative">
            <Home size={20} />
            <Badge 
              variant="secondary" 
              size="sm" 
              className="absolute -top-2 -right-4 bg-red-500 text-white border-none px-1 py-0"
            >
              New
            </Badge>
          </div>
          <span className="text-xs mt-1">My Home</span>
        </Link>

        <Link 
          to="/messages" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'messages' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <MessageCircle size={20} />
          <span className="text-xs mt-1">Messages</span>
        </Link>
        
        <Link 
          to="/profile" 
          className={cn(
            "flex flex-col items-center justify-center py-2",
            isMobile ? "w-1/5" : "w-16",
            activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          <UserRound size={20} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
};

export default TabNavigation;
