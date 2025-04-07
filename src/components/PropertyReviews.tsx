
import React, { useState, useMemo } from 'react';
import { Avatar, Box, Typography, Rating, Button, Card, CardContent, Chip, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { ArrowUpDown, ThumbsUp, CalendarDays } from 'lucide-react';
import { Review } from './PropertyCard';

type SortOption = 'recent' | 'highest' | 'lowest';

type PropertyReviewsProps = {
  reviews: Review[];
};

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ reviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('recent');

  const handleSortChange = (
    _event: React.MouseEvent<HTMLElement>,
    newSort: SortOption | null,
  ) => {
    if (newSort) {
      setSortOption(newSort);
    }
  };

  const sortedReviews = useMemo(() => {
    const reviewsCopy = [...reviews];
    
    switch (sortOption) {
      case 'recent':
        return reviewsCopy.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      case 'highest':
        return reviewsCopy.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return reviewsCopy.sort((a, b) => a.rating - b.rating);
      default:
        return reviewsCopy;
    }
  }, [reviews, sortOption]);

  const displayedReviews = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <Box sx={{ mt: 6 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h3" fontWeight="bold">
          Reviews ({reviews.length})
        </Typography>
        <Box display="flex" alignItems="center">
          <Rating value={averageRating} precision={0.1} readOnly />
          <Typography variant="body1" ml={1}>
            {averageRating.toFixed(1)}
          </Typography>
        </Box>
      </Box>
      
      <Stack direction="row" spacing={2} alignItems="center" mb={4}>
        <Typography variant="body1">Sort by:</Typography>
        <ToggleButtonGroup
          value={sortOption}
          exclusive
          onChange={handleSortChange}
          aria-label="sort reviews"
          size="small"
        >
          <ToggleButton value="recent" aria-label="recent">
            <CalendarDays className="h-4 w-4 mr-1" />
            Recent
          </ToggleButton>
          <ToggleButton value="highest" aria-label="highest rating">
            <ThumbsUp className="h-4 w-4 mr-1" />
            Highest
          </ToggleButton>
          <ToggleButton value="lowest" aria-label="lowest rating">
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Lowest
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack spacing={3}>
        {displayedReviews.map((review) => (
          <Card key={review.id} variant="outlined">
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={review.user.avatar}
                    alt={review.user.name}
                    sx={{ width: 50, height: 50, mr: 2 }}
                  >
                    {review.user.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{review.user.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(parseISO(review.date), 'MMM d, yyyy')}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={review.rating} readOnly />
              </Box>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {review.comment}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      
      {reviews.length > 3 && (
        <Box textAlign="center" mt={3}>
          <Button 
            variant="outlined"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PropertyReviews;
