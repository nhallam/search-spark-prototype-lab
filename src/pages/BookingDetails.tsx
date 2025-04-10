import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, HomeIcon, CreditCard, Camera, DollarSign, Calendar, LogOut, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import BookingTimeline, { TimelineEvent } from '@/components/booking/BookingTimeline';

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
    amenities: ['WiFi', 'Kitchen', 'Washer/Dryer', 'Air Conditioning', 'Elevator'],
    houseRules: ['No smoking', 'No pets', 'No parties or events', 'Check-in after 3 PM'],
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
    amenities: ['WiFi', 'Kitchen', 'TV', 'Air Conditioning', 'Heating'],
    houseRules: ['No smoking', 'Pets allowed', 'No parties or events', 'Check-in after 2 PM'],
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
  
  const handleCancelBooking = () => {
    toast.success("Booking cancelled successfully", {
      description: "Your booking has been cancelled."
    });
    
    navigate('/bookings');
  };
  
  const nights = getTotalNights(booking.checkIn, booking.checkOut);
  const totalPrice = booking.price * nights;
  const taxes = Math.round((totalPrice + 95 + 85) * (booking.paymentDetails?.taxRate || 0.08));
  const grandTotal = totalPrice + 95 + 85 + taxes;

  const generateTimelineEvents = () => {
    if (!booking) return [];

    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    
    const agreementDate = booking.agreementDetails?.signedDate 
      ? new Date(booking.agreementDetails.signedDate) 
      : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    
    const depositDueDate = new Date(checkInDate);
    depositDueDate.setDate(checkInDate.getDate() - 14);
    
    const moveInPhotosDate = new Date(checkInDate);
    moveInPhotosDate.setDate(checkInDate.getDate() + 1);
    
    const rentDueDate = new Date(checkInDate);
    rentDueDate.setDate(1);
    
    const moveOutPhotosDate = new Date(checkOutDate);
    
    const depositRefundDate = new Date(checkOutDate);
    depositRefundDate.setDate(checkOutDate.getDate() + 7);
    
    const now = new Date();

    const events: TimelineEvent[] = [
      {
        id: 'agreement',
        title: 'Sublet Agreement',
        date: agreementDate.toISOString(),
        status: booking.agreementDetails?.signed ? 'completed' : 'in-progress',
        description: booking.agreementDetails?.signed 
          ? `The sublet agreement was signed on ${formatDate(booking.agreementDetails.signedDate as string)}.` 
          : 'The sublet agreement needs to be signed by both parties.',
        icon: <FileText className="h-4 w-4" />,
        action: booking.agreementDetails?.signed ? undefined : {
          label: 'View Agreement',
          onClick: () => navigate(`/booking/${id}/agreement`),
          disabled: false
        }
      },
      {
        id: 'deposit',
        title: 'Security Deposit',
        date: depositDueDate.toISOString(),
        status: now > depositDueDate ? 'completed' : 'upcoming',
        description: `Security deposit of $${booking.paymentDetails?.depositAmount} is due by ${formatDate(depositDueDate.toISOString())}. This can be paid via credit card or bank transfer.`,
        icon: <DollarSign className="h-4 w-4" />,
        action: {
          label: 'Pay Deposit',
          onClick: () => navigate(`/booking/${id}/payment`),
          disabled: now > depositDueDate
        }
      },
      {
        id: 'moveInPhotos',
        title: 'Move In Condition Photos',
        date: moveInPhotosDate.toISOString(),
        status: now > moveInPhotosDate ? 'completed' : (now >= checkInDate ? 'in-progress' : 'upcoming'),
        description: 'Take photos of the property condition when you move in. These will be used for comparison when you move out.',
        icon: <Camera className="h-4 w-4" />,
        action: {
          label: 'Upload Photos',
          onClick: () => toast.success("This feature is coming soon!"),
          disabled: now < checkInDate
        }
      },
      {
        id: 'moveIn',
        title: 'Move In',
        date: checkInDate.toISOString(),
        status: now >= checkInDate ? 'completed' : 'upcoming',
        description: `You're scheduled to move in on ${formatDate(checkInDate.toISOString())}. Make sure to coordinate with the host for key handover.`,
        icon: <HomeIcon className="h-4 w-4" />,
        action: undefined
      },
      {
        id: 'rentDue',
        title: 'Rent Due',
        date: rentDueDate.toISOString(),
        status: now > rentDueDate ? 'completed' : 'upcoming',
        description: `Monthly rent of $${booking.price} is due on the ${formatDate(rentDueDate.toISOString())} of each month. Late payments may incur additional fees.`,
        icon: <Calendar className="h-4 w-4" />,
        action: {
          label: 'Pay Rent',
          onClick: () => navigate(`/booking/${id}/payment`),
          disabled: now < rentDueDate
        }
      },
      {
        id: 'moveOut',
        title: 'Move Out',
        date: checkOutDate.toISOString(),
        status: now >= checkOutDate ? 'completed' : 'upcoming',
        description: `Your check-out date is ${formatDate(checkOutDate.toISOString())}. The property should be left in the same condition as when you moved in.`,
        icon: <LogOut className="h-4 w-4" />,
        action: undefined
      },
      {
        id: 'moveOutPhotos',
        title: 'Move Out Condition Photos',
        date: checkOutDate.toISOString(),
        status: now > checkOutDate ? 'completed' : (now >= checkOutDate ? 'in-progress' : 'upcoming'),
        description: 'Take photos of the property condition when you move out. These will be compared with move-in photos.',
        icon: <Camera className="h-4 w-4" />,
        action: {
          label: 'Upload Photos',
          onClick: () => toast.success("This feature is coming soon!"),
          disabled: now < checkOutDate
        }
      },
      {
        id: 'depositRefund',
        title: 'Security Deposit Refund',
        date: depositRefundDate.toISOString(),
        status: now > depositRefundDate ? 'completed' : 'upcoming',
        description: `Your security deposit of $${booking.paymentDetails?.depositAmount} will be refunded within 7 days after checkout, assuming no damages or outstanding charges.`,
        icon: <RotateCcw className="h-4 w-4" />,
        action: undefined
      }
    ];

    return events;
  };

  const timelineEvents = generateTimelineEvents();

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
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-6">
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
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${taxes}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${grandTotal}</span>
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
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" className="w-full text-red-500 border-red-500 hover:bg-red-50">
                            Cancel Booking
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Cancel your booking?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently cancel your reservation
                              at {booking.property} and you may be subject to cancellation fees according
                              to the host's cancellation policy.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Keep Reservation</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleCancelBooking}
                              className="bg-red-500 hover:bg-red-600"
                            >
                              Yes, Cancel Booking
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
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
          
          <div className="mb-6">
            <BookingTimeline events={timelineEvents} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/booking/${id}/agreement`)}
            >
              <CardHeader className="flex flex-row items-center pb-2">
                <FileText className="h-5 w-5 mr-2 text-brand" />
                <CardTitle className="text-lg">Sublet Agreement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">View and manage your sublet agreement details</p>
                <p className="text-sm font-medium mt-2">
                  {booking.agreementDetails?.signed ? (
                    <span className="text-green-600">Signed</span>
                  ) : (
                    <span className="text-amber-600">Pending signature</span>
                  )}
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/booking/${id}/listing`)}
            >
              <CardHeader className="flex flex-row items-center pb-2">
                <HomeIcon className="h-5 w-5 mr-2 text-brand" />
                <CardTitle className="text-lg">Listing Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">View amenities, house rules, and property information</p>
                <p className="text-sm font-medium mt-2">
                  {booking.amenities?.length || 0} amenities • {booking.houseRules?.length || 0} house rules
                </p>
              </CardContent>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate(`/booking/${id}/payment`)}
            >
              <CardHeader className="flex flex-row items-center pb-2">
                <CreditCard className="h-5 w-5 mr-2 text-brand" />
                <CardTitle className="text-lg">Payment Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">View payment history, receipts and manage payment methods</p>
                <p className="text-sm font-medium mt-2">
                  {booking.paymentDetails?.paymentStatus === 'Paid in full' ? (
                    <span className="text-green-600">Paid in full</span>
                  ) : booking.paymentDetails?.paymentStatus === 'Refunded' ? (
                    <span className="text-amber-600">Refunded</span>
                  ) : (
                    <span className="text-gray-600">Payment pending</span>
                  )}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingDetails;
