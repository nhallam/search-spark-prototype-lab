
import React from 'react';
import { currentUser, myPosts } from '@/data/photoAppData';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Grid3X3, Settings } from 'lucide-react';

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
      
      <div>
        <div className="flex items-center justify-center border-t">
          <Button variant="ghost" className="flex items-center gap-2 py-2 px-4">
            <Grid3X3 size={16} />
            <span className="text-sm font-medium">POSTS</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-3 gap-1 mt-1">
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
      </div>
    </div>
  );
};

export default Profile;
