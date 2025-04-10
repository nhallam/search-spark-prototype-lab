
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BanknoteIcon, CreditCardIcon, PlusCircleIcon } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';

const ProfileBankDetails = () => {
  const paymentMethods = [
    {
      id: 1,
      type: 'bank',
      name: 'Chase Bank',
      details: '•••• •••• •••• 4321',
      isDefault: true
    },
    {
      id: 2,
      type: 'card',
      name: 'Visa ending in 5678',
      details: 'Expires 09/25',
      isDefault: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Bank Details</h1>
          <p className="text-muted-foreground">Manage your payment methods and bank accounts</p>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your connected accounts and payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id} 
                  className="flex items-center p-4 border rounded-lg bg-white"
                >
                  <div className="bg-primary/10 p-2 rounded-full text-primary mr-4">
                    {method.type === 'bank' ? <BanknoteIcon size={20} /> : <CreditCardIcon size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{method.name}</h3>
                      {method.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{method.details}</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full gap-2">
                <PlusCircleIcon size={16} />
                Add Payment Method
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
              <CardDescription>Choose how and when you receive your earnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-medium mb-1">Payout Schedule</h3>
                  <p className="text-sm text-muted-foreground">You are currently set to receive payouts monthly</p>
                </div>
                <div className="p-4 border rounded-lg bg-white">
                  <h3 className="font-medium mb-1">Default Payment Method</h3>
                  <p className="text-sm text-muted-foreground">Chase Bank •••• •••• •••• 4321</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Update Payout Settings</Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfileBankDetails;
