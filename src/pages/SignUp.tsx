
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  Box, 
  Avatar, 
  Container, 
  Grid, 
  InputAdornment
} from '@mui/material';
import { Instagram, Person, Email, PhotoCamera } from '@mui/icons-material';
import { useSignUp } from '@/contexts/SignUpContext';
import { useToast } from '@/hooks/use-toast';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { inviteCode, firstName, setFirstName, lastName, setLastName, email, setEmail, instagram, setInstagram, setProfilePhoto, photoPreviewUrl, setPhotoPreviewUrl } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', py: 4 }}>
      <Card sx={{ width: '100%', boxShadow: 3 }}>
        <Box sx={{ textAlign: 'center', pt: 3, pb: 1 }}>
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Create your account
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Complete your profile to join Kiki
          </Typography>
        </Box>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <input
                  accept="image/*"
                  id="profilePhoto"
                  type="file"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="profilePhoto">
                  <Box sx={{ position: 'relative', cursor: 'pointer' }}>
                    <Avatar 
                      sx={{ 
                        width: 100, 
                        height: 100,
                        border: '2px dashed',
                        borderColor: 'primary.light'
                      }}
                      src={photoPreviewUrl}
                    >
                      {!photoPreviewUrl && <PhotoCamera />}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                      {photoPreviewUrl ? 'Change photo' : 'Add photo'}
                    </Typography>
                  </Box>
                </label>
              </Box>
            </Box>
            
            <Grid container spacing={2}>
              <Grid component="div" sx={{ gridColumn: 'span 6' }}>
                <TextField
                  fullWidth
                  required
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid component="div" sx={{ gridColumn: 'span 6' }}>
                <TextField
                  fullWidth
                  required
                  id="lastName"
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid component="div" sx={{ gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  required
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid component="div" sx={{ gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  required
                  id="instagram"
                  label="Instagram Handle"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value.replace(/^@/, ''))}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Instagram fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ 
                mt: 4, 
                py: 1.5,
                color: 'white',
                backgroundColor: '#1FA598',
                '&:hover': {
                  backgroundColor: '#1a8a80',
                }
              }}
            >
              {isLoading ? "Creating account..." : "Complete Sign Up"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
