import { Phone, MapPin, Facebook, Linkedin, Instagram, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/GlobalPassCareerConsultancy", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/global-pass-career-consultancy/?viewAsMember=true", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/globalpasscareer/", label: "Instagram" },
  ];

  const services = [
    { label: "Study in India", href: "#" },
    { label: "Study in Canada", href: "#" },
    { label: "Study in USA", href: "#" },
    { label: "Study in UK", href: "#" },
    { label: "Study in Australia", href: "#" },
    { label: "MBBS Abroad", href: "#" },
  ];

  const company = [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#leadership" },
    { label: "Careers", href: "#" },
    { label: "Partner With Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#020617] text-white pt-20 lg:pt-24 border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Top Section: Newsletter & Brand */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-white/80">Accepting 2026-27 Applications</span>
            </div>
            <h2 className="font-display font-bold text-4xl lg:text-5xl mb-6 leading-tight">
              Start your global journey <br /> with <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">confidence.</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mb-8">
              Join 10,000+ students receiving expert guidance for their international education dreams. No spam, just opportunities.
            </p>

            {/* Newsletter Input */}
            <div className="flex gap-3 max-w-md">
              <Input
                placeholder="Enter your email address"
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 rounded-xl focus:border-primary/50 focus:ring-primary/20"
              />
              <Button className="h-12 px-6 rounded-xl bg-white text-black hover:bg-white/90 font-bold">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="lg:pl-10 grid sm:grid-cols-2 gap-10 lg:gap-16">
            {/* Services Column */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-6">Global Opportunities</h4>
              <ul className="space-y-4">
                {services.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-6">Company</h4>
              <ul className="space-y-4">
                {company.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Bottom Section: Contact & Legals */}
        <div className="grid lg:grid-cols-3 gap-10 mb-12">

          {/* Brand Detail */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="">
                <OptimizedImage src="/logo.png" alt="Global Pass" className="w-20 h-20" imgClassName="object-contain" />
              </div>
              <h3 className="font-display font-bold text-2xl tracking-wide text-white">GLOBAL PASS</h3>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Empowering students with the right guidance, financial tools, and global connections to build successful careers.
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300">
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Our Offices
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Canada</p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  12508, Kennedy Road,<br />
                  Caledon ON, L7C4L6
                </p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">India</p>
                <p className="text-slate-400 leading-relaxed text-sm">
                  SCO 3017-18 Sector 22-D,<br />
                  Chandigarh
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-base text-white mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              Contact Us
            </h4>
            <div className="space-y-3">
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">Canada</p>
                <a href="tel:+15198060052" className="block text-slate-400 hover:text-white transition-colors text-sm">+1 (519) 806-0052</a>
              </div>
              <div>
                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">India</p>
                <a href="tel:+917508813555" className="block text-slate-400 hover:text-white transition-colors text-sm">+91-7508813555</a>
              </div>
              <div className="pt-2">
                <a href="mailto:info@globalpasscareer.com" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm border-b border-white/20 hover:border-white transition-all pb-0.5">
                  <Mail className="w-3.5 h-3.5" /> info@globalpasscareer.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>&copy; {currentYear} Global Pass Career Consultancy Inc. All rights reserved.</p>
          <div className="flex gap-4">
  <Link to="/terms.tsx" className="hover:text-slate-400 transition-colors">
    Terms of Service
  </Link>

  <Link to="/privacy" className="hover:text-slate-400 transition-colors">
    Privacy Policy
  </Link>

  <Link to="/cookies" className="hover:text-slate-400 transition-colors">
    Cookie Policy
  </Link>
</div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
