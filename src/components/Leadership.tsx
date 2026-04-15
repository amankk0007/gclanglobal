import { Quote, Award, Building2, Sparkles, GraduationCap, Briefcase } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useCallback } from "react";
import garryMadan from "@/assets/garry-madan.jpg";
import premLata from "@/assets/prem_lata.jpg";
import keertiDheer from "@/assets/keerti-dheer.jpg";
import rajivBajwa from "@/assets/rajiv-bajwa.png";

const teamMembers = [
  {
    name: "G.S. Madan",
    title: "Founder & CEO",
    image: garryMadan,
    experience: "20+ Years",
    quote: "Leading with Vision, Guided by Ethics. My mission is to empower students not just to study abroad, but to build sustainable careers and become leaders in their fields.",
    description: "A dynamic leader and visionary entrepreneur, Garry Madan has been a pivotal figure in the field of career counseling and global education for over two decades.",
    icon: Building2,
    linkedin: "https://linkedin.com",
    position: "object-top", // Default slightly higher
  },
  {
    name: "Prem Lata",
    title: "Advisor",
    image: premLata,
    experience: "25+ Years",
    quote: "Education is the most powerful tool to transform lives. With over 25 years of teaching experience, I am committed to guiding students toward their brightest futures.",
    description: "An experienced educator and advisor with OCT & RCIC certification, Prem Lata brings deep expertise in student counseling and immigration guidance.",
    certifications: "OCT & RCIC Certified",
    icon: GraduationCap,
    linkedin: "https://linkedin.com",
    position: "object-top", // Fix for zoomed in look
  },
  {
    name: "Manoj dhiman",
    title: "Director Business Development",
    image: keertiDheer,
    experience: "26+ Years",
    quote: "Building partnerships and creating opportunities for students worldwide is what drives me every day.",
    description: "A strategic business development professional dedicated to expanding Global Pass's reach and creating valuable partnerships in the education sector.",
    icon: Briefcase,
    linkedin: "https://linkedin.com",
    position: "object-top", // Ensure head is visible
  },
  {
    name: "Rajinder kumar (Maddy)",
    title: "Director Public Relations",
    image: rajivBajwa,
    experience: "21+ Years",
    quote: "Building strong relationships and fostering trust is the cornerstone of our global community.",
    description: "As Director of Public Relations, Rajinder kumar manages our external communications and strengthens our relationships with partners and the community.",
    icon: Building2,
    linkedin: "https://linkedin.com",
    position: "object-top",
  },
];

const Leadership = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="leadership" className="py-12 lg:py-20 bg-muted/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5" />
      <div className="absolute top-10 right-10 w-32 h-32 rounded-full border-2 border-secondary/20 opacity-50" />
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full border-2 border-primary/20 opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm border border-border">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Leadership</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            Meet Our <span className="gradient-text">Expert Team</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Dedicated professionals committed to guiding students toward successful careers and bright futures.
          </p>
        </div>

        {/* Desktop Grid (Hidden on Mobile) */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Mobile Carousel (Hidden on Desktop) */}
        <div className="lg:hidden relative">
          <div className="overflow-hidden p-2 -m-2" ref={emblaRef}>
            <div className="flex gap-4">
              {teamMembers.map((member, index) => (
                <div key={member.name} className="flex-[0_0_85%] min-w-0">
                  <TeamCard member={member} index={index} />
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {teamMembers.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex
                  ? "w-6 bg-primary"
                  : "w-1.5 bg-primary/20"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamCard = ({ member, index }: { member: typeof teamMembers[0], index: number }) => (
  <div
    className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/30 h-full flex flex-col`}
  >
    {/* Image Section */}
    <div className="relative h-72 md:h-80 overflow-hidden flex-shrink-0">
      <OptimizedImage
        src={member.image}
        alt={`${member.name} - ${member.title}`}
        className="w-full h-full"
        imgClassName={`object-cover ${member.position || 'object-center'} transform transition-transform duration-700 group-hover:scale-110`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />

      {/* Name Badge on Image */}
      <div className="absolute bottom-6 left-6 text-white z-10">
        <h3 className="text-2xl font-display font-bold mb-1">{member.name}</h3>
        <p className="opacity-90 font-medium text-sm">{member.title}</p>
      </div>

      {/* Experience Badge */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg flex items-center gap-2">
        <member.icon className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold text-foreground">{member.experience}</span>
      </div>
    </div>

    {/* Content Section */}
    <div className="p-6 flex-1 flex flex-col">
      {member.certifications && (
        <div className="mb-4 inline-flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full w-fit">
          <Award className="w-4 h-4 text-secondary" />
          <span className="text-xs font-semibold text-secondary">{member.certifications}</span>
        </div>
      )}

      <div className="relative mb-4 flex-1">
        <Quote className="absolute -top-2 -left-2 w-6 h-6 text-primary/20 rotate-180" />
        <p className="text-sm text-muted-foreground italic pl-4 leading-relaxed">
          "{member.quote}"
        </p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        {member.description}
      </p>


    </div>
  </div>
);

export default Leadership;
