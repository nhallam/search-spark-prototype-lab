
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, BookmarkIcon, ArrowLeft } from 'lucide-react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import { Link } from 'react-router-dom';

const ProfileSavedListings = () => {
  const savedListings = [
    {
      id: 1,
      title: 'Modern Studio in Chelsea',
      location: 'Chelsea, New York',
      price: 180,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=300'
    },
    {
      id: 2,
      title: 'Cozy Apartment in SoHo',
      location: 'SoHo, New York',
      price: 210,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300'
    },
    {
      id: 3,
      title: 'Luxury Loft in Tribeca',
      location: 'Tribeca, New York',
      price: 250,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link to="/profile">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold">Saved Listings</h1>
          </div>
          <p className="text-muted-foreground ml-10">View and manage your saved properties</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedListings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden">
              <div className="relative h-40">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white text-primary"
                >
                  <BookmarkIcon size={18} fill="currentColor" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{listing.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin size={14} className="mr-1" />
                      {listing.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${listing.price}</div>
                    <div className="text-xs text-muted-foreground">per night</div>
                  </div>
                </div>
                <div className="flex items-center mt-2 text-sm">
                  <Star size={14} className="text-amber-500 mr-1" />
                  <span className="font-medium">4.9</span>
                  <span className="text-muted-foreground ml-1">(128 reviews)</span>
                </div>
              </CardContent>
              <CardFooter className="border-t px-4 py-3 flex justify-between">
                <Button variant="outline" size="sm">View Details</Button>
                <Button size="sm">Book Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProfileSavedListings;
