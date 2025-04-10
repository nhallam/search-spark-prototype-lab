
import React from 'react';
import { Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface PropertyPhotoGridProps {
  photos: string[];
  title: string;
}

const PropertyPhotoGrid: React.FC<PropertyPhotoGridProps> = ({ photos, title }) => {
  // Only display the first 5 photos in the grid
  const displayPhotos = photos.slice(0, 5);
  
  // Fill with placeholders if we have fewer than 5 photos
  while (displayPhotos.length < 5) {
    displayPhotos.push('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80');
  }
  
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-4 rounded-lg overflow-hidden">
      <div className="col-span-2 row-span-2 relative">
        <AspectRatio ratio={4/5} className="bg-gray-100">
          <img 
            src={displayPhotos[0]} 
            alt={`${title} - Main Photo`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      <div className="col-span-2 row-span-1 relative">
        <AspectRatio ratio={16/9} className="bg-gray-100">
          <img 
            src={displayPhotos[1]} 
            alt={`${title} - Photo 2`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      <div className="col-span-1 row-span-1 relative">
        <AspectRatio ratio={1} className="bg-gray-100">
          <img 
            src={displayPhotos[2]} 
            alt={`${title} - Photo 3`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      <div className="col-span-1 row-span-1 relative">
        <AspectRatio ratio={1} className="bg-gray-100">
          <img 
            src={displayPhotos[3]} 
            alt={`${title} - Photo 4`}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
      
      {photos.length > 0 && (
        <Badge className="absolute bottom-2 right-2 bg-black/70 text-white flex items-center gap-1 z-10">
          <Image size={14} />
          {photos.length} photos
        </Badge>
      )}
    </div>
  );
};

export default PropertyPhotoGrid;
