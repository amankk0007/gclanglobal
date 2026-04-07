import { Globe, CheckCircle2, Star, X, ArrowRight, GraduationCap } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DestinationData {
  name: string;
  flag: string;
  image: string;
  description: string;
  benefits: string[];
  whyUs: string;
}

const destinations: DestinationData[] = [
  {
    name: "Canada",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    description: "A top choice for international students due to its high quality of life and welcoming immigration policies.",
    benefits: [
      "Post-Graduation Work Permit (PGWP) up to 3 years",
      "Easy pathways to Permanent Residency (PR)",
      "World-class healthcare and safety",
      "Affordable tuition compared to US/UK"
    ],
    whyUs: "We have direct tie-ups with 100+ Canadian colleges & universities, ensuring quick offer letters and maximum scholarship opportunities."
  },
  {
    name: "USA",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
    description: "Home to the world's top-ranked universities and limitless career growth opportunities in tech and business.",
    benefits: [
      "STEM courses offer up to 3 years of OPT",
      "Highest average starting salaries globally",
      "Flexible curriculum and research opportunities",
      "Diverse cultural exposure"
    ],
    whyUs: "Our experts specialize in F1 visa counseling and help you navigate the complex US admission process with ease, focusing on STEM courses."
  },
  {
    name: "UK",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    description: "Experience a rich academic heritage with shorter duration courses that save you time and money.",
    benefits: [
      "Masters programs are only 1 year",
      "2-year Graduate Route Visa (PSW)",
      "Free health coverage via NHS",
      "Proximity to rest of Europe"
    ],
    whyUs: "We provide dedicated support for Russell Group university applications and assist with credibility interviews."
  },
  {
    name: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    description: "Known for its laid-back lifestyle, high wages, and strong focus on research and innovation.",
    benefits: [
      "Extended post-study work rights (up to 4-6 years)",
      "High minimum wage rates",
      "Regional area migration benefits",
      "Excellent climate and outdoor lifestyle"
    ],
    whyUs: "Our team helps you identify regional universities that offer better scholarship chances and extended PR pathways."
  },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    description: "A safe, friendly, and scenic destination offering practical, hands-on learning experiences.",
    benefits: [
      "Green List roles offer straight-to-residence",
      "Family-friendly visa policies",
      "Safe and peaceful environment",
      "Industry-aligned polytechnic courses"
    ],
    whyUs: "We specialize in courses that align with New Zealand's long-term skill shortage list to maximize your settlement chances."
  },
  {
    name: "Europe",
    flag: "🇪🇺",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    description: "Access high-quality education at very low or no tuition fees in public universities across Schengen.",
    benefits: [
      "Travel across 27 Schengen countries",
      "Low or zero tuition fees in Germany/France",
      "English-taught programs available",
      "Rich history and culture"
    ],
    whyUs: "We guide you through the specific requirements of public universities in Germany, France, and Malta, including blocked account (details)."
  },
  {
    name: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    description: "Emerging global education hub with affordable premium institutions and diverse culture.",
    benefits: [
      "Very affordable cost of living",
      "rapidly growing economy",
      "IT and Medical hubs",
      "Cultural familiarity for NRIs"
    ],
    whyUs: "We assist NRI students in securing admissions under the DASA scheme and management quotas in top Indian colleges."
  },
  {
    name: "Caribbean (MBBS)",
    flag: "🌴",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    description: "The smart pathway to becoming a doctor in the USA/Canada without the high competition.",
    benefits: [
      "No MCAT required for admission",
      "Clinical rotations in US hospitals",
      "High USMLE pass rates",
      "Affordable tuition compared to US med schools"
    ],
    whyUs: "We partner with accredited Caribbean medical schools that have a proven track record of placing students in US residencies."
  },
  {
    name: "Central Asia (MBBS)",
    flag: "🌏",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    description: "The most budget-friendly option for Indian students aspiring to become doctors.",
    benefits: [
      "Extremely low tuition fees",
      "WHO and NMC recognized universities",
      "English medium instruction",
      "Indian food and hostels available"
    ],
    whyUs: "We ensure you only apply to universities with a high FMGE passing rate and adequate safety measures for international students."
  },
];

interface DestinationsProps {
  onOpenModal: () => void;
}

const Destinations = ({ onOpenModal }: DestinationsProps) => {
  const [selectedDest, setSelectedDest] = useState<DestinationData | null>(null);
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  return (
    <section id="destinations" className="py-12 lg:py-20 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Study Destinations</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Your Gateway to <span className="text-primary">Global Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We guide students to top destinations worldwide for quality education and career opportunities.
          </p>
        </div>

        {/* Destinations Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {destinations.map((dest) => (
              <CarouselItem key={dest.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div
                  onClick={() => setSelectedDest(dest)}
                  className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-border/50"
                >
                  <OptimizedImage
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full"
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity" />

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20 text-3xl shadow-lg">
                      {dest.flag}
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-1 flex items-center justify-center gap-2">
                      {dest.name}
                    </h3>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white hover:text-primary text-white text-xs font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-lg group-hover:scale-105">
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-10">
            <CarouselPrevious className="relative left-0 translate-y-0 h-10 w-10 border border-border hover:bg-primary hover:text-white transition-all shadow-sm" />
            <CarouselNext className="relative right-0 translate-y-0 h-10 w-10 border border-border hover:bg-primary hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>

      {/* Detail Popup Modal */}
      <Dialog open={!!selectedDest} onOpenChange={() => setSelectedDest(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-0 shadow-2xl rounded-3xl">
          {selectedDest && (
            <div className="flex flex-col max-h-[90vh] overflow-y-auto">
              {/* Modal Header Image */}
              <div className="relative h-48 sm:h-64 shrink-0">
                <OptimizedImage
                  src={selectedDest.image}
                  alt={selectedDest.name}
                  className="w-full h-full"
                  imgClassName="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <button
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-colors border border-white/10 z-10"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl shadow-sm">{selectedDest.flag}</div>
                    <div>
                      <h3 className="font-display font-bold text-3xl text-white tracking-tight">{selectedDest.name}</h3>
                      <p className="text-white/80 text-sm font-medium">Study Abroad Program</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 bg-background grow">

                <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
                  {selectedDest.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Benefits Section */}
                  <div>
                    <h4 className="flex items-center gap-2 font-semibold text-foreground mb-4">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Why Study in {selectedDest.name}?
                    </h4>
                    <ul className="space-y-3">
                      {selectedDest.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why Us Section */}
                  <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
                    <h4 className="flex items-center gap-2 font-semibold text-primary mb-3">
                      <Star className="w-5 h-5 fill-primary text-primary" />
                      Why Choose Global Pass?
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedDest.whyUs}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Button
                    className="w-full h-12 text-base rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
                    onClick={() => { setSelectedDest(null); onOpenModal(); }}
                  >
                    Start Your Application for {selectedDest.name}
                    <ArrowRight className="w-4 h-4 ml-2" />
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

export default Destinations;
