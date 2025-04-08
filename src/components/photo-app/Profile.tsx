
import React from 'react';
import { currentUser, myPosts, connections } from '@/data/photoAppData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Grid3X3, Settings, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Profile: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <Avatar className="w-24 h-24">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
            <h2 className="text-xl font-bold">{currentUser.username}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit Profile</Button>
              <Button variant="ghost" size="icon">
                <Settings size={20} />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-center md:justify-start gap-6 mb-4">
            <div><span className="font-semibold">{myPosts.length}</span> posts</div>
            <div><span className="font-semibold">{currentUser.followers}</span> followers</div>
            <div><span className="font-semibold">{currentUser.following}</span> following</div>
          </div>
          
          <div>
            <h3 className="font-bold">{currentUser.fullName}</h3>
            <p className="mt-1 whitespace-pre-wrap">{currentUser.bio}</p>
          </div>
        </div>
      </div>
      
      {/* Kiki Circles Section */}
      <Card className="border border-gray-200">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <Users size={18} />
              Kiki Circles
            </CardTitle>
            <Button variant="outline" size="sm">Invite Friends</Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {connections.map(connection => (
              <div key={connection.id} className="flex flex-col items-center text-center">
                <Avatar className="w-16 h-16 mb-2">
                  <AvatarImage src={connection.avatar} alt={connection.username} />
                  <AvatarFallback>{connection.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className="font-medium text-sm">{connection.username}</p>
                <p className="text-xs text-gray-500">{connection.relationship}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full grid grid-cols-1 border-t">
          <TabsTrigger value="posts" className="flex items-center gap-2 py-2">
            <Grid3X3 size={16} />
            <span className="text-sm font-medium">POSTS</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="mt-2">
          <div className="grid grid-cols-3 gap-1">
            {myPosts.map(post => (
              <div key={post.id} className="aspect-square overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
