
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Bookings = () => {
  const navigate = useNavigate();
  
  // Mock booking data - in a real app, this would come from an API
  const bookings = [
    { 
      id: 1, 
      property: 'Manhattan Loft',
      address: '123 Park Avenue, New York',
      checkIn: '2025-05-15', 
      checkOut: '2025-05-20',
      guests: 2,
      status: 'confirmed',
      price: 1250,
    },
    { 
      id: 2, 
      property: 'Brooklyn Heights Apartment',
      address: '45 Heights Street, Brooklyn', 
      checkIn: '2025-06-22', 
      checkOut: '2025-06-28',
      guests: 3,
      status: 'pending',
      price: 980,
    },
    { 
      id: 3, 
      property: 'Chelsea Studio',
      address: '78 West 23rd St, New York', 
      checkIn: '2025-07-10', 
      checkOut: '2025-07-15',
      guests: 1,
      status: 'cancelled',
      price: 850,
    },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-amber-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const handleRowClick = (bookingId: number) => {
    navigate(`/booking/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-brand flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              My Bookings
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Booking Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>A list of your recent booking requests</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Dates</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow 
                    key={booking.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleRowClick(booking.id)}
                  >
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{booking.property}</p>
                        <p className="text-xs text-gray-500">{booking.address}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                    </TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>${booking.price}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(booking.status)} bg-opacity-10 border-opacity-30 border-current text-current capitalize`}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Bookings;
