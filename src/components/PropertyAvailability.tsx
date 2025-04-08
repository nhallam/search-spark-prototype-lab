
import React from 'react';
import { format, parseISO, differenceInDays, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';
import { AvailabilityWindow } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyAvailabilityProps {
  availabilityWindows?: AvailabilityWindow[];
  requestedDateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const PropertyAvailability: React.FC<PropertyAvailabilityProps> = ({ 
  availabilityWindows,
  requestedDateRange 
}) => {
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

  // Calculate coverage for requested date range if provided
  let coveragePercentage = 0;
  
  if (requestedDateRange?.from && requestedDateRange?.to) {
    const requestStart = requestedDateRange.from;
    const requestEnd = requestedDateRange.to;
    const totalRequestedDays = differenceInDays(requestEnd, requestStart) + 1;
    
    // Calculate days covered by this property
    let coveredDays = 0;
    let currentDay = new Date(requestStart);
    
    while (currentDay <= requestEnd) {
      const currentDateStr = currentDay.toISOString();
      
      // Check if this day is covered by any availability window
      const isCovered = availabilityWindows.some(window => {
        const windowStart = parseISO(window.startDate);
        const windowEnd = parseISO(window.endDate);
        return currentDay >= windowStart && currentDay <= windowEnd;
      });
      
      if (isCovered) {
        coveredDays++;
      }
      
      currentDay = addDays(currentDay, 1);
    }
    
    coveragePercentage = Math.round((coveredDays / totalRequestedDays) * 100);
  }

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-brand" />
          Availability Windows
        </h3>
        
        {requestedDateRange?.from && requestedDateRange?.to && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Coverage of requested dates:</span>
              <span className="font-medium">{coveragePercentage}%</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full" 
                style={{ width: `${coveragePercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {format(requestedDateRange.from, 'MMM d')} - {format(requestedDateRange.to, 'MMM d, yyyy')}
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {availabilityWindows.map((window) => {
            const startDate = parseISO(window.startDate);
            const endDate = parseISO(window.endDate);
            
            return (
              <div key={window.id} className="flex items-center">
                <div className="h-3 w-3 bg-green-500 rounded-full mr-3"></div>
                <span className="font-medium">
                  {format(startDate, 'MMMM d')} - {format(endDate, 'MMMM d, yyyy')}
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
