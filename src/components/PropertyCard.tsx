
import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  available: boolean;
  owner: {
    name: string;
    avatar: string;
  };
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
        <img
          src={property.image}
          alt={property.title}
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={property.owner.avatar} alt={property.owner.name} />
              <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-lg">{property.owner.name}'s {property.title}</h3>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400 mr-1" />
            <span>{property.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-1">{property.location}</p>
        <div className="mt-3 flex justify-between items-end">
          <div>
            <span className="font-semibold">${property.price}</span>
            <span className="text-gray-500 text-sm"> / night</span>
          </div>
          {!property.available && (
            <span className="text-red-500 text-sm font-medium">Unavailable</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
