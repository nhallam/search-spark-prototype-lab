
import { Property } from '../components/PropertyCard';

// Mock property data
export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern Loft',
    location: 'Manhattan, NYC',
    price: 180,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '2',
    title: 'Cozy Studio',
    location: 'Brooklyn, NYC',
    price: 120,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'Michael',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '3',
    title: 'Luxury Apartment',
    location: 'Manhattan, NYC',
    price: 350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: false,
    owner: {
      name: 'Jessica',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '4',
    title: 'Bright Studio',
    location: 'Brooklyn, NYC',
    price: 140,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'Daniel',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '5',
    title: 'Historic Brownstone',
    location: 'Brooklyn, NYC',
    price: 210,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '6',
    title: 'Urban Penthouse',
    location: 'Manhattan, NYC',
    price: 420,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'James',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '7',
    title: 'Contemporary Midtown',
    location: 'Manhattan, NYC',
    price: 260,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: true,
    owner: {
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
  {
    id: '8',
    title: 'Artistic Loft',
    location: 'Brooklyn, NYC',
    price: 170,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    available: false,
    owner: {
      name: 'Olivia',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
    }
  },
];

// Filter properties based on search criteria
export const filterProperties = (
  properties: Property[],
  {
    dateRange,
    location,
    priceRange,
  }: {
    dateRange: { from: Date | undefined; to: Date | undefined };
    location: string;
    priceRange: number;
  }
) => {
  return properties.filter((property) => {
    // Filter by location
    if (location !== 'all-nyc') {
      const locationMatch = location === 'manhattan' 
        ? property.location.toLowerCase().includes('manhattan')
        : property.location.toLowerCase().includes('brooklyn');
      
      if (!locationMatch) return false;
    }
    
    // Filter by price
    if (property.price > priceRange) {
      return false;
    }
    
    // For the prototype, we'll just check if the property is marked as available
    // In a real app, you would check against the actual date range
    if (dateRange.from && dateRange.to) {
      return property.available;
    }
    
    return true;
  });
};
