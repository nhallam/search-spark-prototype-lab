
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  DollarSign, 
  Camera, 
  Home, 
  Calendar, 
  LogOut, 
  RotateCcw,
  Check,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'upcoming' | 'overdue' | 'in-progress';
  description: string;
  icon: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

interface BookingTimelineProps {
  events: TimelineEvent[];
}

const StatusIcon = ({ status }: { status: TimelineEvent['status'] }) => {
  switch (status) {
    case 'completed':
      return <Check className="h-4 w-4 text-green-500" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'upcoming':
      return <Clock className="h-4 w-4 text-gray-400" />;
    case 'overdue':
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    default:
      return null;
  }
};

const BookingTimeline: React.FC<BookingTimelineProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: TimelineEvent['status']) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-amber-500';
      case 'upcoming': return 'bg-gray-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: TimelineEvent['status']) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'upcoming': return 'Upcoming';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Booking Timeline</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <Accordion type="single" collapsible className="w-full">
          {events.map((event, index) => (
            <AccordionItem value={event.id} key={event.id}>
              <div className="relative">
                {index < events.length - 1 && (
                  <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                )}
                <AccordionTrigger className="py-3 hover:no-underline">
                  <div className="flex items-center w-full pr-4">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white ${getStatusColor(event.status)} mr-4 z-10`}>
                      {event.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-gray-500">{formatDate(event.date)}</div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`${getStatusColor(event.status)} bg-opacity-20 border-opacity-20 border-current px-2 py-0.5 text-xs flex items-center gap-1`}
                    >
                      <StatusIcon status={event.status} />
                      <span>{getStatusText(event.status)}</span>
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12 pr-4 text-gray-600">
                  <p className="mb-4">{event.description}</p>
                  {event.action && (
                    <Button 
                      size="sm" 
                      onClick={event.action.onClick}
                      disabled={event.action.disabled}
                      className="mt-2"
                    >
                      {event.action.label}
                    </Button>
                  )}
                </AccordionContent>
              </div>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default BookingTimeline;
