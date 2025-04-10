
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
