
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useSignUp } from '@/contexts/SignUpContext';
import { useToast } from '@/hooks/use-toast';

// Valid invite codes for demonstration purposes
const VALID_CODES = ['12345', '67890', '55555'];

const InviteCode: React.FC = () => {
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setInviteCode } = useSignUp();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request with a timeout
    setTimeout(() => {
      if (VALID_CODES.includes(code)) {
        setInviteCode(code);
        toast({
          title: "Valid invite code",
          description: "Welcome to the club! Proceeding to sign up.",
        });
        navigate('/signup');
      } else {
        toast({
          title: "Invalid invite code",
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
          <CardTitle className="text-3xl font-bold mb-2">Join the club</CardTitle>
          <CardDescription className="text-lg">
            We're an exclusive invite only sublet club in NYC
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground text-center mb-4">
                Enter your 5-digit invitation code
              </p>
              <div className="flex justify-center">
                <InputOTP
                  maxLength={5}
                  value={code}
                  onChange={setCode}
                  render={({ slots }) => (
                    <InputOTPGroup className="gap-2">
                      {slots.map((slot, index) => (
                        <InputOTPSlot key={index} {...slot} index={index} className="w-12 h-12 text-xl" />
                      ))}
                    </InputOTPGroup>
                  )}
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={code.length !== 5 || isLoading}
              style={{ backgroundColor: '#1FA598', hover: 'opacity-90' }}
            >
              {isLoading ? "Verifying..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteCode;
