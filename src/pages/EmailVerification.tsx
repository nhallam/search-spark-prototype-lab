import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useSignUp } from '@/contexts/SignUpContext';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

// Mock list of existing user emails
const EXISTING_USERS = ['test@example.com', 'user@example.com', 'alex@example.com'];
const VALID_VERIFICATION_CODE = '555555';

const EmailVerification: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { email, inviteCode, isExistingUser, setIsVerified } = useSignUp();

  useEffect(() => {
    // If no email is set, redirect back to invite page
    if (!email) {
      navigate('/invite');
    }
    
    // Simulate sending verification code email
    toast({
      title: "Verification code sent",
      description: `A verification code has been sent to ${email}`,
    });
  }, [email, navigate, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate verification process
    setTimeout(() => {
      if (verificationCode === VALID_VERIFICATION_CODE) {
        setIsVerified(true);
        
        if (isExistingUser) {
          // Existing user, redirect to home after verification
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in.",
          });
          navigate('/');
        } else {
          // New user, redirect to complete profile
          toast({
            title: "Email verified!",
            description: "Please complete your profile.",
          });
          navigate('/signup');
        }
      } else {
        toast({
          title: "Invalid code",
          description: "Please check your code and try again.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2">
            {isExistingUser ? 'Welcome Back!' : 'Verify Your Email'}
          </CardTitle>
          <CardDescription className="text-lg">
            {isExistingUser 
              ? 'Enter the verification code to sign in' 
              : 'Enter the verification code we sent to your email'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center mb-4">
                We sent a code to <strong>{email}</strong>
              </p>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={verificationCode}
                  onChange={setVerificationCode}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={verificationCode.length !== 6 || isLoading}
              style={{ backgroundColor: '#1FA598' }}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
            
            <div className="mt-4 text-center">
              <button 
                type="button" 
                onClick={() => {
                  toast({
                    title: "Code resent",
                    description: `A new verification code has been sent to ${email}`,
                  });
                }}
                className="text-sm text-brand hover:underline"
                style={{ color: '#1FA598' }}
              >
                Didn't receive a code? Send again
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
