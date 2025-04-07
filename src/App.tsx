
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
import { SignUpProvider } from "./contexts/SignUpContext";

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
});

const App = () => (
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SignUpProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
