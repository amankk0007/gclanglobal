import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle, Sparkles, ArrowRight, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeadForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Thank you!",
      description: "Our team will reach out to you within 24 hours.",
    });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#7C3AED]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#34D399] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="font-display font-bold text-3xl text-white mb-4">
              Thank You!
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Our career counselor will contact you within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-xl"
            >
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4F46E5] via-[#6366F1] to-[#7C3AED]" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left - Text */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              <span className="text-white/90 font-semibold text-sm uppercase tracking-wider">Free Consultation</span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
              Let Our Team <br />
              <span className="text-[#FBBF24]">Reach Out to You</span>
            </h2>

            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              Fill in your details and our expert career counselors will get in touch within 24 hours to discuss your educational goals.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {["GS", "AK", "RP"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center"
                  >
                    <span className="text-sm font-semibold text-white">{initials}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-medium">Expert Counselors</p>
                <p className="text-white/60 text-sm">Ready to help you succeed</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Get Free Consultation</h3>
                <p className="text-muted-foreground text-sm">We'll call you within 24 hours</p>
              </div>
            </div>

            <div className="grid gap-4">
              <Input
                name="name"
                placeholder="Your Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-white transition-colors"
              />
              <Input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-white transition-colors"
              />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12 rounded-xl border-border/50 bg-muted/30 focus:bg-white transition-colors"
              />
              <select
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                className="h-12 w-full rounded-xl border border-border/50 bg-muted/30 px-4 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:bg-white transition-colors"
              >
                <option value="">Select Education Level</option>
                <option value="10th">After 10th</option>
                <option value="12th">After 12th</option>
                <option value="graduate">Graduate</option>
                <option value="postgraduate">Post Graduate</option>
                <option value="professional">Working Professional</option>
              </select>
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:shadow-primary-glow hover:-translate-y-0.5 transition-all duration-300 h-12 text-base group"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Get Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
            <p className="text-muted-foreground text-xs text-center mt-4">
              By submitting, you agree to receive communication from Global Pass.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadForm;
