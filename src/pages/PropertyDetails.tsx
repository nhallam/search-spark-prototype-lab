
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyById, getRelatedProperties } from '@/utils/propertyUtils';
import { getReviewsForProperty } from '@/data/mockReviews';
import { Star, ArrowLeft, Wifi, Home, User, Bath, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import PropertyGallery from '@/components/PropertyGallery';
import PropertyMap from '@/components/PropertyMap';
import BookingForm from '@/components/BookingForm';
import PropertyCard, { Property } from '@/components/PropertyCard';
import PropertyReviews from '@/components/PropertyReviews';
import PropertyAvailability from '@/components/PropertyAvailability';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      if (id) {
        const foundProperty = getPropertyById(id);
        
        if (foundProperty) {
          // Get reviews for this property
          const propertyReviews = getReviewsForProperty(id);
          // Attach reviews to the property
          foundProperty.reviews = propertyReviews;
          setProperty(foundProperty);
          setRelatedProperties(getRelatedProperties(id));
        } else {
          setProperty(undefined);
        }
      }
      setIsLoading(false);
    }, 500);
    
    // Scroll to top when property changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen text-center">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <p className="mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Return to home page</Link>
        </Button>
      </div>
    );
  }
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!", {
      description: "You can now share this property with others."
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button and title */}
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-brand hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to search results
          </Link>
          <h1 className="text-3xl font-bold">{property.title}</h1>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 stroke-yellow-400 mr-1" />
                <span className="font-medium">{property.rating.toFixed(1)}</span>
              </div>
              <span className="text-gray-500">·</span>
              <span className="text-gray-500">{property.location}</span>
            </div>
            <Button variant="outline" onClick={handleShare}>Share</Button>
          </div>
        </div>
        
        {/* Property gallery */}
        <div className="mb-8">
          <PropertyGallery images={property.gallery || [property.image]} title={property.title} />
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - Property details */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={property.owner?.avatar} alt={property.owner?.name} />
                    <AvatarFallback>{property.owner?.name?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      Hosted by {property.owner?.name || 'Unknown'}
                    </h2>
                    <p className="text-gray-500">Superhost · 5 years hosting</p>
                    
                    {/* Added nationality information here */}
                    {property.nationality && (
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-base">{property.nationality.flag}</span>
                        <span className="text-sm text-gray-500">From {property.nationality.country}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Entire {property.title.toLowerCase()}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{property.guests || 4} guests</span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{property.beds || 2} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{property.baths || 1} baths</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-xl font-semibold mb-3">About this place</h3>
                <p className="text-gray-700">
                  {property.description || "No description available for this property yet. Please check back later for updates or contact the host for more information."}
                </p>
              </div>
              
              {property.amenities && property.amenities.length > 0 && (
                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-xl font-semibold mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Wifi className="h-5 w-5 text-gray-500 mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add Availability Windows section */}
              <div className="border-t border-gray-200 pt-6 mb-6">
                <PropertyAvailability availabilityWindows={property.availabilityWindows} />
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold mb-3">Location</h3>
                <PropertyMap 
                  lat={property.lat || 40.7128} 
                  lng={property.lng || -74.0060} 
                  address={property.location} 
                />
              </div>
            </div>

            {/* Reviews Section */}
            {property.reviews && property.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <PropertyReviews reviews={property.reviews} />
              </div>
            )}
          </div>
          
          {/* Right column - Booking form */}
          <div className="h-fit sticky top-4">
            <BookingForm property={property} />
          </div>
        </div>
        
        {/* Related properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">More places to stay</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((prop) => (
                <PropertyCard key={prop.id} property={prop} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;
