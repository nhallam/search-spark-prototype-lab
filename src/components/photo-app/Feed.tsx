
import React, { useState } from 'react';
import { posts as initialPosts, Post, Comment } from '@/data/photoAppData';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              liked: !post.liked 
            } 
          : post
      )
    );
  };

  const handleCommentChange = (postId: string, value: string) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value
    });
  };

  const handleAddComment = (postId: string) => {
    if (!commentInputs[postId]?.trim()) return;
    
    const newComment: Comment = {
      id: `comment${Date.now()}`,
      userId: "user1",
      username: "dan_photos",
      text: commentInputs[postId],
      timestamp: new Date().toISOString()
    };

    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              comments: [...post.comments, newComment]
            } 
          : post
      )
    );

    // Clear the input
    setCommentInputs({
      ...commentInputs,
      [postId]: ''
    });
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (e) {
      return 'recently';
    }
  };

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <Card key={post.id} className="overflow-hidden">
          <CardHeader className="p-4 pb-0">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={post.userAvatar} alt={post.username} />
                <AvatarFallback>{post.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.username}</div>
              </div>
            </div>
          </CardHeader>
          
          <img 
            src={post.imageUrl} 
            alt={post.caption} 
            className="w-full aspect-[4/3] object-cover"
          />
          
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={post.liked ? 'text-red-500' : ''}
                  onClick={() => handleLike(post.id)}
                >
                  <Heart className={post.liked ? 'fill-red-500' : ''} size={22} />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle size={22} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Send size={22} />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark size={22} />
              </Button>
            </div>
            
            <div className="font-medium mb-1">{post.likes} likes</div>
            
            <div className="mb-2">
              <span className="font-medium">{post.username}</span>{' '}
              <span>{post.caption}</span>
            </div>
            
            {post.comments.length > 0 && (
              <div className="space-y-1 mb-3">
                {post.comments.length > 2 && (
                  <div className="text-sm text-gray-500">
                    View all {post.comments.length} comments
                  </div>
                )}
                {post.comments.slice(-2).map(comment => (
                  <div key={comment.id} className="text-sm">
                    <span className="font-medium">{comment.username}</span>{' '}
                    <span>{comment.text}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-500">
              {formatTimestamp(post.timestamp)}
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="p-3">
            <div className="flex items-center w-full">
              <Input 
                placeholder="Add a comment..." 
                className="border-0 flex-1"
                value={commentInputs[post.id] || ''}
                onChange={(e) => handleCommentChange(post.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(post.id);
                  }
                }}
              />
              <Button 
                variant="ghost"
                className="text-brand font-medium"
                onClick={() => handleAddComment(post.id)}
                disabled={!commentInputs[post.id]?.trim()}
              >
                Post
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Feed;
