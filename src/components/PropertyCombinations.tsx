
import React from 'react';
import PropertyCombination from './PropertyCombination';
import { PropertyCombination as PropertyCombinationType } from '@/types/property';

interface PropertyCombinationsProps {
  combinations: PropertyCombinationType[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  isLoading?: boolean;
}

const PropertyCombinations: React.FC<PropertyCombinationsProps> = ({ 
  combinations, 
  dateRange,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6 mb-10">
        {[1, 2].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="rounded-lg bg-gray-200 h-40"></div>
          </div>
        ))}
      </div>
    );
  }
  
  if (combinations.length === 0) {
    return null;
  }
  
  if (!dateRange.from || !dateRange.to) {
    return null;
  }
  
  return (
    <div className="space-y-6 mb-10">
      <h2 className="text-xl font-semibold mb-2">Perfect Combinations for Your Stay</h2>
      <p className="text-gray-500 mb-4">
        We found {combinations.length} property combinations that cover your requested dates!
      </p>
      
      {combinations.map((combination) => (
        <PropertyCombination 
          key={combination.id} 
          combination={combination} 
          requestedDateRange={dateRange} 
        />
      ))}
    </div>
  );
};

export default PropertyCombinations;
