
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { LogOut, Calendar, Copy, Check, ChevronRight, Building } from 'lucide-react';
import { toast } from 'sonner';
import EarningsHistory from '@/components/profile/EarningsHistory';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import HomeListingForm from '@/components/profile/HomeListingForm';

import { generateMockData } from '@/components/profile/EarningsHistory';

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  
  const allTimeEarningsData = generateMockData(24);
  const totalEarnings = allTimeEarningsData.reduce((sum, item) => sum + item.earnings, 0);
  
  const userData = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
    inviteCode: 'AB123',
    earningRank: 11,
    totalEarnings: totalEarnings
  };
  
  const mockBookings = [
    { id: 1, property: 'Manhattan Loft', date: '2025-05-15', status: 'pending' },
    { id: 2, property: 'Brooklyn Heights Apartment', date: '2025-06-22', status: 'confirmed' },
  ];
  
  const faqs = [
    {
      question: 'How do I edit my profile?',
      answer: 'You can edit your profile by clicking on the "Edit Profile" button on this page. From there, you can update your name, email, and profile picture.'
    },
    {
      question: 'What is my invite code for?',
      answer: 'Your unique invite code allows friends to join Kiki with special benefits. Share it with friends and both of you will receive booking credits when they sign up.'
    },
    {
      question: 'How do I manage my bookings?',
      answer: 'You can view and manage all your bookings in the "Booking Requests" section of your profile. Click on any booking to see details or make changes.'
    },
    {
      question: 'Can I change my payment method?',
      answer: 'Yes, you can update your payment methods by visiting the "Payment Methods" section in your account settings.'
    }
  ];
  
  const handleCopyInviteCode = () => {
    navigator.clipboard.writeText(userData.inviteCode);
    setCopied(true);
    toast.success('Invite code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleLogout = () => {
    toast.info('Logging out...');
    window.location.href = '/';
  };
  
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  const openListingDialog = () => {
    setIsListingDialogOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand">My Profile</h1>
            <Button variant="outline" onClick={handleLogout} className="border-brand text-brand hover:bg-brand/10">
              <LogOut size={16} className="mr-2" />
              Log Out
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-brand/5 p-4 rounded-lg mb-4 border border-brand/10">
                <p className="text-sm text-muted-foreground mb-1">Your Earnings Rank</p>
                <p className="text-lg font-bold text-brand mb-1">#{userData.earningRank} Top Earner</p>
                <div className="flex justify-center items-center gap-1.5">
                  <span className="text-sm text-muted-foreground">Total Earned:</span>
                  <span className="text-sm font-semibold">{formatCurrency(userData.totalEarnings)}</span>
                </div>
              </div>
              
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
              <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand/10">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2 space-y-6">
            <EarningsHistory />
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Booking Requests</span>
                  <Calendar size={20} />
                </CardTitle>
                <CardDescription>Manage your upcoming stays</CardDescription>
              </CardHeader>
              <CardContent>
                {mockBookings.length > 0 ? (
                  <div className="space-y-4">
                    {mockBookings.map(booking => (
                      <div 
                        key={booking.id} 
                        className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{booking.property}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.date).toLocaleDateString('en-US', { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'outline'} className="mr-2">
                            {booking.status}
                          </Badge>
                          <ChevronRight size={16} className="text-muted-foreground" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No booking requests yet</p>
                )}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand/10">
                  View All Bookings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>My Home</span>
                  <Building size={20} />
                </CardTitle>
                <CardDescription>Earn money by listing your NYC apartment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-brand/5 rounded-lg border border-brand/10">
                  <h3 className="font-medium text-lg mb-2">Turn your apartment into income</h3>
                  <p className="text-muted-foreground mb-4">
                    List your NYC apartment on Kiki and earn money while you travel. Our trusted platform connects you with 
                    verified guests looking for authentic New York experiences.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                      <span className="text-sm">Earn up to $4,500 per month on average</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                      <span className="text-sm">24/7 customer support and automated payments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="mt-1 h-4 w-4 rounded-full bg-brand flex items-center justify-center text-white text-xs">✓</div>
                      <span className="text-sm">$1M host protection insurance included</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-brand hover:bg-brand/90" onClick={openListingDialog}>
                  List My Home
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Get answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand/10">
                  Contact Support
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      {/* Home Listing Dialog */}
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
    </div>
  );
};

export default Profile;
