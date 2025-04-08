import React, { useState } from 'react';
import { Calendar, MapPin, CurrencyDollar, MagnifyingGlass, X } from 'phosphor-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Slider
} from '@/components/ui/slider';

interface SearchBarProps {
  onSearch: (searchParams: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    location: string;
    priceRange: number;
  }) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [location, setLocation] = useState<string>("all-nyc");
  const [priceRange, setPriceRange] = useState<number>(300);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
  };

  const handleSearch = () => {
    onSearch({
      dateRange,
      location,
      priceRange,
    });
  };
  
  const handleClearSearch = () => {
    setDateRange({
      from: undefined,
      to: undefined,
    });
    setLocation("all-nyc");
    setPriceRange(300);
    
    onSearch({
      dateRange: {
        from: undefined,
        to: undefined,
      },
      location: "all-nyc",
      priceRange: 300,
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 rounded-xl bg-white shadow-lg mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Date Range Selector */}
        <div className="md:col-span-5 flex flex-col">
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 border border-gray-200 hover:border-gray-300 rounded-lg flex justify-between w-full"
              >
                <div className="flex items-center">
                  <Calendar weight="regular" size={20} className="mr-2" />
                  <span>
                    {dateRange.from && dateRange.to ? (
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500">Your stay</span>
                        <span>
                          {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")}
                          {" "}({Math.round((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))} nights)
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-start">
                        <span className="text-xs text-gray-500">When</span>
                        <span>Add dates</span>
                      </div>
                    )}
                  </span>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={dateRange.from || new Date()}
                selected={dateRange}
                onSelect={handleDateRangeChange}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Location Selector */}
        <div className="md:col-span-3 flex flex-col">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="h-14 border border-gray-200 hover:border-gray-300 rounded-lg">
              <div className="flex items-center">
                <MapPin weight="regular" size={20} className="mr-2" />
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500">Where</span>
                  <SelectValue placeholder="All NYC" />
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-nyc">All NYC</SelectItem>
              <SelectItem value="manhattan">Manhattan</SelectItem>
              <SelectItem value="brooklyn">Brooklyn</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Selector */}
        <div className="md:col-span-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-14 border border-gray-200 hover:border-gray-300 rounded-lg flex justify-between w-full"
              >
                <div className="flex items-center">
                  <CurrencyDollar weight="regular" size={20} className="mr-2" />
                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500">Price</span>
                    <span>Up to ${priceRange}/night</span>
                  </div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4 p-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Price Range</span>
                    <span>${priceRange}/night</span>
                  </div>
                  <Slider
                    defaultValue={[priceRange]}
                    max={1000}
                    min={50}
                    step={10}
                    onValueChange={(value) => setPriceRange(value[0])}
                    className="pt-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$50</span>
                    <span>$1000+</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search and Clear Buttons */}
        <div className="md:col-span-2 flex gap-2">
          <Button 
            onClick={handleSearch}
            className="h-14 flex-1 bg-brand hover:bg-brand/90 text-white rounded-lg"
            title="Search"
          >
            <MagnifyingGlass weight="bold" size={22} />
          </Button>
          
          <Button 
            onClick={handleClearSearch}
            variant="outline"
            className="h-14 border-gray-200 hover:bg-gray-100 rounded-lg"
            title="Clear search"
          >
            <X weight="bold" size={22} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
