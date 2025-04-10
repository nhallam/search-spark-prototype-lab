
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Building } from 'lucide-react';
import { toast } from 'sonner';

interface UserProfileCardProps {
  userData: {
    name: string;
    email: string;
    avatar: string;
    inviteCode: string;
  };
  openListingDialog: () => void;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ userData, openListingDialog }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(userData.inviteCode);
    setCopied(true);
    toast.success('Invite code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader className="flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-4">
          <AvatarImage src={userData.avatar} alt={userData.name} />
          <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl font-bold">{userData.name}</CardTitle>
        <CardDescription className="text-lg mt-1">{userData.email}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground mb-2">Your Invite Code</p>
          <div className="flex justify-center items-center space-x-2">
            <span className="text-xl font-mono font-bold">{userData.inviteCode}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopyInviteCode}
              className="h-8 w-8 p-0"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </Button>
          </div>
        </div>
        <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand/10 mb-4">
          Edit Profile
        </Button>
        
        <Card className="border border-brand/10">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-base">
              <span>My Home</span>
              <Building size={18} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <p className="text-sm text-muted-foreground mb-3">
              List your NYC apartment on Kiki and earn while you travel.
            </p>
            <ul className="space-y-2 mb-3 text-left">
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-xs">Earn up to $4,500 per month</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-xs">24/7 customer support</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="mt-0.5 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                <span className="text-xs">$1M host protection included</span>
              </li>
            </ul>
            <Button 
              className="w-full bg-brand hover:bg-brand/90 text-sm" 
              size="sm"
              onClick={openListingDialog}
            >
              List My Home
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
