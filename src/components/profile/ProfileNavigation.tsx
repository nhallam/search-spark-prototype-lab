
import React from 'react';
import { Users, BarChart2, Building, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const ProfileNavigation = () => {
  const sections: Section[] = [
    { id: 'kiki-circles', label: 'Kiki Circles', icon: <Users className="h-4 w-4" /> },
    { id: 'earnings', label: 'Rent Saved', icon: <BarChart2 className="h-4 w-4" /> },
    { id: 'list-home', label: 'List Your Home', icon: <Building className="h-4 w-4" /> },
    { id: 'faq', label: 'FAQ', icon: <List className="h-4 w-4" /> },
    { id: 'market', label: 'Market Analysis', icon: <BarChart2 className="h-4 w-4" /> }
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white border-b py-2 sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList className="flex-wrap justify-start">
            {sections.map((section) => (
              <NavigationMenuItem key={section.id}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm flex items-center gap-1"
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.icon}
                  {section.label}
                </Button>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default ProfileNavigation;
