
import React from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileNavigation from '@/components/profile/ProfileNavigation';
import FrequentlyAskedQuestions from '@/components/profile/FrequentlyAskedQuestions';

const ProfileFaqs = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <ProfileHeader />
      <ProfileNavigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">Get answers to common questions about Kiki</p>
        </div>
        
        <FrequentlyAskedQuestions />
      </main>
    </div>
  );
};

export default ProfileFaqs;
