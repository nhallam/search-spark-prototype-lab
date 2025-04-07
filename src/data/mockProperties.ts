
import { Property } from '../components/PropertyCard';

// Base properties that we'll duplicate with variations
const baseProperties: Property[] = [
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
    },
    description: "This bright and modern loft is in the heart of Manhattan, offering incredible views of the city skyline. With high ceilings, large windows, and a spacious open layout, this space is perfect for both working and relaxing. Just minutes from top restaurants and attractions.",
    amenities: ["Wifi", "Kitchen", "AC", "Workspace", "TV", "Washer", "Elevator"],
    beds: 2,
    baths: 1,
    guests: 4,
    lat: 40.7128,
    lng: -74.0060,
    gallery: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    ]
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
    },
    description: "Welcome to this cozy Brooklyn studio that's perfect for solo travelers or couples. The apartment features stylish decor, a comfortable queen bed, and all the essentials for a comfortable stay. Located in a vibrant neighborhood with plenty of restaurants and cafes within walking distance.",
    amenities: ["Wifi", "Kitchen", "AC", "Washer", "Dryer"],
    beds: 1,
    baths: 1,
    guests: 2,
    lat: 40.6782,
    lng: -73.9442,
    gallery: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1630699144867-37acec97df5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    ]
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

// Property name variations
const propertyNames = [
  'Luxury Apartment', 'Cozy Studio', 'Modern Loft', 'Historic Brownstone', 
  'Penthouse Suite', 'Charming Flat', 'Downtown Condo', 'Stylish Studio',
  'Elegant Apartment', 'Contemporary Space', 'Urban Retreat', 'Chic Loft', 
  'Bright Condo', 'Skyline View Apartment', 'Quiet Retreat', 'Designer Loft',
  'Trendy Flat', 'Central Park View', 'Artist Studio', 'Executive Suite'
];

// Location variations
const locations = [
  'Manhattan, NYC', 'Brooklyn, NYC', 'Upper East Side, NYC', 'Lower Manhattan, NYC',
  'Chelsea, NYC', 'SoHo, NYC', 'Greenwich Village, NYC', 'Tribeca, NYC',
  'Williamsburg, Brooklyn', 'Upper West Side, NYC', 'East Village, NYC',
  'Midtown, NYC', 'Financial District, NYC', 'Park Slope, Brooklyn',
  'Hell\'s Kitchen, NYC', 'Dumbo, Brooklyn'
];

// Owner variations
const owners = [
  { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Michael', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Jessica', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Daniel', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Emma', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'James', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Olivia', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Noah', avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' },
  { name: 'Sophia', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80' }
];

// Image variations for properties
const propertyImages = [
  'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1522156373667-4c7234bbd804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
];

// Generate 100 properties
const generateProperties = (count: number): Property[] => {
  // Start with our base properties
  const allProperties = [...baseProperties];
  
  // Generate additional properties
  for (let i = baseProperties.length + 1; i <= count; i++) {
    const propertyName = propertyNames[Math.floor(Math.random() * propertyNames.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const price = Math.floor(Math.random() * 400) + 100; // $100 to $500
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
    const image = propertyImages[Math.floor(Math.random() * propertyImages.length)];
    const available = Math.random() > 0.2; // 80% available
    const owner = owners[Math.floor(Math.random() * owners.length)];
    const beds = Math.floor(Math.random() * 4) + 1; // 1 to 4 beds
    const baths = Math.floor(Math.random() * 3) + 1; // 1 to 3 baths
    const guests = beds + Math.floor(Math.random() * 3); // beds + 0 to 2 extra guests
    
    // Generate random coordinates near NYC
    const lat = 40.7 + (Math.random() - 0.5) * 0.2; // Around NYC latitude
    const lng = -74.0 + (Math.random() - 0.5) * 0.2; // Around NYC longitude
    
    // Create the property
    const property: Property = {
      id: i.toString(),
      title: propertyName,
      location: location,
      price: price,
      rating: parseFloat(rating),
      image: image,
      available: available,
      owner: owner,
      beds: beds,
      baths: baths,
      guests: guests,
      lat: lat,
      lng: lng,
      gallery: [
        image,
        propertyImages[Math.floor(Math.random() * propertyImages.length)],
        propertyImages[Math.floor(Math.random() * propertyImages.length)]
      ]
    };
    
    // Add the property to our collection
    allProperties.push(property);
  }
  
  return allProperties;
};

// Generate 100 properties
export const mockProperties: Property[] = generateProperties(100);

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
