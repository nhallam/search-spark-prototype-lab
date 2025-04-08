
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSignUp } from '@/contexts/SignUpContext';
import { useToast } from '@/hooks/use-toast';
import { Google } from '@mui/icons-material';

// Valid email domains for demonstration purposes
const VALID_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const EmailInput: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { setEmail: setContextEmail, inviteCode } = useSignUp();
  const { toast } = useToast();

  // Redirect if no invite code
  React.useEffect(() => {
    if (!inviteCode) {
      navigate('/invite');
    }
  }, [inviteCode, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple email validation
    if (!VALID_EMAIL_REGEX.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate network request with a timeout
    setTimeout(() => {
      setContextEmail(email);
      toast({
        title: "Email received",
        description: "We'll send a verification code to this email.",
      });
      navigate('/verify');
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    
    // Simulate Google sign-in process with a timeout
    setTimeout(() => {
      // In a real app, this would use the Google OAuth API
      const mockGoogleEmail = "user@gmail.com";
      setContextEmail(mockGoogleEmail);
      toast({
        title: "Google sign-in successful",
        description: "Welcome to Kiki!",
      });
      navigate('/signup');
      setIsGoogleLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Welcome to Kiki</CardTitle>
          <CardDescription className="text-lg">
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Your email address"
                className="py-6"
                autoComplete="email"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full text-white" 
              disabled={!email || isLoading}
              style={{ backgroundColor: '#1FA598' }}
            >
              {isLoading ? "Processing..." : "Continue with Email"}
            </Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-2 text-sm text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button 
            type="button" 
            variant="outline" 
            className="w-full h-11 bg-white hover:bg-gray-50" 
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <Google className="mr-2 h-5 w-5" />
            {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInput;
