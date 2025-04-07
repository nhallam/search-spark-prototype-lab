
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/contexts/SignUpContext';
import { Instagram, User, Mail, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { inviteCode, firstName, setFirstName, lastName, setLastName, email, setEmail, instagram, setInstagram } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>('');

  // Redirect to invite page if no valid invite code
  useEffect(() => {
    if (!inviteCode) {
      navigate('/invite');
    }
  }, [inviteCode, navigate]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive",
        });
        return;
      }
      
      // Check file type
      if (!selectedFile.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      setProfilePhoto(selectedFile);
      setPhotoPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Form validation
    if (!firstName || !lastName || !email || !instagram) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate network request with a timeout
    setTimeout(() => {
      toast({
        title: "Sign up successful",
        description: "Welcome to Kiki!",
      });
      navigate('/welcome');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Create your account</CardTitle>
          <CardDescription className="text-lg">
            Complete your profile to join Kiki
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Label htmlFor="profilePhoto" className="cursor-pointer block">
                  <Avatar className="h-24 w-24 border-2 border-dashed border-gray-300 hover:border-primary">
                    {photoPreviewUrl ? (
                      <AvatarImage src={photoPreviewUrl} alt="Profile preview" />
                    ) : (
                      <AvatarFallback className="bg-muted flex items-center justify-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <span className="block text-center text-sm mt-2 text-muted-foreground">
                    {profilePhoto ? 'Change photo' : 'Add photo'}
                  </span>
                </Label>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram Handle</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="instagram"
                  placeholder="@yourusername"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace(/^@/, ''))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-gray-900" 
              disabled={isLoading}
              style={{ backgroundColor: '#1FA598' }}
            >
              {isLoading ? "Creating account..." : "Complete Sign Up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
