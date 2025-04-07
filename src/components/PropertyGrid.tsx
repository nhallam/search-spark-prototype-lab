
import React from 'react';
import PropertyCard, { Property } from './PropertyCard';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="rounded-lg bg-gray-200 aspect-[4/3]"></div>
            <div className="h-4 bg-gray-200 rounded mt-3 w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded mt-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mt-3 w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
        <p className="mt-2 text-gray-500">
          Try adjusting your search filters or changing your dates.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
