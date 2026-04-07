import { useState } from "react";
import {
  Building2,
  Landmark,
  GraduationCap,
  IndianRupee,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck,
  TrendingUp,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";

const InstitutionalLoanPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Enquiry Submitted Successfully",
        description: "Our institutional finance expert will contact you within 24 hours.",
      });
      // Reset form logic would go here
    }, 1500);
  };

  const openModal = () => setIsModalOpen(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenModal={openModal} />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden bg-slate-900 border-b border-slate-800">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 mb-6 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
                <span className="flex items-center gap-1.5 text-orange-400 font-bold text-xs uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  India Only
                </span>
                <span className="w-px h-3 bg-white/20" />
                <span className="text-white/80 text-xs font-medium">Institutional Finance Division</span>
              </div>

              <h1 className="font-display font-bold text-4xl lg:text-6xl text-white mb-6 leading-tight">
                Funding Growth for <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Educational Institutions
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                We secure high-value funding (₹10L – ₹100Cr+) for Schools, Colleges, and Universities to scale infrastructure and operations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/25"
                  onClick={() => document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Check Eligibility
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex items-center gap-2 text-white/60 text-sm font-medium px-4">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> No Upfront Fees
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Target Audience Grid */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display font-bold text-3xl text-slate-900 mb-4">Who We Support</h2>
              <p className="text-slate-600">Tailored financial solutions for:</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: GraduationCap, label: "Schools", sub: "K-12 & Boarding" },
                { icon: Building2, label: "Colleges", sub: "Degree & Technical" },
                { icon: Landmark, label: "Universities", sub: "Private & Deemed" },
                { icon: Users, label: "Trusts", sub: "Societies & NGOs" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow text-center group">
                  <div className="w-12 h-12 mx-auto bg-primary/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-500">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition & Funnel */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block p-3 rounded-2xl bg-orange-50 mb-6">
                  <TrendingUp className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
                  Expand Your Campus <br />
                  <span className="text-primary">Without Financial Limits</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Infrastructure Development</h4>
                      <p className="text-slate-600 text-sm">construction of new blocks, hostels, labs, or sports complexes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Debt Refinancing</h4>
                      <p className="text-slate-600 text-sm">Consolidate existing high-interest loans into a single lower-rate facility.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Working Capital</h4>
                      <p className="text-slate-600 text-sm">Manage operational expenses, staff salaries, and equipment procurement smoothly.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl transform rotate-3 opacity-10" />
                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative shadow-xl">
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary" /> Why Partner With Us?
                  </h3>
                  <div className="grid gap-4">
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="font-bold text-slate-900 mb-1">95% Approval Rate</p>
                      <p className="text-xs text-slate-500">For eligible institutions via our network</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="font-bold text-slate-900 mb-1">Lowest Market Rates</p>
                      <p className="text-xs text-slate-500">Exclusive tie-ups with top Banks & NBFCs</p>
                    </div>
                    <div className="p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <p className="font-bold text-slate-900 mb-1">Speedy Disbursement</p>
                      <p className="text-xs text-slate-500">End-to-end processing within weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lead Generation Form Area */}
        <section id="enquiry-form" className="py-20 lg:py-28 bg-slate-900 relative isolate">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.slate.800),theme(colors.slate.900))] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-900 shadow-xl shadow-slate-900/10 ring-1 ring-slate-800 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16">

              <div className="max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
                  Check Your <br />
                  <span className="text-primary">Funding Eligibility</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Get a free financial assessment for your institution. Our experts will analyze your requirements and propose the best funding options tailored to your growth plans.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-slate-300">
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Phone</span>
                      <Phone className="h-7 w-6 text-slate-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <a className="hover:text-white" href="tel:+917508813555">+91 (Institutional Desk)</a>
                      <p className="text-xs text-slate-500 mt-1">Available Mon-Sat 10am - 6pm IST</p>
                    </dd>
                  </div>
                  <div className="flex gap-x-4">
                    <dt className="flex-none">
                      <span className="sr-only">Email</span>
                      <Mail className="h-7 w-6 text-slate-400" aria-hidden="true" />
                    </dt>
                    <dd>
                      <a className="hover:text-white" href="mailto:info@globalpasscareer.com">info@globalpasscareer.com</a>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-2xl">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Request Callback</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">First Name</label>
                      <Input required placeholder="John" className="bg-slate-50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Last Name</label>
                      <Input required placeholder="Doe" className="bg-slate-50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Institution Name</label>
                    <Input required placeholder="Ex: St. Xavier's International School" className="bg-slate-50" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Role</label>
                      <Select>
                        <SelectTrigger className="bg-slate-50">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trustee">Trustee / Director</SelectItem>
                          <SelectItem value="principal">Principal</SelectItem>
                          <SelectItem value="admin">Admin Head</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone</label>
                      <Input required type="tel" placeholder="+91" className="bg-slate-50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Loan Amount Needed (Approx)</label>
                    <Select>
                      <SelectTrigger className="bg-slate-50">
                        <SelectValue placeholder="Select Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10-50L">₹10 Lakh - ₹50 Lakh</SelectItem>
                        <SelectItem value="50L-1Cr">₹50 Lakh - ₹1 Crore</SelectItem>
                        <SelectItem value="1Cr-5Cr">₹1 Crore - ₹5 Crore</SelectItem>
                        <SelectItem value="5Cr-20Cr">₹5 Crore - ₹20 Crore</SelectItem>
                        <SelectItem value="20Cr+">₹20 Crore+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Requirement Details</label>
                    <Textarea placeholder="Briefly describe your requirements..." className="bg-slate-50 min-h-[100px]" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-xl">
                    {isSubmitting ? "Submitting..." : "Get Free Assessment"}
                  </Button>

                  <p className="text-xs text-center text-slate-500 mt-4">
                    Your details are kept strictly confidential. No spam policy.
                  </p>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default InstitutionalLoanPage;
