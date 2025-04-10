import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  
  const notifications = [
    { 
      id: 1, 
      message: 'Your booking for Manhattan Loft was confirmed', 
      description: 'Your stay is scheduled for May 15-20, 2025',
      read: false, 
      date: '2025-04-01',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120',
      user: 'Host Alex'
    },
    { 
      id: 2, 
      message: 'New property listings in your favorite areas', 
      description: '5 new properties in Manhattan match your preferences',
      read: true, 
      date: '2025-03-28',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    },
    { 
      id: 3, 
      message: 'Limited time offer: 15% off for summer bookings', 
      description: 'Use code SUMMER25 at checkout before April 30',
      read: false, 
      date: '2025-03-25',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki Team'
    },
    { 
      id: 4, 
      message: 'Review request for Brooklyn Heights Apartment', 
      description: 'Share your experience to help other travelers',
      read: true, 
      date: '2025-03-20',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=120&h=120',
      user: 'Sarah'
    },
    { 
      id: 5, 
      message: 'Your booking request for Chelsea Studio was received', 
      description: 'The host will respond within 24 hours',
      read: true, 
      date: '2025-03-15',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
      user: 'Host Emma'
    },
    { 
      id: 6, 
      message: 'Your host has accepted your booking request', 
      description: 'Your stay at Soho Designer Loft is confirmed',
      read: false, 
      date: '2025-03-14',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120',
      user: 'Host James'
    },
    { 
      id: 7, 
      message: 'Message from Alex about your stay', 
      description: 'Thanks for choosing our property! Let me know if you need anything.',
      read: false, 
      date: '2025-03-12',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120',
      user: 'Alex'
    },
    { 
      id: 8, 
      message: 'Kiki monthly newsletter is here!', 
      description: 'Check out the top trending destinations for Spring',
      read: true, 
      date: '2025-03-10',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki Team'
    },
    { 
      id: 9, 
      message: 'Price drop alert: Upper East Side Penthouse', 
      description: '20% discount for weekday bookings',
      read: true, 
      date: '2025-03-08',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    },
    { 
      id: 10, 
      message: 'Your booking is approaching', 
      description: 'Your stay at Tribeca Luxury Loft starts in 7 days',
      read: false, 
      date: '2025-03-05',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120',
      user: 'Host James'
    },
    { 
      id: 11, 
      message: 'New message from your host Sarah', 
      description: 'Here is some info about local attractions near your stay',
      read: true, 
      date: '2025-03-03',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=120&h=120',
      user: 'Sarah'
    },
    { 
      id: 12, 
      message: 'Special offer for loyal Kiki members', 
      description: 'Earn double points on your next booking',
      read: false, 
      date: '2025-03-01',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki Team'
    },
    { 
      id: 13, 
      message: 'Your favorites list has been updated', 
      description: 'One of your saved properties has new availability',
      read: true, 
      date: '2025-02-28',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    },
    { 
      id: 14, 
      message: 'Payment reminder for upcoming stay', 
      description: 'Please complete payment for Brooklyn Brownstone',
      read: false, 
      date: '2025-02-25',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
      user: 'Host James'
    },
    { 
      id: 15, 
      message: 'Host responded to your question', 
      description: 'Check your messages for details about parking options',
      read: false, 
      date: '2025-02-23',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120',
      user: 'Alex'
    },
    { 
      id: 16, 
      message: 'Welcome to Kiki Premium!', 
      description: 'Your account has been upgraded with exclusive benefits',
      read: true, 
      date: '2025-02-20',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki Team'
    },
    { 
      id: 17, 
      message: 'Recommended properties based on your searches', 
      description: '8 new listings match your preferences in Queens',
      read: true, 
      date: '2025-02-18',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    },
    { 
      id: 18, 
      message: 'Booking modification request accepted', 
      description: 'Your dates for Midtown Executive Suite have been changed',
      read: false, 
      date: '2025-02-15',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
      user: 'Host James'
    },
    { 
      id: 19, 
      message: 'New review on your profile', 
      description: 'Host James gave you a 5-star rating!',
      read: true, 
      date: '2025-02-12',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=120&h=120',
      user: 'Sarah'
    },
    { 
      id: 20, 
      message: 'Important update to our COVID-19 policies', 
      description: 'We\'ve updated our cleaning and safety procedures',
      read: false, 
      date: '2025-02-10',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki Team'
    },
    { 
      id: 21, 
      message: 'Weekend flash sale - 25% off', 
      description: 'Book any available property for this weekend at special rates',
      read: true, 
      date: '2025-02-08',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    },
    { 
      id: 22, 
      message: 'Your booking for Hudson River View Apartment is complete', 
      description: 'Check-in details and door codes have been sent to your email',
      read: false, 
      date: '2025-02-05',
      type: 'booking',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&h=120',
      user: 'Host James'
    },
    { 
      id: 23, 
      message: 'Question from potential guest', 
      description: 'Someone is interested in your East Village listing',
      read: true, 
      date: '2025-02-03',
      type: 'message',
      avatar: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=120&h=120',
      user: 'Sarah'
    },
    { 
      id: 24, 
      message: 'Kiki Gift Card received!', 
      description: 'You\'ve received a $200 gift card from Maria',
      read: false, 
      date: '2025-02-01',
      type: 'kiki-team',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120',
      user: 'Alex'
    },
    { 
      id: 25, 
      message: 'Similar property alert', 
      description: 'New listing similar to ones you\'ve viewed in Williamsburg',
      read: true, 
      date: '2025-01-28',
      type: 'general',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120',
      user: 'Kiki'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getTagColor = (type: string) => {
    switch(type) {
      case 'booking':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'kiki-team':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'message':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'general':
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getTagLabel = (type: string) => {
    switch(type) {
      case 'booking':
        return 'Booking';
      case 'kiki-team':
        return 'Kiki Team';
      case 'message':
        return 'New Message';
      case 'general':
      default:
        return 'General';
    }
  };
  
  const filterNotifications = () => {
    let filtered = notifications;
    
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === selectedFilter);
    }
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(notification => 
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const getAvatarFallback = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-primary text-white">{unreadCount} new</Badge>
              )}
            </h1>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications"
                  className="pl-8"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Filter by:</span>
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Notifications</SelectItem>
                    <SelectItem value="booking">Booking Requests</SelectItem>
                    <SelectItem value="kiki-team">Kiki Team</SelectItem>
                    <SelectItem value="message">New Messages</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="flex gap-2 ml-auto">
                  <Button variant="outline" size="sm" onClick={() => setSelectedFilter('all')}>
                    Reset Filters
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {filterNotifications().length > 0 ? (
                filterNotifications().map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <div 
                      className={`p-4 ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex">
                          <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                            <AvatarImage src={notification.avatar} alt={notification.user || 'User'} />
                            <AvatarFallback>{getAvatarFallback(notification.user || 'User')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge size="sm" className={`${getTagColor(notification.type)} border`} variant="outline">
                                {getTagLabel(notification.type)}
                              </Badge>
                            </div>
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <span className="h-2.2 w-2.2 rounded-full bg-primary self-center"></span>
                          )}
                          <div className="text-xs text-muted-foreground">
                            {formatDate(notification.date)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {index < filterNotifications().length - 1 && (
                      <Separator />
                    )}
                  </React.Fragment>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No notifications found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Notifications;
