
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AppHeader = () => {
  const location = useLocation();
  
  // Hide the header on the photo app
  if (location.pathname.includes('/photos')) {
    return null;
  }
  
  // Check if we're on the home page
  const isHomePage = location.pathname === '/';
  
  // Determine the title based on the current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (isHomePage) return "Kiki";
    if (path === '/profile') return "My Profile";
    if (path === '/bookings') return "My Bookings";
    if (path === '/my-home') return "My Home";
    if (path === '/messages') return "Messages";
    if (path === '/notifications') return "Notifications";
    if (path.includes('/profile/bank-details')) return "Bank Details";
    if (path.includes('/profile/saved-listings')) return "Saved Listings";
    if (path.includes('/profile/faqs')) return "Frequently Asked Questions";
    if (path.includes('/profile/pricing-advice')) return "Pricing Advice";
    if (path.includes('/profile/earnings')) return "Your Earnings";
    if (path.includes('/profile/circles')) return "Kiki Circles";
    if (path.includes('/market-analysis')) return "Market Analysis";
    if (path.includes('/rating-experiments')) return "Rating Experiments";
    
    // Default title for other pages
    return "";
  };
  
  const pageTitle = getPageTitle();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container flex h-16 items-center px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center">
          {pageTitle && (
            <h1 className="text-2xl font-bold text-brand">{pageTitle}</h1>
          )}
        </div>
        
        <div className="flex items-center justify-end flex-1 space-x-2">
          <Link to="/notifications" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className={cn(
                "h-6 w-6", // Increased from h-5 w-5 to h-6 w-6
                location.pathname === '/notifications' ? 'text-primary' : 'text-muted-foreground'
              )} />
              <Badge 
                variant="secondary" 
                size="sm" 
                className="absolute -top-1 -right-1 bg-red-500 text-white border-none w-[20px] h-[20px] p-0 rounded-full flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
          </Link>
          
          {isHomePage && (
            <Link to="/invite">
              <Button className="bg-brand hover:bg-brand/90 text-white">
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
