import { Award, Globe, Heart, Briefcase, Users, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Clock,
    title: "20+ Years Experience",
    description: "Leadership experience in career counseling and education guidance.",
  },
  {
    icon: Globe,
    title: "Canada-Based, Globally Connected",
    description: "International consultancy with worldwide education network.",
  },
  {
    icon: Heart,
    title: "Ethical & Student-First",
    description: "Transparent approach putting student interests above all.",
  },
  {
    icon: Briefcase,
    title: "Career-Focused",
    description: "We design careers, not just admission placements.",
  },
  {
    icon: Users,
    title: "Strong NRI & Indian Support",
    description: "Specialized guidance for Indian and NRI students worldwide.",
  },
  {
    icon: Award,
    title: "Jobs + Business Creation",
    description: "Long-term guidance for employment and entrepreneurship.",
  },
];

interface WhyChooseUsProps {
  onOpenModal?: () => void;
}

const WhyChooseUs = ({ onOpenModal }: WhyChooseUsProps) => {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // Double the items for seamless loop
  const tickerItems = [...reasons, ...reasons];

  return (
    <section className="py-12 lg:py-16 relative overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl mix-blend-multiply" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl mix-blend-multiply" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-3 border border-border shadow-sm">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Why Global Pass</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl lg:text-4xl text-foreground mb-4">
            When Students Think of <span className="text-primary">Career & Future</span>
          </h2>
          <p className="text-lg md:text-xl font-display font-bold text-secondary">
            — They Think of Global Pass.
          </p>
        </div>

        {/* Ticker/Marquee */}
        <div className="relative overflow-hidden mb-8 lg:mb-12">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-muted/20 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-muted/20 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-ticker hover:[animation-play-state:paused]">
            {tickerItems.map((reason, index) => (
              <div
                key={`${reason.title}-${index}`}
                className="flex-shrink-0 w-72 md:w-80 mx-2 md:mx-3"
              >
                <div className="group bg-white rounded-2xl p-5 md:p-6 border border-border hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Icon */}
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="font-display font-bold text-base md:text-lg text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onOpenModal}
            size="lg"
            className="rounded-full bg-primary hover:bg-primary/90 hover:shadow-lg transition-all duration-300 text-sm md:text-base px-6 md:px-8 h-10 md:h-12"
          >
            Start Your Journey
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
