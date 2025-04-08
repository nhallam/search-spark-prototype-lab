
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Home, User, Compass, Bell, Camera } from 'lucide-react';

const NavigationMenu: React.FC = () => {
  const navigate = useNavigate();

  const navigationOptions = [
    {
      title: 'Explore',
      description: 'Browse available properties and listings',
      icon: <Compass className="h-5 w-5" />,
      path: '/'
    },
    {
      title: 'Profile',
      description: 'View and edit your profile',
      icon: <User className="h-5 w-5" />,
      path: '/profile'
    },
    {
      title: 'Photo App',
      description: 'Access the creative photo application',
      icon: <Camera className="h-5 w-5" />,
      path: '/photos'
    },
    {
      title: 'Notifications',
      description: 'Check your latest updates and messages',
      icon: <Bell className="h-5 w-5" />,
      path: '/notifications'
    },
    {
      title: 'Bookings',
      description: 'Manage your current and upcoming bookings',
      icon: <Home className="h-5 w-5" />,
      path: '/bookings'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Kiki</CardTitle>
          <CardDescription className="text-lg">
            Choose where you'd like to go
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {navigationOptions.map((option, index) => (
              <Button
                key={index}
                onClick={() => navigate(option.path)}
                className="w-full flex justify-start items-center text-left h-16 bg-white hover:bg-gray-50 text-black border"
                variant="outline"
              >
                <div className="bg-primary/10 p-2 rounded-full mr-4">
                  {option.icon}
                </div>
                <div>
                  <div className="font-medium">{option.title}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationMenu;
