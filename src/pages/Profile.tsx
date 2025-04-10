import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from 'react-router-dom';
import { 
  BanknoteIcon, 
  BookmarkIcon, 
  HelpCircleIcon, 
  BarChart2Icon, 
  DollarSignIcon, 
  UsersIcon,
  LogOut
} from 'lucide-react';
import { connections } from '@/data/photoAppData';

// Import components
import UserProfileCard from '@/components/profile/UserProfileCard';
import InviteDialog from '@/components/profile/InviteDialog';
import HomeListingForm from '@/components/profile/HomeListingForm';
import { toast } from 'sonner';

const Profile = () => {
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  
  // Generate sample data for profile
  const userData = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
    inviteCode: 'AB123',
    earningRank: 11,
    totalEarnings: 12500
  };
  
  const openListingDialog = () => {
    setIsListingDialogOpen(true);
  };
  
  const openInviteDialog = () => {
    setIsInviteDialogOpen(true);
  };

  const handleLogout = () => {
    toast.info('Logging out...');
    window.location.href = '/';
  };

  const menuItems = [
    { 
      title: 'Bank Details', 
      icon: <BanknoteIcon size={20} />, 
      path: '/profile/bank-details',
      description: 'Manage your payment methods and bank accounts'
    },
    { 
      title: 'Saved Listings', 
      icon: <BookmarkIcon size={20} />, 
      path: '/profile/saved-listings',
      description: 'View your favorite properties'
    },
    { 
      title: 'FAQs', 
      icon: <HelpCircleIcon size={20} />, 
      path: '/profile/faqs',
      description: 'Get answers to your questions'
    },
    { 
      title: 'Pricing Advice', 
      icon: <BarChart2Icon size={20} />, 
      path: '/profile/pricing-advice',
      description: 'Get market insights for your listings'
    },
    { 
      title: 'Your Earnings', 
      icon: <DollarSignIcon size={20} />, 
      path: '/profile/earnings',
      description: 'Track your income and savings'
    },
    { 
      title: 'Kiki Circles', 
      icon: <UsersIcon size={20} />, 
      path: '/profile/circles',
      description: 'Connect with friends on Kiki'
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-12 md:gap-6">
          {/* Profile card on the left in desktop */}
          <div className="md:col-span-4">
            <UserProfileCard 
              userData={userData}
              openListingDialog={openListingDialog}
            />
          </div>
          
          {/* Menu items on the right in desktop */}
          <div className="md:col-span-8">
            <div className="grid gap-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.title} 
                  to={item.path}
                  className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Link>
              ))}

              {/* Logout button styled like menu items */}
              <button 
                onClick={handleLogout}
                className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <div className="bg-primary/10 p-2 rounded-full text-primary">
                  <LogOut size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Log Out</h3>
                  <p className="text-sm text-muted-foreground">Sign out of your account</p>
                </div>
              </button>
            </div>
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
