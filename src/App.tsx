import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import InviteCode from "./pages/InviteCode";
import EmailInput from "./pages/EmailInput";
import EmailVerification from "./pages/EmailVerification";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import PhotoApp from "./pages/PhotoApp";
import Profile from "./pages/Profile";
import YourHome from "./pages/YourHome";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import Notifications from "./pages/Notifications";
import NavigationMenu from "./pages/NavigationMenu";
import MarketAnalysis from "./pages/MarketAnalysis";
import MyHome from "./pages/MyHome";
import RatingExperiments from "./pages/RatingExperiments";
import { SignUpProvider } from "./contexts/SignUpContext";
import TabNavigation from "./components/TabNavigation";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1FA598',
    },
    secondary: {
      main: '#f50057',
    },
  },
  typography: {
    fontFamily: '"Faktum", "Inter", "system-ui", "Helvetica", "Arial", sans-serif',
    button: {
      textTransform: 'none',
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  
  const getActiveTab = () => {
    const path = location.pathname;
    
    if (path === '/') return 'explore';
    if (path.includes('/property')) return 'explore';
    if (path === '/bookings' || path.includes('/booking/')) return 'bookings';
    if (path === '/notifications') return 'notifications';
    if (path === '/my-home') return 'my-home';
    if (path === '/profile' || path === '/your-home') return 'profile';
    
    return undefined;
  };
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/invite" element={<InviteCode />} />
        <Route path="/email" element={<EmailInput />} />
        <Route path="/verify" element={<EmailVerification />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/photos" element={<PhotoApp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/your-home" element={<YourHome />} />
        <Route path="/my-home" element={<MyHome />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/booking/:id" element={<BookingDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/menu" element={<NavigationMenu />} />
        <Route path="/market-analysis" element={<MarketAnalysis />} />
        <Route path="/rating-experiments" element={<RatingExperiments />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <TabNavigation activeTab={getActiveTab()} />
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SignUpProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </SignUpProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
