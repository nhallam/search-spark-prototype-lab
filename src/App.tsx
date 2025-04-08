
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Index from "./pages/Index";
import PropertyDetails from "./pages/PropertyDetails";
import NotFound from "./pages/NotFound";
import InviteCode from "./pages/InviteCode";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/Welcome";
import PhotoApp from "./pages/PhotoApp";
import Profile from "./pages/Profile";
import { SignUpProvider } from "./contexts/SignUpContext";
import TabNavigation from "./components/TabNavigation";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: '#1FA598', // Changed from blue to the welcome page green
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

const App = () => {
  const getActiveTab = () => {
    const path = window.location.pathname;
    
    if (path === '/') return 'explore';
    if (path.includes('/property')) return 'explore';
    if (path.includes('/home')) return 'home';
    if (path === '/profile') return 'profile';
    
    return undefined;
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SignUpProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/invite" element={<InviteCode />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/photos" element={<PhotoApp />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <TabNavigation activeTab={getActiveTab()} />
            </BrowserRouter>
          </SignUpProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
