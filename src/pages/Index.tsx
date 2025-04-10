import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { mockProperties, filterProperties } from '@/data/mockProperties';
import { Property } from '@/components/PropertyCard';
import { toast } from 'sonner';
import FilterDrawer from '@/components/FilterDrawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { findPropertyCombinations } from '@/utils/combinationUtils';
import PropertyCombinations from '@/components/PropertyCombinations';
import { PropertyCombination } from '@/types/property';

const Index = () => {
  const [searchParams, setSearchParams] = useState({
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    location: 'all-nyc',
    priceRange: 300,
  });
  
  const [advancedFilters, setAdvancedFilters] = useState({
    priceRange: 300,
    propertyType: 'entire-home',
    amenities: [] as string[],
    guestCount: 2
  });
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyCombinations, setPropertyCombinations] = useState<PropertyCombination[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const isMobile = useIsMobile();
  
  const handleSearch = (params: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    location: string;
    priceRange: number;
  }) => {
    setIsLoading(true);
    setSearchParams(params);
    setAdvancedFilters({
      ...advancedFilters,
      priceRange: params.priceRange
    });
    
    setTimeout(() => {
      const filtered = filterProperties(mockProperties, params);
      setFilteredProperties(filtered);
      
      if (params.dateRange.from && params.dateRange.to) {
        const days = Math.round((params.dateRange.to.getTime() - params.dateRange.from.getTime()) / (1000 * 60 * 60 * 24));
        
        if (days > 14) {
          const combinations = findPropertyCombinations(
            filtered, 
            params.dateRange.from, 
            params.dateRange.to
          );
          setPropertyCombinations(combinations);
          
          if (combinations.length > 0) {
            toast.success(`Found ${combinations.length} property combinations for your ${days}-day stay`, {
              description: "These combinations perfectly cover your requested dates"
            });
          }
        } else {
          setPropertyCombinations([]);
        }
      } else {
        setPropertyCombinations([]);
      }
      
      setIsLoading(false);
      setSearchPerformed(true);
      
      if (params.dateRange.from && params.dateRange.to) {
        toast.success(`Found ${filtered.length} properties for your dates`, {
          description: "Showing results that match your criteria"
        });
      } else {
        toast.info('Please select both check-in and check-out dates');
      }
    }, 800);
  };
  
  const handleApplyAdvancedFilters = (filters: {
    priceRange: number;
    propertyType: string;
    amenities: string[];
    guestCount: number;
  }) => {
    setIsLoading(true);
    setAdvancedFilters(filters);
    
    setSearchParams({
      ...searchParams,
      priceRange: filters.priceRange
    });
    
    setTimeout(() => {
      const filtered = filterProperties(mockProperties, searchParams);
      setFilteredProperties(filtered);
      
      if (searchParams.dateRange.from && searchParams.dateRange.to) {
        const combinations = findPropertyCombinations(
          filtered,
          searchParams.dateRange.from,
          searchParams.dateRange.to
        );
        setPropertyCombinations(combinations);
      }
      
      setIsLoading(false);
      
      toast.success(`Applied ${filters.amenities.length} filters`, {
        description: "Results updated with your preferences"
      });
    }, 800);
  };
  
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="container mx-auto px-4 py-8 pb-24">
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-8 mb-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredProperties.length} homes{' '}
              {searchParams.location !== 'all-nyc' && 
                `in ${searchParams.location === 'manhattan' ? 'Manhattan' : 'Brooklyn'}`}
            </h2>
            
            <FilterDrawer 
              onApplyFilters={handleApplyAdvancedFilters} 
              initialFilters={{...advancedFilters, instantBook: false}}
            />
          </div>
          
          {searchPerformed && searchParams.dateRange.from && searchParams.dateRange.to && (
            <PropertyCombinations 
              combinations={propertyCombinations} 
              dateRange={{
                from: searchParams.dateRange.from,
                to: searchParams.dateRange.to
              }}
              isLoading={isLoading}
            />
          )}
          
          <PropertyGrid properties={filteredProperties} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
