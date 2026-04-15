import { Phone, Menu, X, MessageCircle, Mail, Facebook, Instagram, Linkedin, ChevronRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import PaymentModal from "@/components/PaymentModal";

interface HeaderProps {
  onOpenModal?: () => void;
}

const Header = ({ onOpenModal }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (isHomePage) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
    setIsMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", id: "hero" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Apply", href: "/apply" },
    { label: "Partners", href: "/partners" },
    { label: "Gallery", href: "/gallery" },
    { label: "Scholarships Program", href: "/institutional-loan", badge: "Hot" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Bar - Premium Dark - Visible on all screens */}
      <div className="bg-[#020617] text-white py-2 border-b border-white/5 relative z-50">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs font-medium">
          {/* Mobile: Phone only, Desktop: Phone + Email */}
          <div className="flex items-center gap-4 lg:gap-6">
            <a href="tel:+917508813555" className="flex items-center gap-1.5 lg:gap-2 hover:text-primary transition-colors">
              <Phone className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              <span className="text-[11px] lg:text-xs">+91-7508813555</span>
            </a>
            <a href="mailto:info@globalpasscareer.com" className="hidden sm:flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-3.5 h-3.5" />
              <span>info@globalpasscareer.com</span>
            </a>
          </div>
          {/* Desktop: Social links */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="opacity-60">Follow us:</span>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/share/1DmTjjBvXC/?mibextid=wwXIfr" className="hover:text-primary transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="https://www.instagram.com/globalpasscareer?igsh=MW41bmUwYm94MWNzMg==" className="hover:text-primary transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin className="w-3.5 h-3.5" /></a>
            </div>
          </div>
          {/* Mobile: WhatsApp quick link */}
          <a
            href="https://wa.me/+917508813555"
            target="_blank"
            rel="noopener noreferrer"
            className="lg:hidden flex items-center gap-1.5 text-[#25D366] hover:text-[#20BA5C] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="text-[11px] font-semibold">WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 border-b border-transparent ${isScrolled
          ? "bg-white/85 backdrop-blur-xl border-white/20 shadow-sm py-2.5"
          : "bg-white/60 backdrop-blur-md py-3.5 border-white/10"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <OptimizedImage
                  src="/logo.png"
                  alt="Global Pass Logo"
                  className="w-16 h-16 lg:w-16 lg:h-18"
                  imgClassName="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="hidden sm:block">
                {/* <h1 className="font-display font-bold text-xl lg:text-2xl leading-none tracking-tight text-primary">
                  GLOBAL PASS
                </h1>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                  Career Consultancy Inc.
                </p> */}
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-md px-2 py-1.5 rounded-full border border-slate-200/70 shadow-md">
              {navLinks.map((link) => (
                link.href ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-all duration-300 whitespace-nowrap"
                  >
                    {link.label}
                    {link.badge && (
                      <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-orange-500 text-white rounded-full uppercase tracking-wide animate-pulse">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.id!)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-primary hover:bg-slate-50 rounded-full transition-all duration-300 whitespace-nowrap"
                  >
                    {link.label}
                  </button>
                )
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Mobile Phone Button */}
              <a
                href="tel:+917508813555"
                className="lg:hidden flex w-10 h-10 rounded-full bg-primary/10 items-center justify-center hover:bg-primary/20 transition-all duration-300"
              >
                <Phone className="w-5 h-5 text-primary" />
              </a>

              {/* Payment Gateway Button - Replaced WhatsApp */}
              {/* <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 h-8 px-4 rounded-full bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white shadow-md hover:shadow-slate-500/20 hover:-translate-y-0.5 transition-all duration-300 font-semibold text-xs whitespace-nowrap"
              >
                <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                Pay Now
              </button> */}

              <Button
                onClick={onOpenModal}
                className="hidden sm:flex rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 px-6 h-11 font-semibold"
              >
                Book Consultancy
                <ChevronRight className="w-4 h-4 ml-1 opacity-70" />
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Full Screen Overlay */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-100 max-h-[85vh] overflow-y-auto flex flex-col">
              <div className="p-4">
                <div className="rounded-2xl overflow-hidden">
                  <nav className="flex flex-col p-2">
                    {navLinks.map((link) => (
                      link.href ? (
                        <Link
                          key={link.label}
                          to={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="py-3 px-4 font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </Link>
                      ) : (
                        <button
                          key={link.label}
                          onClick={() => scrollToSection(link.id!)}
                          className="py-3 px-4 font-medium text-left text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 flex items-center justify-between group"
                        >
                          {link.label}
                          <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </button>
                      )
                    ))}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3 px-2">
                      <a href="mailto:info@globalpasscareer.com" className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-slate-50">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Mail className="w-4 h-4" />
                        </div>
                        info@globalpasscareer.com
                      </a>
                      <a href="tel:+917508813555" className="flex items-center gap-3 text-sm font-medium text-slate-600 hover:text-primary transition-colors p-2 rounded-lg hover:bg-slate-50">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Phone className="w-4 h-4" />
                        </div>
                        +91-7508813555
                      </a>
                    </div>

                    <div className="mt-2 pt-2 grid grid-cols-2 gap-3">
                      <Button onClick={onOpenModal} className="w-full justify-center gap-2 h-11 bg-primary text-white shadow-lg shadow-primary/20">
                        Book Now
                      </Button>
                      <button onClick={() => setIsPaymentModalOpen(true)} className="w-full">
                        <Button className="w-full justify-center gap-2 h-11 bg-slate-900 hover:bg-slate-800 text-white border-none shadow-lg whitespace-nowrap">
                          <CreditCard className="w-4 h-4 text-emerald-400" /> Pay Now
                        </Button>
                      </button>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div >
      </header >
      
      <PaymentModal isOpen={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen} />
    </>
  );
};

export default Header;
