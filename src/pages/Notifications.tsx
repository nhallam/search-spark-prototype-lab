
import React, { useState } from 'react';
import { Bell, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const Notifications = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock notifications data - in a real app, this would come from an API
  const notifications = [
    { 
      id: 1, 
      message: 'Your booking for Manhattan Loft was confirmed', 
      description: 'Your stay is scheduled for May 15-20, 2025',
      read: false, 
      date: '2025-04-01',
      type: 'booking'
    },
    { 
      id: 2, 
      message: 'New property listings in your favorite areas', 
      description: '5 new properties in Manhattan match your preferences',
      read: true, 
      date: '2025-03-28',
      type: 'recommendation'
    },
    { 
      id: 3, 
      message: 'Limited time offer: 15% off for summer bookings', 
      description: 'Use code SUMMER25 at checkout before April 30',
      read: false, 
      date: '2025-03-25',
      type: 'promotion'
    },
    { 
      id: 4, 
      message: 'Review request for Brooklyn Heights Apartment', 
      description: 'Share your experience to help other travelers',
      read: true, 
      date: '2025-03-20',
      type: 'review'
    },
    { 
      id: 5, 
      message: 'Your booking request for Chelsea Studio was received', 
      description: 'The host will respond within 24 hours',
      read: true, 
      date: '2025-03-15',
      type: 'booking'
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  const filterNotifications = () => {
    if (!searchQuery.trim()) return notifications;
    
    return notifications.filter(notification => 
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;
  
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
            <div className="relative">
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
            <div className="space-y-1">
              {filterNotifications().length > 0 ? (
                filterNotifications().map((notification, index) => (
                  <React.Fragment key={notification.id}>
                    <div 
                      className={`p-4 rounded-lg ${!notification.read ? 'bg-primary/5 border-l-4 border-primary' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(notification.date)}
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
