import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Lightbulb,
  FileText,
  Mail,
  GraduationCap,
  HandHeart,
  FileCheck,
  Award,
  School,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import useEmblaCarousel from "embla-carousel-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Import existing and new premium images
import careerCounselingImg from "@/assets/students/career-counseling-premium.png";
import admissionGuidanceImg from "@/assets/students/university-admission-premium.png";
import offerLetterImg from "@/assets/students/offer-letter.jpg";
import scholarshipImg from "@/assets/students/scholarship-finance-premium.png";
import handHoldingImg from "@/assets/students/hand-holding.jpg";
import credentialImg from "@/assets/students/credential.jpg";
import equivalencyImg from "@/assets/students/equivalency.jpg";
import boardingSchoolImg from "@/assets/students/boarding-school.jpg";
import educationLoanImg from "@/assets/students/education-loan.jpg";

type ServiceCategory = "All" | "Guidance" | "Admissions" | "Documentation" | "Financial";

const services = [
  {
    id: "career-counseling",
    icon: Lightbulb,
    title: "Career Consulting",
    category: "Guidance",
    shortDesc: "Personalized interest & aptitude roadmap",
    description: "One-to-one counseling based on interest and aptitude to create a long-term career roadmap.",
    image: careerCounselingImg,
    features: ["Personalized one-to-one counseling", "Interest & aptitude assessment", "Stream & subject selection", "Long-term roadmap creation"],
  },
  {
    id: "admission-guidance",
    icon: FileText,
    title: "Admission Guidance",
    category: "Admissions",
    shortDesc: "School & University global admissions",
    description: "Expert guidance for admissions in India & Abroad, helping with course and country shortlisting.",
    image: admissionGuidanceImg,
    features: ["School, College & University admissions", "Course & Country shortlisting", "Institution shortlisting", "Application strategy"],
  },
  {
    id: "offer-letter",
    icon: Mail,
    title: "Offer Letter Assistance",
    category: "Admissions",
    shortDesc: "Securing official offer letters",
    description: "Complete assistance in coordinating with institutions to secure official offer letters.",
    image: offerLetterImg,
    features: ["Institution coordination", "Securing official letters", "Offer conditions explanation", "Next steps guidance"],
  },
  {
    id: "scholarship",
    icon: GraduationCap,
    title: "Scholarship Guidance",
    category: "Financial",
    shortDesc: "Unlock merit & need-based aid",
    description: "Identifying and applying for institutional and country-specific scholarships.",
    image: scholarshipImg,
    features: ["Merit & Need-based identification", "Institutional scholarships", "Country-specific options", "Application & documentation"],
  },
  {
    id: "hand-holding",
    icon: HandHeart,
    title: "Complete Hand-Holding",
    category: "Guidance",
    shortDesc: "Continuous support till enrollment",
    description: "Continuous support for students and parents throughout the entire journey.",
    image: handHoldingImg,
    features: ["Career planning to Admission", "Offer letter & Scholarships", "Financial planning", "Credential evaluation assistance"],
  },
  {
    id: "credential",
    icon: FileCheck,
    title: "Credential Evaluation",
    category: "Documentation",
    shortDesc: "WES, ICAS, IQAS, and more",
    description: "Guidance for international credential evaluation services.",
    image: credentialImg,
    features: ["World Education Services (WES)", "ICAS of Canada", "IQAS & CES", "ICES support"],
  },
  {
    id: "equivalency",
    icon: Award,
    title: "Equivalency Certification",
    category: "Documentation",
    shortDesc: "Indian & NRI qualification map",
    description: "Assistance with Indian equivalency for foreign qualifications.",
    image: equivalencyImg,
    features: ["Foreign qualification equivalency", "Engineering degree recognition", "Medical degree recognition", "Professional degree support"],
  },
  {
    id: "boarding-school",
    icon: School,
    title: "Boarding School Admissions",
    category: "Admissions",
    shortDesc: "Top schools for NRI students",
    description: "Admission support for top boarding schools in North India.",
    image: boardingSchoolImg,
    features: ["Punjab, Chandigarh, HP", "Uttarakhand & Haryana", "CBSE / ICSE / International", "Hostel safety assessment"],
  },
  {
    id: "education-loan",
    icon: Wallet,
    title: "Education Loan Guidance",
    category: "Financial",
    shortDesc: "Smart financial planning support",
    description: "Assistance with education loans and financial documentation.",
    image: educationLoanImg,
    features: ["Education loan planning", "Bank coordination", "Documentation support", "Eligibility check"],
  },
];

interface ServicesProps {
  onOpenModal?: () => void;
}

const Services = ({ onOpenModal }: ServicesProps) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);

  const filteredServices = useMemo(() => {
    return activeCategory === "All"
      ? services
      : services.filter(service => service.category === activeCategory);
  }, [activeCategory]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps"
  });

  // Reset carousel to start when category changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [activeCategory, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
      {/* Ambient Backdrops */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold text-xs uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 leading-tight">
              End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Support</span>
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-lg">
              Guidance from profile building to settling in your dream country. curated for your success.
            </p>
          </div>

          {/* Categories & Navigation */}
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 w-full md:w-auto">
              <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                {["All", "Guidance", "Admissions", "Documentation", "Financial"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category as ServiceCategory)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeCategory === category
                      ? "bg-slate-900 text-white shadow-md transform scale-105"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Carousel Arrows */}
            <div className="hidden md:flex gap-2">
              <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary/30 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary/30 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-5 py-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-5"
              >
                <div
                  onClick={() => setSelectedService(service)}
                  className="group h-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer flex flex-col relative"
                >
                  {/* Card Image */}
                  <div className="h-48 overflow-hidden relative">
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full"
                      imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col relative bg-white">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1 block">
                        {service.category}
                      </span>
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors">View Details</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden bg-white border-none rounded-3xl">
          <div className="sr-only">
            <h2 id="service-modal-title">Service Details</h2>
          </div>
          {selectedService && (
            <div className="flex flex-col md:flex-row h-[85vh] md:h-auto">
              {/* Image Side */}
              <div className="relative h-56 md:h-auto md:w-5/12 flex-shrink-0">
                <OptimizedImage
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full"
                  imgClassName="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:bg-slate-900/20" />

                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-primary shadow-lg border border-white/20">
                    {selectedService.category}
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white md:hidden">
                  <h3 className="font-display font-bold text-2xl">{selectedService.title}</h3>
                </div>
                {/* Close Button Mobile Overlay */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full md:hidden backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Side */}
              <div className="flex-1 p-6 md:p-10 flex flex-col overflow-y-auto">
                <div className="hidden md:flex justify-between items-start mb-6">
                  <div>
                    <h3 className="font-display font-bold text-3xl text-slate-900 mb-2">{selectedService.title}</h3>
                    <div className="w-12 h-1 rounded-full bg-gradient-to-r from-primary to-secondary" />
                  </div>
                  <DialogClose className="p-2 hover:bg-slate-100 rounded-full transition-colors outline-none focus:ring-2 focus:ring-primary/20">
                    <X className="w-6 h-6 text-slate-400 hover:text-slate-900" />
                  </DialogClose>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed mb-8">
                  {selectedService.description}
                </p>

                <div className="space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" /> Key Features
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <Button
                    onClick={() => { onOpenModal?.(); setSelectedService(null); }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 rounded-xl text-base font-bold shadow-xl hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group"
                  >
                    Book Consultation
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Services;
