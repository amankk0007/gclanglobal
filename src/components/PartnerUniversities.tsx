import { Building2 } from "lucide-react";

const universities = [
  { name: "University of Toronto", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/200px-Utoronto_coa.svg.png" },
  { name: "University of Melbourne", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/University_of_Melbourne_logo.svg/200px-University_of_Melbourne_logo.svg.png" },
  { name: "Queen's University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/Queen%27s_University_logo.svg/200px-Queen%27s_University_logo.svg.png" },
  { name: "University of Auckland", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/University_of_Auckland.svg/200px-University_of_Auckland.svg.png" },
  { name: "McGill University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/29/McGill_University_CoA.svg/200px-McGill_University_CoA.svg.png" },
  { name: "University of British Columbia", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/University_of_British_Columbia_logo.svg/200px-University_of_British_Columbia_logo.svg.png" },
];

const PartnerUniversities = () => {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4F46E5]/3 via-transparent to-[#7C3AED]/3" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 border border-border/30">
            <Building2 className="w-4 h-4 text-[#7C3AED]" />
            <span className="text-[#7C3AED] font-semibold text-sm uppercase tracking-wider">Partner Network</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground">
            Our <span className="gradient-text">Partner Universities</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Trusted by leading institutions worldwide
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative">
          <div className="flex animate-scroll">
            {[...universities, ...universities].map((uni, index) => (
              <div
                key={`${uni.name}-${index}`}
                className="flex-shrink-0 mx-6 md:mx-10"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-border/30 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 grayscale hover:grayscale-0 opacity-70 hover:opacity-100">
                  <div className="h-12 w-40 flex items-center justify-center">
                    <span className="font-display font-semibold text-foreground text-sm text-center">
                      {uni.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default PartnerUniversities;
