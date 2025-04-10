import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, Home as HomeIcon, Check, Image } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import HomeListingForm from '@/components/profile/HomeListingForm';
import { DateRange } from "react-day-picker";
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AvailabilityDate {
  id: string;
  startDate: Date;
  endDate: Date;
}

interface HomeListing {
  id: string;
  title: string;
  description: string;
  address: string;
  price: number;
  image: string;
  photos: string[];
  listedDate: Date;
  availabilityDates: AvailabilityDate[];
}

const MyHome = () => {
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  
  const [listings, setListings] = useState<HomeListing[]>([
    {
      id: '1',
      title: 'Modern Manhattan Loft',
      description: 'Beautiful spacious loft in the heart of Manhattan',
      address: '123 Broadway, New York, NY 10001',
      price: 250,
      image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      photos: [
        'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      ],
      listedDate: new Date(2024, 2, 15), // March 15, 2024
      availabilityDates: [
        {
          id: 'a1',
          startDate: new Date(2025, 3, 10),
          endDate: new Date(2025, 3, 20),
        },
        {
          id: 'a2',
          startDate: new Date(2025, 4, 5),
          endDate: new Date(2025, 4, 15),
        }
      ]
    }
  ]);
  
  const handleAddDateRange = () => {
    if (dateRange.from && dateRange.to && listings.length > 0) {
      const updatedListings = [...listings];
      updatedListings[0].availabilityDates.push({
        id: `a${Math.random().toString(36).substr(2, 9)}`,
        startDate: dateRange.from,
        endDate: dateRange.to
      });
      
      setListings(updatedListings);
      setDateRange({ from: undefined, to: undefined });
      setIsDateDialogOpen(false);
      toast.success('Availability dates added successfully');
    } else {
      toast.error('Please select both start and end dates');
    }
  };
  
  const handleRemoveDate = (dateId: string) => {
    const updatedListings = [...listings];
    const listingIndex = 0;
    
    updatedListings[listingIndex].availabilityDates = updatedListings[listingIndex]
      .availabilityDates.filter(date => date.id !== dateId);
      
    setListings(updatedListings);
    toast.success('Availability dates removed');
  };

  const handleListingSubmit = (listingData: any) => {
    const newListing: HomeListing = {
      id: `l${Math.random().toString(36).substr(2, 9)}`,
      title: listingData.title,
      description: listingData.description,
      address: `${listingData.street}, ${listingData.city}, ${listingData.state} ${listingData.zipCode}`,
      price: Number(listingData.price),
      image: 'https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      photos: [],
      listedDate: new Date(),
      availabilityDates: []
    };
    
    setListings([...listings, newListing]);
    setIsListingDialogOpen(false);
    toast.success('Listing added successfully');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-brand">My Home</h1>
              {listings.length > 0 && (
                <div className="text-sm text-muted-foreground mt-1">
                  Listed on {format(listings[0].listedDate, "MMMM d, yyyy")}
                </div>
              )}
            </div>
            {listings.length > 0 && (
              <Button variant="outline" className="border-gray-300">
                Edit Listing
              </Button>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {listings.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <div className="mx-auto bg-brand/10 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
                <HomeIcon size={32} className="text-brand" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Home Listings Yet</h2>
              <p className="text-muted-foreground mb-6">
                Add your first listing to start earning money from your NYC apartment.
              </p>
              <Button onClick={() => setIsListingDialogOpen(true)} className="bg-brand hover:bg-brand/90">
                Add Your Home
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {listings.map(listing => (
              <Card key={listing.id} className="mb-6">
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{listing.title}</CardTitle>
                      <CardDescription className="mt-1">{listing.address}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">${listing.price}</p>
                      <p className="text-sm text-muted-foreground">per night</p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4">
                  <div className="relative mb-4 rounded-lg overflow-hidden">
                    <AspectRatio ratio={16/9} className="bg-gray-100">
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    
                    {listing.photos.length > 0 && (
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white flex items-center gap-1">
                        <Image size={14} />
                        {listing.photos.length} photos
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{listing.description}</p>
                  
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Available Dates</h3>
                      <Button 
                        variant="outline"
                        className="border-brand text-brand hover:bg-brand/10"
                        onClick={() => setIsDateDialogOpen(true)}
                      >
                        <PlusCircle size={16} className="mr-2" />
                        Add Dates
                      </Button>
                    </div>
                    
                    {listing.availabilityDates.length > 0 ? (
                      <div className="space-y-2">
                        {listing.availabilityDates.map(date => (
                          <div 
                            key={date.id} 
                            className="flex justify-between items-center p-3 rounded-lg border hover:bg-gray-50"
                          >
                            <div className="flex items-center">
                              <div className="bg-brand/10 p-2 rounded-full mr-3">
                                <CalendarIcon size={16} className="text-brand" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {format(date.startDate, "MMM d, yyyy")} - {format(date.endDate, "MMM d, yyyy")}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {Math.ceil((date.endDate.getTime() - date.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-500 hover:bg-red-50 hover:text-red-500"
                              onClick={() => handleRemoveDate(date.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No availability dates set</p>
                        <Button 
                          variant="outline" 
                          className="mt-3 border-brand text-brand hover:bg-brand/10"
                          onClick={() => setIsDateDialogOpen(true)}
                        >
                          Add Availability Dates
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card>
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
        )}
      </main>
      
      <Dialog open={isListingDialogOpen} onOpenChange={setIsListingDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Your Home</DialogTitle>
            <DialogDescription>
              Fill out the details about your apartment to start earning money on Kiki.
            </DialogDescription>
          </DialogHeader>
          <HomeListingForm onClose={() => setIsListingDialogOpen(false)} />
        </DialogContent>
      </Dialog>
      
      <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Availability Dates</DialogTitle>
            <DialogDescription>
              Set the dates when your home will be available for booking.
            </DialogDescription>
          </DialogHeader>
          
          <div className="p-4">
            <Calendar
              mode="range"
              defaultMonth={new Date()}
              selected={dateRange}
              onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
              numberOfMonths={2}
              className="rounded-md border shadow-sm"
            />
            
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected Range:</p>
              {dateRange.from ? (
                <Badge variant="outline" className="mr-2 py-1.5">
                  {format(dateRange.from, "MMM d, yyyy")} 
                  {dateRange.to ? ` - ${format(dateRange.to, "MMM d, yyyy")}` : ""}
                </Badge>
              ) : (
                <p className="text-sm text-muted-foreground">No dates selected</p>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDateRange} className="bg-brand hover:bg-brand/90">
              <Check size={16} className="mr-2" />
              Save Dates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyHome;
