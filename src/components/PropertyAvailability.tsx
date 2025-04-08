
import React from 'react';
import { format, parseISO } from 'date-fns';
import { Calendar } from 'lucide-react';
import { AvailabilityWindow } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyAvailabilityProps {
  availabilityWindows?: AvailabilityWindow[];
}

const PropertyAvailability: React.FC<PropertyAvailabilityProps> = ({ availabilityWindows }) => {
  if (!availabilityWindows || availabilityWindows.length === 0) {
    return (
      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-3 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-brand" />
            Availability
          </h3>
          <p className="text-gray-500">No availability information for this property.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-brand" />
          Availability Windows
        </h3>
        <div className="space-y-3">
          {availabilityWindows.map((window) => {
            const startDate = parseISO(window.startDate);
            const endDate = parseISO(window.endDate);
            
            return (
              <div key={window.id} className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium">
                  {format(startDate, 'MMMM do')} - {format(endDate, 'MMMM do, yyyy')}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-gray-500">
          These dates are available for booking. Book early to secure your preferred dates!
        </p>
      </CardContent>
    </Card>
  );
};

export default PropertyAvailability;
