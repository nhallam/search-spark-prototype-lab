
import React from 'react';
import { format, parseISO, differenceInDays } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import { PropertyCombination as PropertyCombinationType } from '@/types/property';

interface PropertyCombinationProps {
  combination: PropertyCombinationType;
  requestedDateRange: {
    from: Date;
    to: Date;
  };
}

const PropertyCombination: React.FC<PropertyCombinationProps> = ({ combination, requestedDateRange }) => {
  const totalDays = differenceInDays(requestedDateRange.to, requestedDateRange.from) + 1;
  
  return (
    <Card className="mb-6 overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="p-4 bg-green-50 border-b border-green-100">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-green-800">Perfect Combination for Your Stay</h3>
            <span className="text-sm font-medium text-green-700">
              {combination.coveragePercentage}% Coverage
            </span>
          </div>
          <p className="text-sm text-green-600 mt-1">
            {format(requestedDateRange.from, 'MMM d')} - {format(requestedDateRange.to, 'MMM d, yyyy')} 
            ({totalDays} nights)
          </p>
        </div>
        
        <div className="p-4">
          {/* Timeline visualization */}
          <div className="relative h-8 mb-6 mt-2">
            <div className="absolute h-1 bg-gray-200 top-3 left-0 right-0 rounded-full"></div>
            
            {combination.properties.map((item, index) => {
              const startDate = parseISO(item.startDate);
              const endDate = parseISO(item.endDate);
              const startPercentage = (differenceInDays(startDate, requestedDateRange.from) / totalDays) * 100;
              const width = (differenceInDays(endDate, startDate) + 1) / totalDays * 100;
              
              return (
                <React.Fragment key={index}>
                  <div 
                    className="absolute h-3 bg-brand rounded-full top-2" 
                    style={{
                      left: `${Math.max(0, startPercentage)}%`, 
                      width: `${width}%`
                    }}
                  ></div>
                  <div 
                    className="absolute top-6 text-xs font-medium"
                    style={{ left: `${Math.max(0, startPercentage)}%` }}
                  >
                    {format(startDate, 'MMM d')}
                  </div>
                </React.Fragment>
              );
            })}
          </div>

          {/* Property list */}
          <div className="space-y-4">
            {combination.properties.map((item, index) => {
              const property = item.property;
              const startDate = parseISO(item.startDate);
              const endDate = parseISO(item.endDate);
              const nights = differenceInDays(endDate, startDate) + 1;
              
              return (
                <div key={index}>
                  {index > 0 && (
                    <div className="flex justify-center my-3">
                      <ArrowRight className="text-gray-400" />
                    </div>
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={property.image} 
                        alt={property.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={property.owner?.avatar} alt={property.owner?.name} />
                            <AvatarFallback>{property.owner?.name?.charAt(0) || '?'}</AvatarFallback>
                          </Avatar>
                          <h4 className="font-medium">{property.title}</h4>
                        </div>
                        
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
                          <span>{property.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-500 text-xs mt-1">{property.location}</p>
                      
                      <div className="flex items-center mt-2 text-sm">
                        <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                        <span>
                          {format(startDate, 'MMM d')} - {format(endDate, 'MMM d')} ({nights} nights)
                        </span>
                      </div>
                      
                      <div className="mt-2">
                        <span className="font-semibold">${property.price * nights}</span>
                        <span className="text-gray-500 text-xs"> (${property.price} × {nights} nights)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Total price for {totalDays} nights</p>
              <p className="text-lg font-semibold">${combination.totalPrice}</p>
            </div>
            
            <Link 
              to={`/property/${combination.properties[0].property.id}?combination=${combination.id}`}
              className="bg-brand hover:bg-brand/90 text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCombination;
