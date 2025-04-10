
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

const FrequentlyAskedQuestions = () => {
  const faqs: FAQ[] = [
    {
      question: 'How do I edit my profile?',
      answer: 'You can edit your profile by clicking on the "Edit Profile" button on this page. From there, you can update your name, email, and profile picture.'
    },
    {
      question: 'What is my invite code for?',
      answer: 'Your unique invite code allows friends to join Kiki with special benefits. Share it with friends and both of you will receive booking credits when they sign up.'
    },
    {
      question: 'How do I manage my bookings?',
      answer: 'You can view and manage all your bookings in the "Booking Requests" section of your profile. Click on any booking to see details or make changes.'
    },
    {
      question: 'Can I change my payment method?',
      answer: 'Yes, you can update your payment methods by visiting the "Payment Methods" section in your account settings.'
    }
  ];

  return (
    <Card id="faq">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>Get answers to common questions</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full border-brand text-brand hover:bg-brand/10">
          Contact Support
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FrequentlyAskedQuestions;
