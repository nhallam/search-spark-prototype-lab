
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Download, Calendar, Receipt, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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
    amenities: ['WiFi', 'Kitchen', 'Washer/Dryer', 'Air Conditioning', 'Elevator'],
    houseRules: ['No smoking', 'No pets', 'No parties or events', 'Check-in after 3 PM'],
    paymentDetails: {
      baseRate: 1250,
      cleaningFee: 95,
      serviceFee: 85,
      taxRate: 0.08,
      depositAmount: 500,
      paymentMethod: 'Credit Card ending in 4242',
      paymentStatus: 'Paid in full',
      paymentHistory: [
        {
          id: 'PAY-2025-001',
          date: '2025-03-15',
          amount: 2036.20,
          type: 'Charge',
          status: 'Completed',
          description: 'Full payment for booking'
        },
        {
          id: 'DEP-2025-001',
          date: '2025-03-15',
          amount: 500,
          type: 'Security Deposit',
          status: 'Held',
          description: 'Security deposit (refundable)'
        }
      ],
      billingAddress: {
        name: 'John Doe',
        address: '789 Broadway, Apt 5B',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        country: 'United States'
      },
      receiptUrl: '#'
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
      paymentStatus: 'Awaiting payment',
      paymentDue: '2025-05-22',
      paymentHistory: [],
      billingAddress: {
        name: 'John Doe',
        address: '789 Broadway, Apt 5B',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        country: 'United States'
      }
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
      paymentStatus: 'Refunded',
      paymentHistory: [
        {
          id: 'PAY-2025-101',
          date: '2025-05-10',
          amount: 1393.20,
          type: 'Charge',
          status: 'Completed',
          description: 'Full payment for booking'
        },
        {
          id: 'DEP-2025-101',
          date: '2025-05-10',
          amount: 300,
          type: 'Security Deposit',
          status: 'Held',
          description: 'Security deposit (refundable)'
        },
        {
          id: 'REF-2025-101',
          date: '2025-06-01',
          amount: -1393.20,
          type: 'Refund',
          status: 'Completed',
          description: 'Booking cancellation refund'
        },
        {
          id: 'DEP-REF-2025-101',
          date: '2025-06-01',
          amount: -300,
          type: 'Deposit Refund',
          status: 'Completed',
          description: 'Security deposit refund'
        }
      ],
      billingAddress: {
        name: 'John Doe',
        address: '789 Broadway, Apt 5B',
        city: 'New York',
        state: 'NY',
        zipCode: '10003',
        country: 'United States'
      },
      receiptUrl: '#',
      cancellationFee: 0
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

const BookingPayment = () => {
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
          <h2 className="text-2xl font-semibold text-gray-700">Payment Details Not Found</h2>
          <p className="mt-2 text-gray-500">The payment details you're looking for don't exist or have been removed.</p>
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
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
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
  const taxes = Math.round((totalPrice + (booking.paymentDetails?.cleaningFee || 0) + (booking.paymentDetails?.serviceFee || 0)) * (booking.paymentDetails?.taxRate || 0.08));
  const grandTotal = totalPrice + (booking.paymentDetails?.cleaningFee || 0) + (booking.paymentDetails?.serviceFee || 0) + taxes;
  
  const handleCompletePayment = () => {
    toast.success("Payment completed successfully", {
      description: "Your payment has been processed."
    });
    
    navigate(`/booking/${id}`);
  };
  
  const handleDownloadReceipt = () => {
    toast.success("Receipt downloading", {
      description: "Your receipt is being downloaded."
    });
  };

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
              <CreditCard className="mr-2 h-6 w-6 text-brand" />
              Payment Details
            </h1>
            <p className="text-gray-500 mt-1">{booking.property} • {booking.address}</p>
          </div>
          
          {/* Payment Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Stay Period: {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</span>
                </div>
                <span className="font-medium">{nights} {nights === 1 ? 'night' : 'nights'}</span>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>{formatCurrency(booking.price)} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                  <span>{formatCurrency(booking.price * nights)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>{formatCurrency(booking.paymentDetails?.cleaningFee || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>{formatCurrency(booking.paymentDetails?.serviceFee || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes ({(booking.paymentDetails?.taxRate || 0.08) * 100}%)</span>
                  <span>{formatCurrency(taxes)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(grandTotal)}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Security Deposit (Refundable)</p>
                  <p className="font-medium">{formatCurrency(booking.paymentDetails?.depositAmount || 0)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Payment Status</p>
                  <p className={`font-medium ${
                    booking.paymentDetails?.paymentStatus === 'Paid in full' 
                      ? 'text-green-600' 
                      : booking.paymentDetails?.paymentStatus === 'Refunded' 
                        ? 'text-amber-600' 
                        : 'text-gray-600'
                  }`}>
                    {booking.paymentDetails?.paymentStatus || 'Unknown'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              {booking.paymentDetails?.paymentMethod === 'Pending' ? (
                <div className="flex flex-col space-y-4">
                  <p className="text-amber-600">No payment method on file</p>
                  <p className="text-sm text-gray-500">
                    Payment due by: {booking.paymentDetails?.paymentDue ? formatDate(booking.paymentDetails.paymentDue) : 'N/A'}
                  </p>
                  <Button 
                    className="w-full md:w-auto mt-2" 
                    onClick={handleCompletePayment}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Complete Payment
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="font-medium">{booking.paymentDetails?.paymentMethod || 'N/A'}</span>
                  </div>
                  
                  {booking.paymentDetails?.billingAddress && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-1">Billing Address</p>
                      <p>{booking.paymentDetails.billingAddress.name}</p>
                      <p>{booking.paymentDetails.billingAddress.address}</p>
                      <p>{booking.paymentDetails.billingAddress.city}, {booking.paymentDetails.billingAddress.state} {booking.paymentDetails.billingAddress.zipCode}</p>
                      <p>{booking.paymentDetails.billingAddress.country}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Payment History */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {booking.paymentDetails?.paymentHistory && booking.paymentDetails.paymentHistory.length > 0 ? (
                <div className="space-y-4">
                  {booking.paymentDetails.paymentHistory.map((transaction, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-gray-500">{transaction.description}</p>
                        <p className="text-xs text-gray-500">Transaction ID: {transaction.id}</p>
                      </div>
                      <div className="md:text-right mt-2 md:mt-0">
                        <p className={`font-semibold ${transaction.type.includes('Refund') ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-sm">{formatDate(transaction.date)}</p>
                        <p className="text-xs">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No payment history available</p>
              )}
              
              {booking.paymentDetails?.paymentStatus === 'Paid in full' && (
                <Button 
                  variant="outline" 
                  className="mt-6"
                  onClick={handleDownloadReceipt}
                >
                  <Receipt className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
              )}
            </CardContent>
          </Card>
          
          {/* Cancellation Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{booking.agreementDetails?.cancellationPolicy || 'Standard policy applies'}</p>
              
              {booking.status === 'cancelled' && booking.paymentDetails?.cancellationFee !== undefined && (
                <div className="bg-red-50 border border-red-100 rounded-md p-4">
                  <h3 className="text-red-600 font-medium mb-2">Cancellation Details</h3>
                  <p className="text-gray-700">
                    This booking was cancelled. 
                    {booking.paymentDetails.cancellationFee > 0 
                      ? ` A cancellation fee of ${formatCurrency(booking.paymentDetails.cancellationFee)} was applied.`
                      : ' No cancellation fee was applied.'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default BookingPayment;
