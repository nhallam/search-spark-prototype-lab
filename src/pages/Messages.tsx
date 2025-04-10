import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: 'Emily Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Is the apartment still available?',
    timestamp: '2:30 PM',
    unread: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Thanks for accepting my booking!',
    timestamp: 'Yesterday',
    unread: false,
  },
  {
    id: 3,
    name: 'Sarah Williams',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'I\'ll be arriving around 3pm.',
    timestamp: 'Apr 10',
    unread: false,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=4',
    lastMessage: 'Is parking available nearby?',
    timestamp: 'Apr 9',
    unread: false,
  },
  {
    id: 5,
    name: 'Jessica Lee',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'The place was amazing, thank you!',
    timestamp: 'Apr 8',
    unread: false,
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: 1,
    senderId: 2,
    text: 'Hi there! I was wondering if your apartment is still available for the dates I selected?',
    timestamp: '2:15 PM',
  },
  {
    id: 2,
    senderId: 1,
    text: 'Yes, it\'s still available! Were you looking to book for May 15-20?',
    timestamp: '2:20 PM',
  },
  {
    id: 3,
    senderId: 2,
    text: 'That\'s right. Do you offer any discounts for a 5-day stay?',
    timestamp: '2:25 PM',
  },
  {
    id: 4,
    senderId: 1,
    text: 'I could offer a 10% discount for that duration. Would that work for you?',
    timestamp: '2:28 PM',
  },
  {
    id: 5,
    senderId: 2,
    text: 'That sounds great! I\'ll proceed with the booking then.',
    timestamp: '2:30 PM',
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const isMobile = useIsMobile();
  
  const filteredConversations = mockConversations.filter(
    convo => convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const ConversationList = () => (
    <div className="w-full md:w-1/3 border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search conversations..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-[calc(100vh-180px)]">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
              selectedConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
            onClick={() => setSelectedConversation(conversation.id)}
          >
            <Avatar>
              <AvatarImage src={conversation.avatar} alt={conversation.name} />
              <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{conversation.name}</h3>
                <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                {conversation.unread && (
                  <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0"></span>
                )}
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
  
  const MessageView = () => {
    const currentConversation = mockConversations.find(c => c.id === selectedConversation);
    
    if (!currentConversation) {
      return (
        <div className="w-full md:w-2/3 flex items-center justify-center h-[calc(100vh-116px)]">
          <div className="text-center">
            <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">Choose a conversation from the list to start messaging</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full md:w-2/3 flex flex-col h-[calc(100vh-116px)]">
        <div className="p-4 border-b flex items-center gap-3">
          <Avatar>
            <AvatarImage src={currentConversation.avatar} alt={currentConversation.name} />
            <AvatarFallback>{currentConversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{currentConversation.name}</h2>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {mockMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
              >
                <Card className={`max-w-[80%] ${message.senderId === 1 ? 'bg-primary text-primary-foreground' : ''}`}>
                  <CardContent className="p-3">
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${message.senderId === 1 ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {message.timestamp}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  // For mobile, we show either the conversation list or the message view
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col bg-background pb-16">
        {selectedConversation ? (
          <>
            <Button 
              variant="ghost" 
              className="ml-2 mt-2 w-fit" 
              onClick={() => setSelectedConversation(null)}
            >
              ← Back to conversations
            </Button>
            <MessageView />
          </>
        ) : (
          <ConversationList />
        )}
      </div>
    );
  }
  
  // For desktop, we show both side by side
  return (
    <div className="h-screen flex flex-col bg-background pb-16">
      <div className="flex flex-1 overflow-hidden">
        <ConversationList />
        <MessageView />
      </div>
    </div>
  );
};

export default Messages;
