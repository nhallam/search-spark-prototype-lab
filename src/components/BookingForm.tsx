
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Property } from './PropertyCard';

interface BookingFormProps {
  property: Property;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [guests, setGuests] = useState(1);

  const calculateTotalPrice = () => {
    if (!checkIn || !checkOut) return 0;
    
    const nights = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    return property.price * nights;
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    
    if (checkIn >= checkOut) {
      toast.error("Check-out date must be after check-in date");
      return;
    }

    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = property.price * nights;

    toast.success(`Booking successful!`, {
      description: `${nights} night${nights > 1 ? 's' : ''} for $${totalPrice}. Confirmation sent to your email.`,
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-bold">${property.price}</span>
          <span className="text-gray-500"> / night</span>
        </div>
        <div className="flex items-center">
          <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400 mr-1" />
          <span className="font-medium">{property.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Check-in</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkIn && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkIn ? format(checkIn, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkIn}
                  onSelect={setCheckIn}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Check-out</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !checkOut && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {checkOut ? format(checkOut, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={checkOut}
                  onSelect={setCheckOut}
                  initialFocus
                  disabled={(date) => !checkIn || date <= checkIn}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Guests</label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value))}
          >
            {[...Array(property.guests || 4)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} guest{i !== 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <Button 
          className="w-full bg-brand hover:bg-brand/90 text-white" 
          disabled={!property.available}
          onClick={handleBooking}
        >
          {property.available ? 'Book now' : 'Not available'}
        </Button>

        {(checkIn && checkOut) && (
          <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
            <div className="flex justify-between">
              <span>${property.price} × {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
              <span>${calculateTotalPrice()}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${calculateTotalPrice()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
