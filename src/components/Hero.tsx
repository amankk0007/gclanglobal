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

          {/* Right Section (Image) */}
          <div className="relative h-[400px] lg:h-auto lg:order-2 mt-8 lg:mt-0">
            {/* Desktop Image */}
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
                <div className="absolute left-6 right-6 bottom-6 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 backdrop-blur-md">
                  <p className="text-white text-sm font-semibold">100% personalized profile guidance for each student</p>
                </div>
              </div>
              <div >
                {/* <p className="text-xs font-semibold uppercase tracking-wide text-slate-500"></p>
                <p className="text-2xl font-bold text-primary"></p> */}
              </div>
              <div className="absolute -right-6 bottom-10 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Students Guided</p>
                <p className="text-2xl font-bold text-secondary">5000+</p>
              </div>
            </div>

            {/* Enhanced Mobile Hero - Clean Design with Small Image */}
            <div className="lg:hidden">
              <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 rounded-3xl p-6 shadow-xl border border-slate-100">

                {/* Small Circular Image - Top Right */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <OptimizedImage
                    src={heroImg}
                    alt="Student"
                    className="w-full h-full"
                    imgClassName="object-cover"
                    priority={true}
                  />
                </div>

                {/* Content */}
                <div className="pr-24">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 rounded-full px-3 py-1.5 mb-4">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">Study Abroad</span>
                  </div>

                  <h2 className="font-display font-bold text-2xl text-slate-900 mb-3 leading-tight">
                    Build Your <span className="text-primary">Global Career</span>
                  </h2>

                  <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                    Expert guidance for studying in 15+ countries with 98% success rate
                  </p>
                </div>

                {/* Compact Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                    <p className="font-bold text-xl text-primary mb-0.5">98%</p>
                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Success</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                    <p className="font-bold text-xl text-secondary mb-0.5">5k+</p>
                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Students</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 text-center border border-slate-100 shadow-sm">
                    <p className="font-bold text-xl text-primary mb-0.5">15+</p>
                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Countries</p>
                  </div>
                </div>

                {/* CTA Button */}
                <Button
                  onClick={onOpenModal}
                  size="lg"
                  className="w-full rounded-full bg-gradient-to-r from-primary to-secondary hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-base h-12"
                >
                  <UserCheck className="w-4 h-4 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                {/* Trust Indicator */}
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
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
