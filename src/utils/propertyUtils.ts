
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
  return mockProperties
    .filter(property => property.id !== currentId && property.available)
    .slice(0, limit);
};
