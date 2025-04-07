
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  timestamp: string;
  comments: Comment[];
  liked?: boolean;
}

// Main user data (me)
export const currentUser: User = {
  id: "user1",
  username: "dan_photos",
  fullName: "Daniel",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
  bio: "📸 Nature and architecture photographer. Travel enthusiast. Based in New York.",
  followers: 1248,
  following: 562
};

// Mock Posts Data
export const posts: Post[] = [
  {
    id: "post1",
    userId: "user2",
    username: "nature_lover",
    userAvatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=1200&h=900",
    caption: "Found these beautiful deer while hiking at dawn. The morning light was perfect! #nature #wildlife",
    likes: 283,
    timestamp: "2023-04-15T10:30:00Z",
    comments: [
      {
        id: "comment1",
        userId: "user3",
        username: "wildlife_photo",
        text: "Amazing shot! The lighting is perfect.",
        timestamp: "2023-04-15T11:05:00Z"
      },
      {
        id: "comment2",
        userId: "user1",
        username: "dan_photos",
        text: "Beautiful deer and great composition!",
        timestamp: "2023-04-15T12:45:00Z"
      }
    ]
  },
  {
    id: "post2",
    userId: "user3",
    username: "architecture_view",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1527576539890-dfa815648363?auto=format&fit=crop&w=1200&h=900",
    caption: "Modern architecture study. Love these clean lines and reflections. #architecture #urban",
    likes: 576,
    timestamp: "2023-04-13T16:20:00Z",
    comments: [
      {
        id: "comment3",
        userId: "user4",
        username: "design_addict",
        text: "The symmetry is so satisfying here",
        timestamp: "2023-04-13T18:12:00Z"
      }
    ]
  },
  {
    id: "post3",
    userId: "user5",
    username: "mountain_explorer",
    userAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&h=900",
    caption: "The incredible waterfall we discovered after hiking for 3 hours. Worth every step! #hiking #waterfall",
    likes: 892,
    timestamp: "2023-04-10T14:45:00Z",
    comments: []
  },
  {
    id: "post4",
    userId: "user1",
    username: "dan_photos",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=1200&h=900",
    caption: "My morning hike view. Nothing beats mountain reflections in a still lake. #mountains #reflection #nature",
    likes: 452,
    timestamp: "2023-04-09T08:30:00Z",
    comments: [
      {
        id: "comment4",
        userId: "user2",
        username: "nature_lover",
        text: "This is spectacular! Where is this?",
        timestamp: "2023-04-09T09:15:00Z"
      }
    ]
  },
  {
    id: "post5",
    userId: "user1",
    username: "dan_photos",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&h=900",
    caption: "Forest therapy session today. The sunlight through the trees is magical. #forest #nature",
    likes: 318,
    timestamp: "2023-04-05T15:20:00Z",
    comments: []
  },
  {
    id: "post6",
    userId: "user6",
    username: "cityscape_pro",
    userAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1200&h=900",
    caption: "Downtown at dusk. The city comes alive as the sun goes down. #cityscape #urban #architecture",
    likes: 725,
    timestamp: "2023-04-03T19:15:00Z",
    comments: [
      {
        id: "comment5",
        userId: "user1",
        username: "dan_photos",
        text: "Great composition with the leading lines!",
        timestamp: "2023-04-03T20:05:00Z"
      }
    ]
  },
  {
    id: "post7",
    userId: "user1",
    username: "dan_photos",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120",
    imageUrl: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1200&h=900",
    caption: "Looking up at modern architecture. I love how the glass reflects the clouds. #architecture #abstract",
    likes: 537,
    timestamp: "2023-03-28T11:40:00Z",
    comments: []
  }
];

export const myPosts = posts.filter(post => post.userId === "user1");
