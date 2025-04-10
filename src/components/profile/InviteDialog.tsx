
import React, { useState } from 'react';
import { Mail, Share2, Copy, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

interface InviteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  inviteCode: string;
}

const InviteDialog: React.FC<InviteDialogProps> = ({ isOpen, onOpenChange, inviteCode }) => {
  const [inviteMethod, setInviteMethod] = useState<'email' | 'link'>('email');
  const [emailInput, setEmailInput] = useState('');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleSendInvite = () => {
    if (inviteMethod === 'email' && emailInput) {
      // Simulate sending email invitation
      toast.success(`Invitation sent to ${emailInput}`);
      setInviteSuccess(true);
      setEmailInput('');
    } else if (inviteMethod === 'link') {
      // Copy invite link to clipboard
      const inviteLink = `https://kiki.com/invite?code=${inviteCode}`;
      navigator.clipboard.writeText(inviteLink);
      toast.success('Invite link copied to clipboard');
      setInviteSuccess(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite Friends to Kiki</DialogTitle>
          <DialogDescription>
            Share Kiki with your friends and you&apos;ll both receive $30 in booking credits.
          </DialogDescription>
        </DialogHeader>
        
        {!inviteSuccess ? (
          <>
            <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setInviteMethod(value as 'email' | 'link')}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </TabsTrigger>
                <TabsTrigger value="link" className="flex items-center gap-2">
                  <Share2 size={16} />
                  Share Link
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Friend&apos;s Email</Label>
                  <Input 
                    id="email" 
                    placeholder="friend@example.com" 
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                </div>
                <div className="bg-brand/5 p-3 rounded-lg border border-brand/10 text-sm">
                  <p>We&apos;ll send them an invitation with your personal invite code.</p>
                </div>
              </TabsContent>
              <TabsContent value="link" className="mt-4 space-y-4">
                <div className="space-y-2">
                  <Label>Your Invite Link</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={`https://kiki.com/invite?code=${inviteCode}`}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button variant="outline" size="icon" onClick={() => {
                      navigator.clipboard.writeText(`https://kiki.com/invite?code=${inviteCode}`);
                      toast.success('Invite link copied to clipboard');
                    }}>
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                <div className="bg-brand/5 p-3 rounded-lg border border-brand/10 text-sm">
                  <p>Share this link via message, social media, or email.</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="space-y-3 my-4">
              <h3 className="font-medium text-lg">How it works</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-medium">1</div>
                  <div className="flex-1">
                    <p className="font-medium">{inviteMethod === 'email' ? 'Send an invite email' : 'Share your unique link'}</p>
                    <p className="text-sm text-muted-foreground">
                      {inviteMethod === 'email' 
                        ? "We'll send your friend an email with your invitation." 
                        : 'Share your invite link with friends via text, email, or social media.'}
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-medium">2</div>
                  <div className="flex-1">
                    <p className="font-medium">Your friend creates an account</p>
                    <p className="text-sm text-muted-foreground">When they sign up using your invite code, they&apos;ll get $30 in credits.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white flex items-center justify-center font-medium">3</div>
                  <div className="flex-1">
                    <p className="font-medium">You earn $30 in credits</p>
                    <p className="text-sm text-muted-foreground">Once they complete their first booking, you&apos;ll receive $30 in Kiki credits.</p>
                  </div>
                </li>
              </ol>
            </div>
          </>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto bg-green-100 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Invitation Sent!</h3>
            <p className="text-muted-foreground">
              {inviteMethod === 'email' 
                ? "Your invitation has been sent. We'll notify you when your friend joins."
                : 'Your invite link has been copied to your clipboard. Share it with your friends!'}
            </p>
            <div className="bg-brand/5 p-4 rounded-lg border border-brand/10 mt-6">
              <p className="font-medium">Keep inviting and earn more</p>
              <p className="text-sm text-muted-foreground mt-1">
                You can invite up to 10 friends per month and earn up to $300 in credits.
              </p>
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!inviteSuccess ? (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button 
                className="bg-brand hover:bg-brand/90" 
                onClick={handleSendInvite}
                disabled={inviteMethod === 'email' && !emailInput}
              >
                {inviteMethod === 'email' ? 'Send Invitation' : 'Copy & Share'}
              </Button>
            </>
          ) : (
            <Button 
              className="bg-brand hover:bg-brand/90 w-full" 
              onClick={() => onOpenChange(false)}
            >
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
