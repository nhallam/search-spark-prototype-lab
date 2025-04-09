
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Home as HomeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import EarningsHistory from '@/components/profile/EarningsHistory';

const YourHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand">Your Home</h1>
            <Button 
              variant="outline" 
              className="border-brand text-brand hover:bg-brand/10"
              asChild
            >
              <Link to="/my-home">Manage Listings</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-lg">
                <span>Your NYC Property</span>
                <Building size={20} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-brand/5 p-4 rounded-lg mb-4 border border-brand/10">
                <p className="text-sm text-muted-foreground mb-2">Your Property Status</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p className="font-medium">Currently Listed</p>
                </div>
                <p className="text-xs text-muted-foreground">Last updated: April 1, 2025</p>
              </div>
              
              <div className="p-4 border rounded-lg mb-4">
                <h3 className="font-medium mb-2">Manhattan Loft</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  123 Broadway, New York, NY 10001
                </p>
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-sm">
                    <span>Daily Rate:</span>
                    <span className="font-medium">$250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available Dates:</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Upcoming Bookings:</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-brand hover:bg-brand/90 mb-2"
                asChild
              >
                <Link to="/my-home">Manage Listing</Link>
              </Button>
              
              <Button 
                variant="outline"
                className="w-full border-brand text-brand hover:bg-brand/10"
              >
                View Calendar
              </Button>
            </CardContent>
          </Card>
          
          <div className="md:col-span-2">
            <EarningsHistory />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HomeIcon size={20} />
                  Hosting Tips
                </CardTitle>
                <CardDescription>Make the most of your NYC property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-brand/5 rounded-lg border border-brand/10">
                    <h3 className="font-medium mb-1">Seasonal Pricing</h3>
                    <p className="text-sm text-muted-foreground">
                      New York City sees higher tourist traffic during summer and winter holidays. 
                      Consider adjusting your pricing to maximize earnings during these peak seasons.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-brand/5 rounded-lg border border-brand/10">
                    <h3 className="font-medium mb-1">Add Local Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      Guests love personalized recommendations from locals. Add your favorite restaurants, 
                      coffee shops, and hidden gems to your listing description.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-brand/5 rounded-lg border border-brand/10">
                    <h3 className="font-medium mb-1">Quality Photos</h3>
                    <p className="text-sm text-muted-foreground">
                      Listings with professional photos receive 25% more bookings. Consider upgrading
                      your listing photos to showcase your space in the best light.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default YourHome;
