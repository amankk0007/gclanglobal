import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import InstitutionalLoanPage from "./pages/InstitutionalLoanPage";
import ResidentialSchools from "./pages/ResidentialSchools";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import TermsPage from "./pages/terms";
// import PrivacyPage from "./pages/Privacy";
// import CookiesPage from "/Cookies";

import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import PartnersPage from "./pages/PartnersPage";
import ApplyPage from "./pages/ApplyPage";
import LamrinPage from "./pages/apply/LamrinPage";
import AmityPage from "./pages/apply/AmityPage";
import SvietPage from "./pages/apply/SvietPage";
import RootPage from "./pages/apply/RootPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/admin/AdminRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
      
  <Route path="/terms" element={<TermsPage />} />


          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/destinations/:id" element={<DestinationDetailPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/apply/lamrin" element={<LamrinPage />} />
          <Route path="/apply/amity" element={<AmityPage />} />
          <Route path="/apply/sviet" element={<SvietPage />} />
          <Route path="/apply/root" element={<RootPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/institutional-loan" element={<InstitutionalLoanPage />} />
          <Route path="/residential-schools" element={<ResidentialSchools />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
