import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import IDE from "./pages/IDE";
import Agents from "./pages/Agents";
import Projects from "./pages/Projects";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import { TopNav } from "./components/TopNav";
import { CommandPalette } from "./components/CommandPalette";
import { FloatingOrb } from "./components/FloatingOrb";
import { useIDE } from "./store/ide";

const queryClient = new QueryClient();

const Shell = () => {
  const { pathname } = useLocation();
  const setCommandOpen = useIDE((s) => s.setCommandOpen);
  const hideOrb = pathname === "/" || pathname.startsWith("/auth");

  return (
    <>
      <TopNav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ide" element={<IDE />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CommandPalette />
      {!hideOrb && <FloatingOrb onClick={() => setCommandOpen(true)} />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
