
import React, { useState } from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FilterDrawerProps {
  onApplyFilters: (filters: {
    priceRange: number;
    propertyType: string;
    amenities: string[];
    instantBook: boolean;
    guestCount: number;
  }) => void;
  initialFilters: {
    priceRange: number;
    propertyType: string;
    amenities: string[];
    instantBook: boolean;
    guestCount: number;
  };
}

const FilterDrawer: React.FC<FilterDrawerProps> = ({ onApplyFilters, initialFilters }) => {
  const [priceRange, setPriceRange] = useState<number>(initialFilters.priceRange);
  const [propertyType, setPropertyType] = useState<string>(initialFilters.propertyType);
  const [amenities, setAmenities] = useState<string[]>(initialFilters.amenities);
  const [instantBook, setInstantBook] = useState<boolean>(initialFilters.instantBook);
  const [guestCount, setGuestCount] = useState<number>(initialFilters.guestCount);
  
  const handleAmenityToggle = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter(item => item !== amenity));
    } else {
      setAmenities([...amenities, amenity]);
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      propertyType,
      amenities,
      instantBook,
      guestCount
    });
  };
  
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">Filters</DrawerTitle>
        </DrawerHeader>
        
        <div className="px-4 py-2">
          <div className="space-y-6">
            {/* Price Range */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Price Range</h3>
              <p className="text-sm text-gray-500">Maximum price: ${priceRange}/night</p>
              <Slider 
                defaultValue={[priceRange]} 
                min={50} 
                max={1000} 
                step={10}
                onValueChange={(values) => setPriceRange(values[0])} 
                className="text-brand"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$50</span>
                <span>$1000+</span>
              </div>
            </div>
            
            <Separator />
            
            {/* Property Type */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Property Type</h3>
              <RadioGroup value={propertyType} onValueChange={setPropertyType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="entire-home" id="entire-home" />
                  <Label htmlFor="entire-home">Entire home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private-room" id="private-room" />
                  <Label htmlFor="private-room">Private room</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shared-room" id="shared-room" />
                  <Label htmlFor="shared-room">Shared room</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Separator />
            
            {/* Amenities */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {['wifi', 'kitchen', 'washer', 'dryer', 'air-conditioning', 'heating', 'pool', 'hot-tub'].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox 
                      id={amenity} 
                      checked={amenities.includes(amenity)} 
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                    />
                    <Label htmlFor={amenity} className="capitalize">{amenity.replace('-', ' ')}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Guest Count */}
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Guest Count</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm">Guests: {guestCount}</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    disabled={guestCount <= 1}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{guestCount}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setGuestCount(guestCount + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Instant Book */}
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="instant-book" 
                checked={instantBook} 
                onCheckedChange={(checked) => setInstantBook(checked as boolean)}
              />
              <div>
                <Label htmlFor="instant-book" className="font-medium">Instant Book</Label>
                <p className="text-sm text-gray-500">Book without waiting for host approval</p>
              </div>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="pt-2">
          <Button onClick={handleApplyFilters} className="bg-brand hover:bg-brand/90 text-white">Apply Filters</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FilterDrawer;
