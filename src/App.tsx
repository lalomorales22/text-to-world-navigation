
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TextToText from "./pages/TextToText";
import TextToImage from "./pages/TextToImage";
import TextToVideo from "./pages/TextToVideo";
import TextToGame from "./pages/TextToGame";
import TextToSoftware from "./pages/TextToSoftware";
import TextToWorld from "./pages/TextToWorld";
import TextToTelepathy from "./pages/TextToTelepathy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/text-to-text" element={<TextToText />} />
          <Route path="/text-to-image" element={<TextToImage />} />
          <Route path="/text-to-video" element={<TextToVideo />} />
          <Route path="/text-to-game" element={<TextToGame />} />
          <Route path="/text-to-software" element={<TextToSoftware />} />
          <Route path="/text-to-world" element={<TextToWorld />} />
          <Route path="/text-to-telepathy" element={<TextToTelepathy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
