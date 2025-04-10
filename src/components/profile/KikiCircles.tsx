
import React from 'react';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Connection } from '@/data/photoAppData';

interface KikiCirclesProps {
  connections: Connection[];
  openInviteDialog: () => void;
}

const KikiCircles: React.FC<KikiCirclesProps> = ({ connections, openInviteDialog }) => {
  return (
    <Card className="bg-white shadow-sm border-brand/10" id="kiki-circles">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Users size={20} />
            Kiki Circles
          </span>
        </CardTitle>
        <CardDescription>Your connections on Kiki</CardDescription>
      </CardHeader>
      <CardContent>
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
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full border-brand text-brand hover:bg-brand/10" onClick={openInviteDialog}>
          Invite Friends
        </Button>
      </CardFooter>
    </Card>
  );
};

export default KikiCircles;
