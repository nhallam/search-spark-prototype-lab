
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Bell, Search, LogOut, Calendar, Copy, Check, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import EarningsHistory from '@/components/profile/EarningsHistory';

const Profile = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user data - in a real app, this would come from authentication context
  const userData = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=100&h=100',
    inviteCode: 'AB123'
  };
  
  const mockBookings = [
    { id: 1, property: 'Manhattan Loft', date: '2025-05-15', status: 'pending' },
    { id: 2, property: 'Brooklyn Heights Apartment', date: '2025-06-22', status: 'confirmed' },
  ];
  
  const mockNotifications = [
    { id: 1, message: 'Your booking for Manhattan Loft was confirmed', read: false, date: '2025-04-01' },
    { id: 2, message: 'New property listings in your favorite areas', read: true, date: '2025-03-28' },
    { id: 3, message: 'Limited time offer: 15% off for summer bookings', read: false, date: '2025-03-25' },
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
    // In a real app, this would call your logout function
    toast.info('Logging out...');
    // For demo purposes, we'll just redirect to home
    window.location.href = '/';
  };
  
  const filterNotifications = () => {
    if (!searchQuery.trim()) return mockNotifications;
    
    return mockNotifications.filter(notification => 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
          {/* Profile Card */}
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
          
          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            {/* Earnings History Graph */}
            <EarningsHistory />
            
            {/* Booking Requests */}
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
            
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Notifications</span>
                  <Bell size={20} />
                </CardTitle>
                <CardDescription>Stay updated with your account activity</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search notifications"
                    className="pl-8"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filterNotifications().length > 0 ? (
                  <div className="space-y-3">
                    {filterNotifications().map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 rounded-lg border ${!notification.read ? 'bg-primary/5 border-primary/20' : ''}`}
                      >
                        <div className="flex justify-between">
                          <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                          {!notification.read && (
                            <Badge variant="default" className="h-fit">New</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.date).toLocaleDateString('en-US', { 
                            month: 'short', day: 'numeric' 
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No notifications found</p>
                )}
              </CardContent>
            </Card>
            
            {/* FAQs */}
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
    </div>
  );
};

export default Profile;
