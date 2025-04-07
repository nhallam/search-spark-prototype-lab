
import React, { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { mockProperties, filterProperties } from '@/data/mockProperties';
import { Property } from '@/components/PropertyCard';
import { toast } from 'sonner';

const Index = () => {
  const [searchParams, setSearchParams] = useState({
    dateRange: { from: undefined as Date | undefined, to: undefined as Date | undefined },
    location: 'all-nyc',
    priceRange: 300,
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
  
  // Initial load simulation
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Find your perfect stay in NYC
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        
        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredProperties.length} homes{' '}
              {searchParams.location !== 'all-nyc' && 
                `in ${searchParams.location === 'manhattan' ? 'Manhattan' : 'Brooklyn'}`}
            </h2>
          </div>
          
          <PropertyGrid properties={filteredProperties} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
