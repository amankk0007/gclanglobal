import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero_student.jpg";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PremiumKnowYourselfButton from "@/components/PremiumKnowYourselfButton";
import { ArrowRight, UserCheck, Globe, GraduationCap, Users, Award, Building2, Trophy, Star, ShieldCheck, Clock3 } from "lucide-react";

const metrics = [
  { value: "20+", label: "Years Experience", icon: Award },
  { value: "5000+", label: "Students Guided", icon: Users },
  { value: "50+", label: "Partner Universities", icon: GraduationCap },
  { value: "15+", label: "Countries", icon: Globe },
  { value: "98%", label: "Success Rate", icon: Trophy },
  { value: "25+", label: "Branch Offices", icon: Building2 },
];

interface HeroProps {
  onOpenModal?: () => void;
}

const Hero = ({ onOpenModal }: HeroProps) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-slate-100 via-white to-slate-50">

      {/* Decorative Elements (Subtle & Sleek) */}
      <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-blue-100/60 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-100/60 rounded-full blur-[80px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[calc(100vh-120px)] lg:min-h-[560px] pt-4 pb-10 lg:pt-6 lg:pb-14 bg-white/70 backdrop-blur-sm border border-white rounded-[2rem] px-5 sm:px-8 lg:px-10">

          {/* Content Wrapper */}
          <div className="max-w-3xl mx-auto lg:mx-0 relative z-20">

            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white border border-slate-100 rounded-full px-4 py-2 mb-6 shadow-sm">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                    <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                ))}
                <div className="w-7 h-7 rounded-full border-2 border-white bg-primary text-[10px] text-white flex items-center justify-center font-bold">
                  5k+
                </div>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-900">5.0</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">Trusted by 5000+ Students</span>
              </div>
            </div>

            {/* Premium Know Yourself Button */}
            <div className="mb-6">
              <PremiumKnowYourselfButton />
            </div>

            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.1] mb-6">
              Admission | Training | Placement | Enterpreneurship 
              <br />
              
            </h1>

            <p className="text-slate-900 text-lg lg:text-3xl font-semibold mb-8 leading-relaxed max-w-xl">
            Comprehensive career solutions provided through expert advisory and facilitation, guiding students from admissions to skill development, career pathways, and entrepreneurial opportunities.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                Certified Counselors
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
                <Clock3 className="h-3.5 w-3.5 text-secondary" />
                Fast Application Support
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-10 lg:mb-0">
              <Button
                onClick={onOpenModal}
                size="lg"
                className="rounded-full bg-primary hover:bg-primary/90 text-base px-7 h-12 shadow-lg shadow-primary/25 w-full sm:w-auto"
              >
                <UserCheck className="w-5 h-5 mr-2" />
                Book Free Consultancy
              </Button>
              <Button
                onClick={onOpenModal}
                variant="outline"
                size="lg"
                className="rounded-full border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 text-base px-7 h-12 w-full sm:w-auto"
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>

            {/* Desktop Metrics */}
            <div className="hidden lg:grid mt-10 pt-8 border-t border-slate-200 grid-cols-3 gap-x-2 gap-y-6 text-left">
              {metrics.map((metric) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                    <metric.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-xl text-slate-900 leading-none mb-1">{metric.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider leading-tight">{metric.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Enhanced Visual Content */}
          <div className="relative h-[400px] lg:h-auto lg:order-2 mt-8 lg:mt-0">
            {/* Desktop Enhanced Content */}
            <div className="hidden lg:block relative h-full">
              <div className="relative rounded-[2.25rem] overflow-hidden shadow-2xl shadow-primary/10 bg-white flex items-center justify-center h-[500px] border border-white">
                <OptimizedImage
                  src={heroImg}
                  alt="Student graduate"
                  className="w-full h-full"
                  imgClassName="object-cover hover:scale-105 transition-transform duration-700"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-900/10 to-transparent" />
                
                {/* Enhanced Overlay Content */}
                <div className="absolute left-6 right-6 bottom-6 space-y-4">
                  <div className="rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md">
                    <p className="text-white text-sm font-semibold">100% personalized profile guidance for each student</p>
                  </div>
                  
                  {/* Success Indicators */}
                  <div className="flex gap-3">
                    <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-300" />
                        <span className="text-white text-xs font-medium">98% Success Rate</span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-300" />
                        <span className="text-white text-xs font-medium">15+ Countries</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -right-6 bottom-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Students Guided</p>
                <p className="text-2xl font-bold text-secondary">5000+</p>
              </div>
              
              <div className="absolute -left-4 top-8 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Years Experience</p>
                <p className="text-2xl font-bold text-primary">20+</p>
              </div>
              
              <div className="absolute right-8 top-1/4 rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Partner Universities</p>
                <p className="text-2xl font-bold text-primary">50+</p>
              </div>
            </div>

            {/* Enhanced Mobile Hero - Dynamic Design */}
            <div className="lg:hidden">
              <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl p-6 shadow-xl border border-slate-100">

                {/* Enhanced Image Section */}
                <div className="relative mb-6">
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-100">
                    <OptimizedImage
                      src={heroImg}
                      alt="Student success"
                      className="w-full h-full"
                      imgClassName="object-cover"
                      priority={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
                    
                    {/* Overlay Stats */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2">
                        <p className="text-xs font-semibold text-slate-700">Your Global Career Starts Here</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full px-3 py-1 text-xs font-bold shadow-lg">
                    20+ Years
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">Study Abroad</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl text-slate-900 leading-tight">
                    Build Your <span className="text-primary">Global Career</span>
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    Expert guidance for studying in 15+ countries with 98% success rate and personalized mentorship
                  </p>
                </div>

                {/* Enhanced Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 my-6">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-3 text-center border border-primary/20 shadow-sm">
                    <Trophy className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-xl text-primary mb-0.5">98%</p>
                    <p className="text-[9px] text-slate-600 font-medium uppercase tracking-wide">Success</p>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-xl p-3 text-center border border-secondary/20 shadow-sm">
                    <Users className="w-4 h-4 text-secondary mx-auto mb-1" />
                    <p className="font-bold text-xl text-secondary mb-0.5">5k+</p>
                    <p className="text-[9px] text-slate-600 font-medium uppercase tracking-wide">Students</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-3 text-center border border-primary/20 shadow-sm">
                    <Globe className="w-4 h-4 text-primary mx-auto mb-1" />
                    <p className="font-bold text-xl text-primary mb-0.5">15+</p>
                    <p className="text-[9px] text-slate-600 font-medium uppercase tracking-wide">Countries</p>
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <Button
                  onClick={onOpenModal}
                  size="lg"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base h-12 font-semibold"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Enhanced Trust Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 rounded-full px-4 py-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">5.0 • Trusted by 5000+ Students</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
