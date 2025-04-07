
import { Review } from '../components/PropertyCard';

export const mockReviews: Record<string, Review[]> = {
  '1': [
    {
      id: '101',
      userId: '201',
      propertyId: '1',
      rating: 5,
      comment: "This place was absolutely stunning! The views were incredible and the location was perfect for exploring the city. The host was very responsive and accommodating.",
      date: '2025-03-15',
      user: {
        name: 'Jennifer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '102',
      userId: '202',
      propertyId: '1',
      rating: 4,
      comment: "Great location and beautiful apartment. The only minor issue was that the WiFi was a bit slow during peak hours, but otherwise everything was perfect.",
      date: '2025-02-28',
      user: {
        name: 'Marcus',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '103',
      userId: '203',
      propertyId: '1',
      rating: 5,
      comment: "One of the best places I've ever stayed! The bed was incredibly comfortable and the kitchen had everything we needed. I'll definitely be back!",
      date: '2025-02-14',
      user: {
        name: 'Sophia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '104',
      userId: '204',
      propertyId: '1',
      rating: 3,
      comment: "The place was nice but a bit smaller than it appeared in photos. Location was great though and the host was very helpful.",
      date: '2025-01-20',
      user: {
        name: 'David',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '2': [
    {
      id: '201',
      userId: '205',
      propertyId: '2',
      rating: 5,
      comment: "This cozy studio was perfect for our weekend getaway. The neighborhood had so many great cafes and restaurants within walking distance.",
      date: '2025-03-10',
      user: {
        name: 'Emma',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '202',
      userId: '206',
      propertyId: '2',
      rating: 4,
      comment: "Great value for the location. The apartment had everything we needed for a comfortable stay.",
      date: '2025-02-20',
      user: {
        name: 'Jack',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '3': [
    {
      id: '301',
      userId: '207',
      propertyId: '3',
      rating: 5,
      comment: "Absolutely incredible luxury apartment. The views of the city skyline are breathtaking, especially at night.",
      date: '2025-03-05',
      user: {
        name: 'Rebecca',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '4': [
    {
      id: '401',
      userId: '208',
      propertyId: '4',
      rating: 5,
      comment: "This bright studio exceeded all my expectations. The natural light was amazing and the bed was super comfortable.",
      date: '2025-03-12',
      user: {
        name: 'Alex',
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '402',
      userId: '209',
      propertyId: '4',
      rating: 4,
      comment: "Lovely space with great amenities. The only downside was street noise, but the host provided earplugs which was thoughtful.",
      date: '2025-02-25',
      user: {
        name: 'Laura',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '5': [
    {
      id: '501',
      userId: '210',
      propertyId: '5',
      rating: 5,
      comment: "This historic brownstone was the highlight of our trip. So much character and charm while still having all modern amenities.",
      date: '2025-03-18',
      user: {
        name: 'Michael',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '502',
      userId: '211',
      propertyId: '5',
      rating: 5,
      comment: "Absolutely wonderful place. The neighborhood is charming and the brownstone itself is beautifully maintained.",
      date: '2025-03-01',
      user: {
        name: 'Sarah',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '503',
      userId: '212',
      propertyId: '5',
      rating: 4,
      comment: "Beautiful property with lots of character. The stairs might be challenging for some, but it's mentioned in the description.",
      date: '2025-02-10',
      user: {
        name: 'Daniel',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '504',
      userId: '213',
      propertyId: '5',
      rating: 3,
      comment: "Nice place but a bit noisy from the street. Otherwise, it's a well-maintained property in a good location.",
      date: '2025-01-15',
      user: {
        name: 'Jessica',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '6': [
    {
      id: '601',
      userId: '214',
      propertyId: '6',
      rating: 5,
      comment: "The penthouse was even better than the photos! Luxurious in every way with stunning panoramic views.",
      date: '2025-03-15',
      user: {
        name: 'Thomas',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '602',
      userId: '215',
      propertyId: '6',
      rating: 5,
      comment: "Worth every penny for the incredible views and luxurious amenities. A truly unforgettable stay.",
      date: '2025-02-28',
      user: {
        name: 'Hannah',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '7': [
    {
      id: '701',
      userId: '216',
      propertyId: '7',
      rating: 4,
      comment: "Great central location. The apartment was clean and comfortable with easy access to all of Manhattan's attractions.",
      date: '2025-03-10',
      user: {
        name: 'Robert',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ],
  '8': [
    {
      id: '801',
      userId: '217',
      propertyId: '8',
      rating: 5,
      comment: "This artistic loft was the perfect spot for our creative retreat. The space inspired us and the neighborhood was full of great galleries.",
      date: '2025-03-05',
      user: {
        name: 'Rachel',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '802',
      userId: '218',
      propertyId: '8',
      rating: 4,
      comment: "Unique space with lots of character. Great for artists or anyone who appreciates creative design.",
      date: '2025-02-20',
      user: {
        name: 'Chris',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    },
    {
      id: '803',
      userId: '219',
      propertyId: '8',
      rating: 5,
      comment: "Loved the artistic touches throughout the loft. It felt like staying in a gallery but with all the comforts of home.",
      date: '2025-01-30',
      user: {
        name: 'Michelle',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80'
      }
    }
  ]
};

// Function to get reviews for a property
export const getReviewsForProperty = (propertyId: string): Review[] => {
  return mockReviews[propertyId] || [];
};
