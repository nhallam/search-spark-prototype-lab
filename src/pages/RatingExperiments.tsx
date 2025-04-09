
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { Avatar } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { mockReviews } from "@/data/mockReviews";
import { format, parseISO } from 'date-fns';
import { getReviewsForProperty } from "@/data/mockReviews";
import { useToast } from "@/hooks/use-toast";

// Schema for review form validation
const reviewSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  review: z.string().min(10, { message: "Review must be at least 10 characters." }),
  rating: z.number().min(1, { message: "Rating must be at least 1 star." }).max(5)
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const RatingExperiments: React.FC = () => {
  const [reviews, setReviews] = useState(getReviewsForProperty("1"));
  const { toast } = useToast();
  
  // Create form with validation
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: "",
      review: "",
      rating: 0
    },
  });
  
  const [hoverRating, setHoverRating] = useState(0);
  
  const onSubmit = (data: ReviewFormValues) => {
    // In a real app, this would call an API endpoint
    const newReview = {
      id: `custom-${Date.now()}`,
      userId: `user-${Date.now()}`,
      propertyId: "1",
      rating: data.rating,
      comment: data.review,
      date: new Date().toISOString(),
      user: {
        name: data.name,
        avatar: "" // No avatar for new reviews
      }
    };
    
    setReviews([newReview, ...reviews]);
    form.reset();
    
    toast({
      title: "Review submitted",
      description: "Thank you for sharing your experience!"
    });
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-8">Rating & Reviews Experiments</h1>
      
      {/* Rating Summary */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Overall Rating</CardTitle>
          <CardDescription>Based on {reviews.length} reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold">
              {(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)}
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`h-6 w-6 ${
                    star <= Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
                      ? "fill-yellow-400 text-yellow-400" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Review Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Write a Review</CardTitle>
          <CardDescription>Share your experience with others</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`h-8 w-8 cursor-pointer ${
                              star <= (hoverRating || field.value) 
                                ? "fill-yellow-400 text-yellow-400" 
                                : "text-gray-300"
                            }`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => field.onChange(star)}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Review</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your thoughts about this property..." 
                        className="min-h-32" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit">Submit Review</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      {/* Reviews List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Reviews ({reviews.length})</h2>
        
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {review.user.avatar ? (
                    <Avatar 
                      src={review.user.avatar} 
                      alt={review.user.name} 
                      sx={{ width: 48, height: 48 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 48, height: 48 }}>
                      {review.user.name.charAt(0)}
                    </Avatar>
                  )}
                  <div>
                    <h3 className="font-medium">{review.user.name}</h3>
                    <p className="text-sm text-gray-500">
                      {format(parseISO(review.date), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`h-5 w-5 ${
                        star <= review.rating 
                          ? "fill-yellow-400 text-yellow-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-4">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RatingExperiments;
