
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, HomeIcon, Star, Users, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Using the same mock data from BookingDetails
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
    amenities: ['WiFi', 'Kitchen', 'Washer/Dryer', 'Air Conditioning', 'Elevator', 'Smart TV', 'Dedicated Workspace', 'Hair Dryer', 'Iron', 'Heating', 'Coffee Maker', 'Dishes and Silverware'],
    houseRules: ['No smoking', 'No pets', 'No parties or events', 'Check-in after 3 PM', 'Checkout by 11 AM', 'Quiet hours from 10 PM to 8 AM', 'No shoes inside'],
    propertyType: 'Loft',
    bedrooms: 1,
    beds: 2,
    bathrooms: 1,
    sqft: 850,
    floor: 15,
    buildingAmenities: ['Doorman', '24/7 Security', 'Gym', 'Rooftop Deck'],
    neighborhood: 'Midtown Manhattan',
    nearbyAttractions: ['Times Square (0.8 miles)', 'Central Park (1.2 miles)', 'Empire State Building (0.5 miles)', 'Broadway Theaters (0.7 miles)'],
    transportOptions: ['Grand Central Station (0.3 miles)', 'Penn Station (0.7 miles)', 'Subway Line 4, 5, 6 (0.2 miles)'],
    rating: 4.9,
    reviewCount: 87,
    paymentDetails: {
      baseRate: 1250,
      cleaningFee: 95,
      serviceFee: 85,
      taxRate: 0.08,
      depositAmount: 500,
      paymentMethod: 'Credit Card ending in 4242',
      paymentStatus: 'Paid in full'
    },
    agreementDetails: {
      agreementId: 'SA-2025-1234',
      signed: true,
      signedDate: '2025-04-01',
      cancellationPolicy: 'Moderate: Full refund 5 days prior to arrival',
      termsAccepted: true
    }
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
    amenities: ['WiFi', 'Kitchen', 'TV', 'Air Conditioning', 'Heating', 'Backyard', 'BBQ Grill', 'Patio', 'Free Street Parking'],
    houseRules: ['No smoking', 'Pets allowed', 'No parties or events', 'Check-in after 2 PM'],
    propertyType: 'Apartment',
    bedrooms: 2,
    beds: 3,
    bathrooms: 1,
    sqft: 950,
    floor: 2,
    buildingAmenities: ['Laundry in Building', 'Garden Access'],
    neighborhood: 'Brooklyn Heights',
    nearbyAttractions: ['Brooklyn Promenade (0.2 miles)', 'Brooklyn Bridge (0.7 miles)', 'Dumbo (1.0 miles)'],
    transportOptions: ['Clark St. Subway Station (0.2 miles)', 'High St. Subway Station (0.4 miles)'],
    rating: 4.7,
    reviewCount: 63,
    paymentDetails: {
      baseRate: 980,
      cleaningFee: 75,
      serviceFee: 70,
      taxRate: 0.08,
      depositAmount: 400,
      paymentMethod: 'Pending',
      paymentStatus: 'Awaiting payment'
    },
    agreementDetails: {
      agreementId: 'SA-2025-2345',
      signed: false,
      signedDate: null,
      cancellationPolicy: 'Flexible: Full refund 1 day prior to arrival',
      termsAccepted: false
    }
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
    amenities: ['WiFi', 'Kitchen', 'TV', 'Air Conditioning'],
    houseRules: ['No smoking', 'No pets', 'No parties or events'],
    propertyType: 'Studio',
    bedrooms: 0,
    beds: 1,
    bathrooms: 1,
    sqft: 450,
    floor: 3,
    buildingAmenities: ['Elevator', 'Laundry in Building'],
    neighborhood: 'Chelsea',
    nearbyAttractions: ['High Line (0.2 miles)', 'Chelsea Market (0.3 miles)', 'Madison Square Garden (0.7 miles)'],
    transportOptions: ['23rd St. Subway Station (0.1 miles)', 'Penn Station (0.8 miles)'],
    rating: 4.5,
    reviewCount: 42,
    paymentDetails: {
      baseRate: 850,
      cleaningFee: 65,
      serviceFee: 60,
      taxRate: 0.08,
      depositAmount: 300,
      paymentMethod: 'Credit Card ending in 5678',
      paymentStatus: 'Refunded'
    },
    agreementDetails: {
      agreementId: 'SA-2025-3456',
      signed: true,
      signedDate: '2025-05-15',
      cancellationPolicy: 'Strict: 50% refund up until 1 week prior to arrival',
      termsAccepted: true
    }
  }
];

const BookingListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const booking = mockBookings.find(booking => booking.id === id);
  
  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(`/booking/${id}`)}
          className="mb-4 pl-0 hover:bg-transparent"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Booking
        </Button>
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-700">Listing Not Found</h2>
          <p className="mt-2 text-gray-500">The listing details you're looking for don't exist or have been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(`/booking/${id}`)}
            className="pl-0 hover:bg-transparent"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Booking
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <HomeIcon className="mr-2 h-6 w-6 text-brand" />
              Listing Details
            </h1>
            <p className="text-gray-500 mt-1">{booking.property} • {booking.address}</p>
          </div>
          
          {/* Property Overview */}
          <Card className="mb-6">
            <div className="relative w-full h-64 rounded-t-lg overflow-hidden">
              <img 
                src={booking.image} 
                alt={booking.property}
                className="w-full h-full object-cover"
              />
              {booking.rating && (
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-white text-black font-medium px-3 py-1 flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-brand text-brand" /> 
                    {booking.rating} ({booking.reviewCount} reviews)
                  </Badge>
                </div>
              )}
            </div>
            
            <CardHeader>
              <CardTitle className="text-xl">{booking.propertyType || 'Property'} in {booking.neighborhood || 'the area'}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">BEDROOMS</p>
                  <p className="font-medium mt-1">{booking.bedrooms || 0}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">BEDS</p>
                  <p className="font-medium mt-1">{booking.beds || 0}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">BATHROOMS</p>
                  <p className="font-medium mt-1">{booking.bathrooms || 0}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-xs text-gray-500">SQUARE FEET</p>
                  <p className="font-medium mt-1">{booking.sqft || 'N/A'}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">About this space</h3>
                <p className="text-gray-600">{booking.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Building Amenities</h3>
                {booking.buildingAmenities && booking.buildingAmenities.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {booking.buildingAmenities.map((amenity, index) => (
                      <Badge key={index} variant="outline" className="bg-brand/10 text-brand border-brand/20">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No building amenities listed</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Amenities */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {booking.amenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-brand rounded-full mr-2"></span>
                    {amenity}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* House Rules */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">House Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center mb-4">
                  <Calendar className="text-gray-500 mr-2 h-5 w-5" />
                  <div>
                    <p className="text-sm">Check-in: After {booking.houseRules?.find(rule => rule.includes('Check-in'))?.split('Check-in after ')[1] || '3 PM'}</p>
                    <p className="text-sm">Checkout: Before {booking.houseRules?.find(rule => rule.includes('Checkout'))?.split('Checkout by ')[1] || '11 AM'}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Users className="text-gray-500 mr-2 h-5 w-5" />
                  <p className="text-sm">Maximum {booking.guests} guests</p>
                </div>
                
                <Separator className="my-4" />
                
                <ul className="space-y-2">
                  {booking.houseRules?.filter(rule => !rule.includes('Check-in') && !rule.includes('Checkout')).map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-brand rounded-full mr-2 mt-2"></span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
          
          {/* Location & Nearby */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Location & Nearby</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Neighborhood</h3>
                <p className="text-gray-600">{booking.neighborhood || 'Information not available'}</p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Nearby Attractions</h3>
                {booking.nearbyAttractions && booking.nearbyAttractions.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {booking.nearbyAttractions.map((attraction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-brand rounded-full mr-2 mt-2"></span>
                        {attraction}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No nearby attractions listed</p>
                )}
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-2">Transportation Options</h3>
                {booking.transportOptions && booking.transportOptions.length > 0 ? (
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {booking.transportOptions.map((option, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-brand rounded-full mr-2 mt-2"></span>
                        {option}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No transportation options listed</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookingListing;
