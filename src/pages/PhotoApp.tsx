
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, Upload, Plus } from "lucide-react";
import Feed from '@/components/photo-app/Feed';
import Profile from '@/components/photo-app/Profile';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const PhotoApp: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) {
      toast.error('Please select an image to upload');
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsUploadOpen(false);
      setSelectedImage(null);
      setCaption('');
      
      toast.success('Photo uploaded successfully', {
        description: 'Your photo has been added to the feed'
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand">Dan's Photo App</h1>
          <div className="flex items-center gap-4">
            <Button 
              onClick={() => setIsUploadOpen(true)}
              variant="outline" 
              size="sm"
              className="flex items-center gap-2 border-brand text-brand hover:bg-brand/10"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-brand">
              Back to Kiki
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-6 px-4 max-w-3xl">
        <Tabs defaultValue="feed">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="feed" className="flex items-center gap-2">
              <Home size={18} />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User size={18} />
              <span>My Profile</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="feed">
            <Feed />
          </TabsContent>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload a photo</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!selectedImage ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-4">Click to select a photo or drag and drop</p>
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                >
                  Select Photo
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-md">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => setSelectedImage(null)}
                  >
                    Change
                  </Button>
                </div>
                <Textarea
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={3}
                />
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsUploadOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!selectedImage || isUploading}>
                {isUploading ? 'Uploading...' : 'Post'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoApp;
