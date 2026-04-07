import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ConsultationModal from "@/components/ConsultationModal";
import About from "@/components/About";


import Services from "@/components/Services";
import Courses from "@/components/Courses";
import Destinations from "@/components/Destinations";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import GallerySection from "@/components/GallerySection";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProcessSteps from "@/components/ProcessSteps";
import InstitutionalLoan from "@/components/InstitutionalLoan";

import Vision from "@/components/Vision";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import WelcomeModal from "@/components/WelcomeModal";
import ResidentialSchools from "@/components/ResidentialSchools";

const Index = () => {
  // Main landing page component
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header onOpenModal={openModal} />
      <main className="relative overflow-hidden">
        <Hero onOpenModal={openModal} />
        <About onOpenModal={openModal} />
        <Vision />
        <div className="bg-gradient-to-b from-slate-100/70 via-white to-slate-50">
          <Courses onOpenModal={openModal} />
          <GallerySection />
          <Destinations onOpenModal={openModal} />
        </div>
        <Services onOpenModal={openModal} />
        <ProcessSteps onOpenModal={openModal} />
        <div className="bg-gradient-to-b from-white via-slate-50 to-white">
          <ResidentialSchools />
          <InstitutionalLoan onOpenModal={openModal} />
        </div>
        <Leadership />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileFloatingCTA onOpenModal={openModal} />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WelcomeModal />
    </div>
  );
};

export default Index;
