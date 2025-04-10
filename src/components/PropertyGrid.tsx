
import React, { useState } from 'react';
import PropertyCard, { Property } from './PropertyCard';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import PropertyAvailability from './PropertyAvailability';

interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties, isLoading = false, dateRange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 24; // Increased from 16 to 24
  
  // Calculate pagination
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProperties.map((property) => (
          <PropertyCard 
            key={property.id} 
            property={property} 
          />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious onClick={() => paginate(currentPage - 1)} />
              </PaginationItem>
            )}
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                // If 5 or fewer pages, show all
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                // If at start, show first 5
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // If at end, show last 5
                pageNum = totalPages - 4 + i;
              } else {
                // Show current page and 2 before/after
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    isActive={pageNum === currentPage} 
                    onClick={() => paginate(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext onClick={() => paginate(currentPage + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default PropertyGrid;
