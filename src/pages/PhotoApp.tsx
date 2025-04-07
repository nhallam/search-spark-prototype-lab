
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User } from "lucide-react";
import Feed from '@/components/photo-app/Feed';
import Profile from '@/components/photo-app/Profile';

const PhotoApp: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="border-b bg-white p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand">Dan's Photo App</h1>
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
    </div>
  );
};

export default PhotoApp;
