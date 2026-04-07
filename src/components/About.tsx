import { useState } from "react";
import { ArrowRight, Star, CheckCircle, Sparkles, Building2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AboutProps {
  onOpenModal?: () => void;
}

const About = ({ onOpenModal }: AboutProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Inquiry Sent!",
      description: "We will get back to you within 24 hours.",
    });
  };

  return (
    <section id="about" className="py-16 lg:py-20 relative overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Abstract Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <svg className="absolute top-0 right-0 opacity-10 pointer-events-none" width="400" height="400" viewBox="0 0 400 400" fill="none">
        <path d="M400 0L0 400" stroke="white" strokeWidth="2" />
        <path d="M430 -30L30 370" stroke="white" strokeWidth="1" />
        <path d="M370 30L-30 430" stroke="white" strokeWidth="1" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <Star className="w-3 h-3 fill-current" /> Established 2022
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 leading-tight">
              Global Pass <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
                Career Consulting Inc.
              </span>
            </h2>

            <div className="relative pl-8 border-l-2 border-primary/20 mb-10">
              <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-light font-display">
                "Global Pass Career Consulting Inc. is a <span className="text-slate-900 font-medium">Canada-based</span> global education and career consultancy, established in 2022, serving <span className="text-slate-900 font-medium">Indian, NRI, and international students</span>."
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <Building2 className="w-4 h-4 text-primary" />
                Canada HQ
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <Users className="w-4 h-4 text-secondary" />
                Global Team
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Lead Form */}
          <div className="lg:w-1/2 w-full">
            <div className="relative bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden group hover:border-primary/30 transition-all duration-500">
              {/* Glowing corner */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl group-hover:bg-secondary/30 transition-colors" />

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-slate-500 mb-8">We will contact you shortly to plan your journey.</p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)} className="border-slate-200 text-slate-700 hover:bg-slate-50">
                    Send Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Start Your Journey</h3>
                      <p className="text-slate-500 text-sm">Get expert free career guidance.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <Input
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 rounded-xl"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 rounded-xl"
                      />
                      <Input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 rounded-xl"
                      />
                    </div>
                    <Input
                      name="message"
                      placeholder="Which country or course are you interested in?"
                      value={formData.message}
                      onChange={handleChange}
                      className="h-12 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary/50 rounded-xl"
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-bold rounded-xl shadow-lg shadow-primary/25 mt-2 group"
                    >
                      {isSubmitting ? "Sending..." : (
                        <span className="flex items-center gap-2">
                          Get Free Consulting <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <p className="text-xs text-center text-slate-500 mt-4">
                      By submitting, you agree to our privacy policy.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
