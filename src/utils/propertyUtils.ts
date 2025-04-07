
import { mockProperties } from '@/data/mockProperties';
import { Property } from '@/components/PropertyCard';

export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

export const getRelatedProperties = (currentId: string, limit: number = 3): Property[] => {
  return mockProperties
    .filter(property => property.id !== currentId && property.available)
    .slice(0, limit);
};
