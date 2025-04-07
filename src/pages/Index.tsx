
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { mockProperties, filterProperties } from '@/data/mockProperties';
import { Property } from '@/components/PropertyCard';
import { toast } from 'sonner';
import FilterDrawer from '@/components/FilterDrawer';
import { SlidersHorizontal, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PretzelLogo from '@/components/PretzelLogo';

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
    instantBook: false,
    guestCount: 2
  });
  
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties);
  const [isLoading, setIsLoading] = useState(false);
  
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
    
    // Simulate loading state for better UX
    setTimeout(() => {
      const filtered = filterProperties(mockProperties, params);
      setFilteredProperties(filtered);
      setIsLoading(false);
      
      // Show toast notification with search results
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
    instantBook: boolean;
    guestCount: number;
  }) => {
    setIsLoading(true);
    setAdvancedFilters(filters);
    
    // Update the price range in search params too
    setSearchParams({
      ...searchParams,
      priceRange: filters.priceRange
    });
    
    // Apply filters
    setTimeout(() => {
      // This would typically involve more complex filtering logic with the advanced filters
      const filtered = filterProperties(mockProperties, searchParams);
      setFilteredProperties(filtered);
      setIsLoading(false);
      
      toast.success(`Applied ${filters.amenities.length} filters`, {
        description: "Results updated with your preferences"
      });
    }, 800);
  };
  
  // Initial load simulation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-brand text-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PretzelLogo className="h-8 w-8" />
              <h1 className="text-3xl font-bold">
                Kiki
              </h1>
            </div>
            <Link to="/invite">
              <Button variant="outline" className="border-white hover:bg-white/20 text-gray-900 bg-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredProperties.length} homes{' '}
              {searchParams.location !== 'all-nyc' && 
                `in ${searchParams.location === 'manhattan' ? 'Manhattan' : 'Brooklyn'}`}
            </h2>
            
            <FilterDrawer 
              onApplyFilters={handleApplyAdvancedFilters} 
              initialFilters={advancedFilters}
            />
          </div>
          
          <PropertyGrid properties={filteredProperties} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
