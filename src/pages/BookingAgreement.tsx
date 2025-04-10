
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Download, Check } from 'lucide-react';
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
      paymentStatus: 'Paid in full'
    },
    agreementDetails: {
      agreementId: 'SA-2025-1234',
      signed: true,
      signedDate: '2025-04-01',
      cancellationPolicy: 'Moderate: Full refund 5 days prior to arrival',
      termsAccepted: true,
      additionalTerms: [
        'The guest agrees to follow all house rules as specified by the host.',
        'Any damage to the property must be reported immediately to the host.',
        'Quiet hours are from 10 PM to 8 AM.',
        'The security deposit will be refunded within 7 days after checkout if no damage is found.',
        'The guest is responsible for their personal belongings during the stay.'
      ]
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
      termsAccepted: false,
      additionalTerms: [
        'The guest agrees to follow all house rules as specified by the host.',
        'Any damage to the property must be reported immediately to the host.',
        'Quiet hours are from 11 PM to 7 AM.',
        'The security deposit will be refunded within 7 days after checkout if no damage is found.',
        'The guest is responsible for their personal belongings during the stay.'
      ]
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
      termsAccepted: true,
      additionalTerms: [
        'The guest agrees to follow all house rules as specified by the host.',
        'Any damage to the property must be reported immediately to the host.',
        'Quiet hours are from 10 PM to 7 AM.',
        'The security deposit will be refunded within 7 days after checkout if no damage is found.',
        'The guest is responsible for their personal belongings during the stay.',
        'Pets are not allowed in this property.'
      ]
    }
  }
];

const BookingAgreement = () => {
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
          <h2 className="text-2xl font-semibold text-gray-700">Agreement Not Found</h2>
          <p className="mt-2 text-gray-500">The agreement you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not signed';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleSignAgreement = () => {
    toast.success("Agreement signed successfully", {
      description: "Your agreement has been signed and stored."
    });
  };
  
  const handleDownloadAgreement = () => {
    toast.success("Agreement downloading", {
      description: "Your agreement is being downloaded."
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
              <FileText className="mr-2 h-6 w-6 text-brand" />
              Sublet Agreement
            </h1>
            <p className="text-gray-500 mt-1">{booking.property} • {booking.address}</p>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Agreement Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Agreement ID</p>
                  <p className="font-medium">{booking.agreementDetails?.agreementId || 'Not available'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium">
                    {booking.agreementDetails?.signed ? (
                      <span className="text-green-600 flex items-center">
                        <Check className="h-4 w-4 mr-1" /> Signed on {formatDate(booking.agreementDetails.signedDate)}
                      </span>
                    ) : (
                      <span className="text-amber-600">Pending signature</span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Stay Period</p>
                  <p className="font-medium">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Security Deposit</p>
                  <p className="font-medium">${booking.paymentDetails?.depositAmount || 'N/A'}</p>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Cancellation Policy</p>
                <p className="font-medium">{booking.agreementDetails?.cancellationPolicy || 'Standard policy applies'}</p>
              </div>
              
              {booking.agreementDetails?.additionalTerms && (
                <>
                  <Separator />
                  
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Additional Terms</p>
                    <ul className="space-y-2">
                      {booking.agreementDetails.additionalTerms.map((term, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-brand rounded-full mr-2 mt-2"></span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
              
              <div className="pt-4 flex flex-col md:flex-row gap-4">
                {!booking.agreementDetails?.signed && booking.status !== 'cancelled' && (
                  <Button className="flex items-center" onClick={handleSignAgreement}>
                    <FileText className="mr-2 h-4 w-4" />
                    Sign Agreement
                  </Button>
                )}
                
                <Button variant="outline" className="flex items-center" onClick={handleDownloadAgreement}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Agreement
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Legal disclaimer */}
          <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Legal Disclaimer</p>
            <p>This agreement constitutes a legally binding contract between the guest and host. 
            By signing this agreement, you acknowledge that you have read and understood all terms and conditions. 
            For any questions or concerns about this agreement, please contact our legal department at legal@kiki.com.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingAgreement;
