
import { mockProperties } from '@/data/mockProperties';
import { getReviewsForProperty } from '@/data/mockReviews';
import { Property } from '@/components/PropertyCard';

export const getPropertyById = (id: string): Property | undefined => {
  const property = mockProperties.find(property => property.id === id);
  if (property) {
    property.reviews = getReviewsForProperty(id);
  }
  return property;
};

export const getRelatedProperties = (currentId: string, limit: number = 3): Property[] => {
  // Find the current property to match location or price range
  const currentProperty = mockProperties.find(property => property.id === currentId);
  
  if (!currentProperty) return [];
  
  // Get properties in the same location or with similar price
  return mockProperties
    .filter(property => {
      if (property.id === currentId) return false;
      if (!property.available) return false;
      
      // Match by location or price range (within 25% of current property)
      const sameLocation = property.location.includes(currentProperty.location.split(',')[0]);
      const similarPrice = Math.abs(property.price - currentProperty.price) <= currentProperty.price * 0.25;
      
      return sameLocation || similarPrice;
    })
    .sort(() => Math.random() - 0.5) // Shuffle to get random related properties
    .slice(0, limit);
};
