
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Home, CalendarDays, UserCircle, Sparkles, Heart, Settings, HelpCircle, LogOut, Star, MessageCircle } from 'lucide-react';

const NavigationMenu: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  const menuItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Bookings', icon: CalendarDays, path: '/bookings' },
    { name: 'Messages', icon: MessageCircle, path: '/messages' },
    { name: 'Profile', icon: UserCircle, path: '/profile' },
    { name: 'My Home', icon: Sparkles, path: '/my-home' },
    { name: 'Market Analysis', icon: Heart, path: '/market-analysis' },
    { name: 'Rating Experiments', icon: Star, path: '/rating-experiments' },
  ];

  const secondaryMenuItems = [
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'Help', icon: HelpCircle, path: '/help' },
    { name: 'Log Out', icon: LogOut, path: '/logout' },
  ];

  return (
    <div className="p-4 h-full bg-background">
      <Card className="shadow-none">
        <CardContent className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start text-lg font-normal h-12"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t space-y-2">
            {secondaryMenuItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start text-lg font-normal h-12"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationMenu;
