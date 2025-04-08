
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock booking data - in a real app, this would come from an API based on the ID
const mockBookings = [
  { 
    id: "1", 
    property: 'Manhattan Loft',
    address: '123 Park Avenue, New York',
    checkIn: '2025-05-15', 
    checkOut: '2025-05-20',
    guests: 2,
    status: 'confirmed',
    price: 1250,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    host: 'Jane Smith',
    hostImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    description: 'Beautiful loft apartment with panoramic views of the Manhattan skyline. Features high ceilings, modern decor, and a fully equipped kitchen.',
  },
  { 
    id: "2", 
    property: 'Brooklyn Heights Apartment',
    address: '45 Heights Street, Brooklyn', 
    checkIn: '2025-06-22', 
    checkOut: '2025-06-28',
    guests: 3,
    status: 'pending',
    price: 980,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    host: 'Michael Johnson',
    hostImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80',
    description: 'Charming Brooklyn Heights apartment close to the Promenade with beautiful views of Manhattan. Features hardwood floors, exposed brick, and modern amenities.',
  },
  { 
    id: "3", 
    property: 'Chelsea Studio',
    address: '78 West 23rd St, New York', 
    checkIn: '2025-07-10', 
    checkOut: '2025-07-15',
    guests: 1,
    status: 'cancelled',
    price: 850,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80',
    host: 'Sarah Williams',
    hostImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80',
    description: 'Modern studio apartment in the heart of Chelsea. Walking distance to the High Line, Chelsea Market, and many art galleries.',
  },
];

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const booking = mockBookings.find(booking => booking.id === id);
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/bookings')}
          className="mb-4 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Bookings
        </Button>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">Booking Not Found</h2>
          <p className="mt-2 text-gray-500">The booking you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-amber-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getTotalNights = (checkIn: string, checkOut: string) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
  };
  
  const nights = getTotalNights(booking.checkIn, booking.checkOut);
  const totalPrice = booking.price * nights;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/bookings')}
            className="pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Bookings
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left column - Property image and details */}
          <div className="w-full md:w-2/3">
            <Card>
              <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
                <img 
                  src={booking.image} 
                  alt={booking.property}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant="outline" 
                    className={`${getStatusColor(booking.status)} bg-opacity-20 border-opacity-20 border-current px-3 py-1 text-white capitalize`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl md:text-2xl">{booking.property}</CardTitle>
                <p className="text-gray-500">{booking.address}</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Check-in</p>
                    <p className="font-medium">{formatDate(booking.checkIn)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Check-out</p>
                    <p className="font-medium">{formatDate(booking.checkOut)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-medium">{booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Length of stay</p>
                    <p className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-2">Property Description</h3>
                  <p className="text-gray-600">{booking.description}</p>
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={booking.hostImage} 
                      alt={booking.host}
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Hosted by</p>
                    <p className="font-medium">{booking.host}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Price breakdown */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>${booking.price} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                    <span>${booking.price * nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$95</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$85</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalPrice + 95 + 85}</span>
                    </div>
                  </div>
                </div>
                
                {booking.status === 'pending' && (
                  <div className="mt-6 space-y-3">
                    <Button className="w-full">Accept Booking</Button>
                    <Button variant="outline" className="w-full">Decline</Button>
                  </div>
                )}
                
                {booking.status === 'confirmed' && (
                  <div className="mt-6">
                    <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50">
                      Cancel Booking
                    </Button>
                  </div>
                )}
                
                {booking.status === 'cancelled' && (
                  <div className="mt-6 p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-600 text-sm">This booking has been cancelled.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetails;
