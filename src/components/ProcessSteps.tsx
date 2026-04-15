import { MessageSquare, Search, FileText, Plane, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Free Consultancy",
    description: "Book a free session with our expert counselors to discuss your goals and aspirations.",
    borderColor: "border-primary/50",
    iconColor: "text-primary",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    number: "02",
    icon: Search,
    title: "Course & University Selection",
    description: "Get personalized recommendations based on your interests, budget, and career goals.",
    borderColor: "border-secondary/50",
    iconColor: "text-secondary",
    gradient: "from-secondary/20 to-secondary/5"
  },
  {
    number: "03",
    icon: FileText,
    title: "Application & Admission",
    description: "We handle your applications, documentation, and secure your offer letter.",
    borderColor: "border-primary/50",
    iconColor: "text-primary",
    gradient: "from-primary/20 to-primary/5"
  },
  {
    number: "04",
    icon: Plane,
    title: "Visa & Enrollment",
    description: "Complete visa assistance and guidance until you start your journey abroad.",
    borderColor: "border-secondary/50",
    iconColor: "text-secondary",
    gradient: "from-secondary/20 to-secondary/5"
  },
];

interface ProcessStepsProps {
  onOpenModal: () => void;
}

const ProcessSteps = ({ onOpenModal }: ProcessStepsProps) => {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-gradient-to-br from-[#020617] via-[#081b3f] to-[#020617]">
      {/* Premium Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617]" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 border border-white/10 shadow-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary font-bold text-sm uppercase tracking-wider">How It Works</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight">
            4 Steps to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Dream Career</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Our streamlined process makes your educational journey simple and stress-free.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-14 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[10%] w-[80%] h-[2px] bg-gradient-to-r from-white/5 via-white/20 to-white/5 border-t border-dashed border-white/10 -z-10" />

          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className={`h-full bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden`}>
                {/* Hover Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Number Badge */}
                <div className={`w-12 h-12 rounded-xl border-2 ${step.borderColor} bg-[#020617] flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className={`font-display font-bold text-xl ${step.iconColor}`}>{step.number}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="font-display font-bold text-xl text-white mb-3 min-h-[3.5rem] flex items-center">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Icon Watermark */}
                <step.icon className={`absolute -bottom-4 -right-4 w-24 h-24 ${step.iconColor} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity`} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={onOpenModal}
            size="lg"
            className="rounded-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold text-lg px-10 py-7 shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-105 group"
          >
            Start Your Application
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-slate-500 text-sm font-medium">
            No hidden fees. Free initial consultation.
          </p>
        </div>

      </div>
    </section>
  );
};

export default ProcessSteps;
