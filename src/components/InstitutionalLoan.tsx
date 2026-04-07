import { Building2, FileText, CheckCircle, ArrowRight, IndianRupee, Landmark, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface InstitutionalLoanProps {
  onOpenModal: () => void;
}

const InstitutionalLoan = ({ onOpenModal }: InstitutionalLoanProps) => {
  const services = [
    "Loan eligibility assessment",
    "Financial & statutory documentation",
    "Project report preparation",
    "Bank & NBFC coordination",
    "End-to-end disbursement support",
  ];

  const institutions = [
    { name: "Schools", icon: GraduationCap },
    { name: "Colleges", icon: Building2 },
    { name: "Universities", icon: Landmark },
  ];

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-background via-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

          <div className="relative bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
            <div className="grid lg:grid-cols-5 gap-0">
              {/* Left Content - 3 columns */}
              <div className="lg:col-span-3 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-orange-500/10 text-orange-600 px-3 py-1.5 rounded-full text-xs font-semibold">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                    India Only
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold">
                    <IndianRupee className="w-3 h-3" />
                    ₹10L – ₹100Cr+
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                  Institutional Loan Assistance for{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Educational Institutions
                  </span>
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6 max-w-xl">
                  We work closely with banks and NBFC partners to help schools, colleges, and universities secure funding for infrastructure development, expansion, and institutional growth.
                </p>

                {/* Eligible Institutions - Compact */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {institutions.map((inst) => (
                    <div key={inst.name} className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                      <inst.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{inst.name}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-muted-foreground">+ Trusts & Societies</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    onClick={onOpenModal}
                    size="lg"
                    className="shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90 text-white"
                  >
                    Enquire Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Link to="/institutional-loan">
                    <Button variant="outline" size="lg" className="group border-primary/20 hover:bg-primary/5 text-primary">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Card - 2 columns */}
              <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary/90 p-8 md:p-10 flex flex-col justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%2010h10v10H0z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.03%22%2F%3E%3C%2Fsvg%3E')]" />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Our Services</h3>
                  </div>

                  <ul className="space-y-3">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-white/90 text-sm">{service}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/70 text-xs mb-1">Loan Range</p>
                        <p className="text-white font-bold text-lg">₹10 Lakh – ₹100 Crore+</p>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                        <IndianRupee className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalLoan;
