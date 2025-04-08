
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/contexts/SignUpContext';
import { useToast } from '@/hooks/use-toast';
import { AtSign } from 'lucide-react';

const EmailInput: React.FC = () => {
  const [inputEmail, setInputEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setEmail, inviteCode, setIsExistingUser } = useSignUp();
  const { toast } = useToast();

  useEffect(() => {
    // If no invite code is set, redirect to invite page
    if (!inviteCode) {
      navigate('/invite');
    }
  }, [inviteCode, navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmail)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Check if email has @kiki.club domain (existing user)
    setTimeout(() => {
      const isExisting = inputEmail.toLowerCase().endsWith('@kiki.club');
      setIsExistingUser(isExisting);
      setEmail(inputEmail);
      
      if (isExisting) {
        toast({
          title: "Welcome back!",
          description: "We found an existing account with this email",
        });
      }
      
      navigate('/verify');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">Join Kiki</CardTitle>
          <CardDescription className="text-lg">
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={inputEmail}
                  onChange={handleEmailChange}
                  className="pl-10"
                  autoComplete="email"
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full text-white" 
              disabled={!inputEmail || isLoading}
              style={{ backgroundColor: '#1FA598' }}
            >
              {isLoading ? "Checking..." : "Continue"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInput;
