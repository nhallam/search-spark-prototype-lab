import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import PropertyGrid from '@/components/PropertyGrid';
import { mockProperties, filterProperties } from '@/data/mockProperties';
import { Property } from '@/components/PropertyCard';
import { toast } from 'sonner';
import FilterDrawer from '@/components/FilterDrawer';
import { Sliders, UserPlus } from 'phosphor-react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PretzelLogo from '@/components/PretzelLogo';
import { useIsMobile } from '@/hooks/use-mobile';

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
      setIsLoading(false);
      
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
    
    setSearchParams({
      ...searchParams,
      priceRange: filters.priceRange
    });
    
    setTimeout(() => {
      const filtered = filterProperties(mockProperties, searchParams);
      setFilteredProperties(filtered);
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
      <header className="bg-white text-brand shadow-sm py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <PretzelLogo className="h-8 w-8 text-brand" />
              <h1 className="text-3xl font-bold text-brand">
                Kiki
              </h1>
            </div>
            <div className="flex gap-2">
              <Link to="/menu">
                <Button variant="ghost" className="rounded-full w-10 h-10 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/invite">
                <Button className="bg-brand hover:bg-brand/90 text-white">
                  <UserPlus weight="bold" className="mr-2 h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
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
