
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Check } from 'lucide-react';

type Step = 'basicInfo' | 'photos' | 'amenities' | 'pricing' | 'confirmation';

interface HomeListingFormProps {
  onClose: () => void;
}

const HomeListingForm: React.FC<HomeListingFormProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState<Step>('basicInfo');
  const [formData, setFormData] = useState({
    address: '',
    neighborhood: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    amenities: [] as string[],
    price: '',
    availability: [] as string[]
  });

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    switch (currentStep) {
      case 'basicInfo':
        if (!formData.address || !formData.neighborhood || !formData.propertyType) {
          toast.error('Please fill out all required fields');
          return;
        }
        setCurrentStep('photos');
        break;
      case 'photos':
        // In a real app, we'd validate photo uploads here
        setCurrentStep('amenities');
        break;
      case 'amenities':
        setCurrentStep('pricing');
        break;
      case 'pricing':
        if (!formData.price) {
          toast.error('Please set a price for your listing');
          return;
        }
        setCurrentStep('confirmation');
        break;
      case 'confirmation':
        // Submit the listing
        handleSubmitListing();
        break;
    }
  };

  const handlePreviousStep = () => {
    switch (currentStep) {
      case 'photos':
        setCurrentStep('basicInfo');
        break;
      case 'amenities':
        setCurrentStep('photos');
        break;
      case 'pricing':
        setCurrentStep('amenities');
        break;
      case 'confirmation':
        setCurrentStep('pricing');
        break;
    }
  };

  const handleSubmitListing = () => {
    // In a real app, this would save to a database
    toast.success('Your home has been listed successfully!');
    onClose();
  };

  const renderStepIndicator = () => {
    const steps = ['basicInfo', 'photos', 'amenities', 'pricing', 'confirmation'];
    const stepNames = ['Basic Info', 'Photos', 'Amenities', 'Pricing', 'Confirmation'];
    
    return (
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 
                ${currentStep === step ? 'bg-brand border-brand text-white' : 
                  steps.indexOf(currentStep as Step) > index ? 'bg-brand/20 border-brand text-brand' : 
                  'bg-gray-100 border-gray-300 text-gray-400'}`}
            >
              {steps.indexOf(currentStep as Step) > index ? <Check size={16} /> : index + 1}
            </div>
            <span className={`text-xs mt-1 
              ${currentStep === step ? 'text-brand font-medium' : 
                steps.indexOf(currentStep as Step) > index ? 'text-brand' : 'text-gray-400'}`}>
              {stepNames[index]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="address">Street Address*</Label>
        <Input 
          id="address"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          placeholder="123 W 34th St"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="neighborhood">Neighborhood*</Label>
        <Input 
          id="neighborhood"
          value={formData.neighborhood}
          onChange={(e) => updateFormData('neighborhood', e.target.value)}
          placeholder="Chelsea, Williamsburg, etc."
          required
        />
      </div>
      
      <div>
        <Label htmlFor="propertyType">Property Type*</Label>
        <Input 
          id="propertyType"
          value={formData.propertyType}
          onChange={(e) => updateFormData('propertyType', e.target.value)}
          placeholder="Apartment, Loft, Brownstone, etc."
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input 
            id="bedrooms"
            value={formData.bedrooms}
            onChange={(e) => updateFormData('bedrooms', e.target.value)}
            placeholder="1"
            type="number"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms">Bathrooms</Label>
          <Input 
            id="bathrooms"
            value={formData.bathrooms}
            onChange={(e) => updateFormData('bathrooms', e.target.value)}
            placeholder="1"
            type="number"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea 
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          placeholder="Tell us about your space"
          rows={4}
        />
      </div>
    </div>
  );

  const renderPhotoUpload = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        High-quality photos significantly increase your chances of getting bookings. 
        Upload at least 5 photos of your space.
      </p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <div className="flex flex-col items-center">
          <Button variant="outline" className="mb-4">Upload Photos</Button>
          <span className="text-sm text-muted-foreground">
            JPG, PNG or GIF, up to 5MB each
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
        {/* This would display uploaded photos in a real implementation */}
        <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
          <span className="text-sm text-gray-400">Photo 1</span>
        </div>
        <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
          <span className="text-sm text-gray-400">Photo 2</span>
        </div>
        <div className="aspect-square bg-gray-100 rounded flex items-center justify-center">
          <span className="text-sm text-gray-400">Photo 3</span>
        </div>
      </div>
    </div>
  );

  const renderAmenities = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Select the amenities your home offers to guests.
      </p>
      
      <div className="grid grid-cols-2 gap-3">
        {['WiFi', 'Air conditioning', 'Kitchen', 'Washer/Dryer', 'TV', 'Elevator', 'Doorman', 'Pool', 
          'Gym', 'Balcony', 'Pet-friendly', 'Fire extinguisher'].map(amenity => (
          <div key={amenity} className="flex items-center">
            <input 
              type="checkbox" 
              id={`amenity-${amenity}`}
              className="h-4 w-4 rounded border-gray-300 text-brand focus:ring-brand"
              onChange={(e) => {
                if (e.target.checked) {
                  updateFormData('amenities', [...formData.amenities, amenity]);
                } else {
                  updateFormData('amenities', formData.amenities.filter(a => a !== amenity));
                }
              }}
              checked={formData.amenities.includes(amenity)}
            />
            <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm">
              {amenity}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPricing = () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground mb-4">
        Set your nightly price. You can always adjust this later.
      </p>
      
      <div>
        <Label htmlFor="price">Nightly Price ($)*</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <Input 
            id="price"
            type="number"
            className="pl-7"
            placeholder="150"
            value={formData.price}
            onChange={(e) => updateFormData('price', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div className="bg-brand/5 p-4 rounded-lg border border-brand/10 mt-6">
        <h4 className="font-medium mb-2">Kiki's Smart Pricing Suggestion</h4>
        <p className="text-sm text-muted-foreground mb-2">
          Based on similar listings in {formData.neighborhood || 'your neighborhood'}, we recommend:
        </p>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-brand">$175 - $225</span>
          <span className="text-sm text-muted-foreground">per night</span>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-4">
        <h4 className="font-medium text-green-800 flex items-center gap-2">
          <Check size={18} className="text-green-600" />
          Almost done!
        </h4>
        <p className="text-sm text-green-700 mt-1">
          Your listing is ready to go. Review the details below before publishing.
        </p>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="text-sm font-medium text-gray-500">Location</h4>
          <p>{formData.address}, {formData.neighborhood}</p>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Property</h4>
          <p>{formData.propertyType} · {formData.bedrooms} bed · {formData.bathrooms} bath</p>
        </div>
        
        {formData.amenities.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500">Amenities</h4>
            <p>{formData.amenities.join(', ')}</p>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium text-gray-500">Price</h4>
          <p className="font-medium">${formData.price} per night</p>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'basicInfo':
        return renderBasicInfo();
      case 'photos':
        return renderPhotoUpload();
      case 'amenities':
        return renderAmenities();
      case 'pricing':
        return renderPricing();
      case 'confirmation':
        return renderConfirmation();
    }
  };

  return (
    <>
      {renderStepIndicator()}
      <div className="py-2">
        {renderCurrentStep()}
      </div>
      <DialogFooter className="mt-6">
        {currentStep !== 'basicInfo' && (
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePreviousStep}
            className="mr-2"
          >
            Back
          </Button>
        )}
        <Button 
          type="button"
          onClick={handleNextStep}
          className="bg-brand hover:bg-brand/90"
        >
          {currentStep === 'confirmation' ? 'Publish Listing' : 'Continue'}
        </Button>
      </DialogFooter>
    </>
  );
};

export default HomeListingForm;
