
import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

const ProfileHeader = () => {
  const handleLogout = () => {
    toast.info('Logging out...');
    window.location.href = '/';
  };

  return (
    <header className="bg-white text-brand shadow-sm py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-brand">My Profile</h1>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/photos">Photos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/notifications">Notifications</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/market-analysis">Market Analysis</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" onClick={handleLogout} className="border-brand text-brand hover:bg-brand/10">
              <LogOut size={16} className="mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
