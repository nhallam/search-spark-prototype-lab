
import { Property } from '@/components/PropertyCard';
import { PropertyCombination } from '@/types/property';
import { parseISO, isWithinInterval, differenceInDays, addDays, isBefore } from 'date-fns';

/**
 * Checks if a property is available for a specific date range
 */
export const isPropertyAvailableForDateRange = (
  property: Property, 
  startDate: Date, 
  endDate: Date
): boolean => {
  if (!property.availabilityWindows || property.availabilityWindows.length === 0) {
    return false;
  }
  
  // Check if property has an availability window that covers the entire date range
  for (const window of property.availabilityWindows) {
    const windowStart = parseISO(window.startDate);
    const windowEnd = parseISO(window.endDate);
    
    if (windowStart <= startDate && windowEnd >= endDate) {
      return true;
    }
  }
  
  return false;
};

/**
 * Find the best availability window for a property given a date range
 */
export const findBestAvailabilityWindow = (
  property: Property,
  startDate: Date,
  endDate: Date
): { startDate: string; endDate: string } | null => {
  if (!property.availabilityWindows || property.availabilityWindows.length === 0) {
    return null;
  }
  
  // Find windows that overlap with the requested date range
  const overlappingWindows = property.availabilityWindows.filter(window => {
    const windowStart = parseISO(window.startDate);
    const windowEnd = parseISO(window.endDate);
    
    return (
      (windowStart <= endDate && windowEnd >= startDate) ||
      (windowStart >= startDate && windowStart <= endDate) ||
      (windowEnd >= startDate && windowEnd <= endDate)
    );
  });
  
  if (overlappingWindows.length === 0) {
    return null;
  }
  
  // Calculate the overlap for each window with the requested range
  const windowsWithOverlap = overlappingWindows.map(window => {
    const windowStart = parseISO(window.startDate);
    const windowEnd = parseISO(window.endDate);
    
    const overlapStart = windowStart > startDate ? windowStart : startDate;
    const overlapEnd = windowEnd < endDate ? windowEnd : endDate;
    const overlapDays = differenceInDays(overlapEnd, overlapStart) + 1;
    
    return {
      window,
      overlapDays,
      overlapStart,
      overlapEnd
    };
  });
  
  // Sort by overlap days (descending)
  windowsWithOverlap.sort((a, b) => b.overlapDays - a.overlapDays);
  
  // Return the window with the most overlap days
  const bestWindow = windowsWithOverlap[0];
  return {
    startDate: bestWindow.overlapStart.toISOString(),
    endDate: bestWindow.overlapEnd.toISOString()
  };
};

/**
 * Find coverage percentage for a date range
 */
export const calculateDateRangeCoverage = (
  properties: Array<{
    property: Property;
    startDate: string;
    endDate: string;
  }>,
  requestStart: Date,
  requestEnd: Date
): number => {
  const totalRequestedDays = differenceInDays(requestEnd, requestStart) + 1;
  
  // Create an array representing each day in the requested range
  const coverageArray = Array(totalRequestedDays).fill(false);
  
  // Mark days that are covered by properties
  properties.forEach(({ startDate, endDate }) => {
    const propertyStart = parseISO(startDate);
    const propertyEnd = parseISO(endDate);
    
    // Calculate the start and end offsets within the requested range
    const startOffset = Math.max(0, differenceInDays(propertyStart, requestStart));
    const endOffset = Math.min(
      totalRequestedDays - 1,
      differenceInDays(propertyEnd, requestStart)
    );
    
    // Mark these days as covered
    for (let i = startOffset; i <= endOffset; i++) {
      coverageArray[i] = true;
    }
  });
  
  // Calculate coverage percentage
  const coveredDays = coverageArray.filter(Boolean).length;
  return Math.round((coveredDays / totalRequestedDays) * 100);
};

/**
 * Find property combinations to cover a date range
 */
export const findPropertyCombinations = (
  properties: Property[],
  startDate: Date,
  endDate: Date,
  maxProperties: number = 3
): PropertyCombination[] => {
  // Filter out unavailable properties
  const availableProperties = properties.filter(p => p.available);
  
  // First, check if any single property can cover the entire date range
  const fullCoverageProperties = availableProperties.filter(property => 
    isPropertyAvailableForDateRange(property, startDate, endDate)
  );
  
  const combinations: PropertyCombination[] = [];
  
  // Add single-property combinations first
  fullCoverageProperties.forEach(property => {
    combinations.push({
      id: `combo-${combinations.length + 1}`,
      properties: [{
        property,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      }],
      totalPrice: property.price * (differenceInDays(endDate, startDate) + 1),
      coveragePercentage: 100
    });
  });
  
  // Create property combinations recursively
  const generateCombinations = (
    currentDate: Date,
    currentProperties: Array<{
      property: Property;
      startDate: string;
      endDate: string;
    }> = [],
    depth: number = 0
  ) => {
    // Stop if we've reached the maximum number of properties or the end date
    if (depth >= maxProperties || currentDate >= endDate) {
      // Calculate coverage and add to combinations if it's good enough
      const coveragePercentage = calculateDateRangeCoverage(
        currentProperties, 
        startDate, 
        endDate
      );
      
      if (coveragePercentage > 0) {
        // Calculate total price
        const totalPrice = currentProperties.reduce((sum, { property, startDate, endDate }) => {
          const nights = differenceInDays(parseISO(endDate), parseISO(startDate)) + 1;
          return sum + (property.price * nights);
        }, 0);
        
        combinations.push({
          id: `combo-${combinations.length + 1}`,
          properties: [...currentProperties],
          totalPrice,
          coveragePercentage
        });
      }
      
      return;
    }
    
    // Try adding each property that could work for the current date onwards
    for (const property of availableProperties) {
      // Skip properties we've already used
      if (currentProperties.some(p => p.property.id === property.id)) {
        continue;
      }
      
      // Find the best availability window for this property from current date
      const bestWindow = findBestAvailabilityWindow(
        property,
        currentDate,
        endDate
      );
      
      if (!bestWindow) continue;
      
      // Clone current properties and add this one
      const updatedProperties = [
        ...currentProperties,
        {
          property,
          startDate: bestWindow.startDate,
          endDate: bestWindow.endDate
        }
      ];
      
      // Recursively try to add more properties, starting from the end of this one
      generateCombinations(
        addDays(parseISO(bestWindow.endDate), 1),
        updatedProperties,
        depth + 1
      );
    }
  };
  
  // Start generating combinations
  generateCombinations(startDate);
  
  // Sort combinations by coverage (descending) and then by price (ascending)
  combinations.sort((a, b) => {
    if (b.coveragePercentage !== a.coveragePercentage) {
      return b.coveragePercentage - a.coveragePercentage;
    }
    return a.totalPrice - b.totalPrice;
  });
  
  // Return top combinations (max 5)
  return combinations.slice(0, 5);
};
