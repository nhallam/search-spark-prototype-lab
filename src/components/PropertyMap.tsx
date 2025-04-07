
import React from 'react';
import { Map as MapIcon } from 'lucide-react';

interface PropertyMapProps {
  lat: number;
  lng: number;
  address: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  // For this prototype, we'll use a placeholder map
  // In a real application, you would integrate with Google Maps, Mapbox, etc.
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200">
      <div className="bg-gray-100 aspect-video flex items-center justify-center">
        <div className="text-center">
          <MapIcon className="h-12 w-12 text-brand mx-auto mb-2" />
          <p className="text-gray-600">Map placeholder for {address}</p>
          <p className="text-sm text-gray-500">Location: {lat.toFixed(4)}, {lng.toFixed(4)}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
