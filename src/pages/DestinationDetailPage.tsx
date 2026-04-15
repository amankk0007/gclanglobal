import { useEffect, useRef, useState, ReactNode } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { destinations } from "@/components/Destinations";
import { ArrowLeft, MapPin, Building2, Banknote, PlaneTakeoff, Lightbulb, CheckCircle2, Navigation, MoveRight, BookOpen, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";

// FadeIn Wrapper Component for Scroll Animations
const FadeIn = ({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            });
        }, { threshold: 0.1 });

        const currentRef = domRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0 w-full' : 'opacity-0 translate-y-12 w-full'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};


export default function DestinationDetailPage() {
    const { id } = useParams();
    const destination = destinations.find(d => d.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!destination) {
        return <Navigate to="/" replace />;
    }

    // Extract the first sentence of the first paragraph to serve as the massive heading.
    const firstPara = destination.overviewParagraphs[0] || "";
    const periodIndex = firstPara.indexOf('.');
    const firstSentence = periodIndex !== -1 ? firstPara.substring(0, periodIndex + 1) : firstPara;
    const remainingFirstPara = periodIndex !== -1 ? firstPara.substring(periodIndex + 1).trim() : null;

    const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

    return (
        <>
            <Header onOpenModal={() => setIsConsultationModalOpen(true)} />
            
            <div className="min-h-screen bg-slate-50 font-sans overflow-x-hidden pt-20">
            {/* HERO PARALLAX SECTION */}
            <section className="relative h-[65vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover animate-in zoom-in duration-[2000ms] scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#f8fafc]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-xl mb-6 hover:bg-white/20 transition-colors">
                            <MapPin className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm font-bold tracking-wider uppercase">Study in {destination.name}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                            {destination.name} <span className="text-5xl">{destination.flag}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto font-light leading-relaxed drop-shadow-md">
                            {destination.description}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* QUICK STATS BAR */}
            <section className="relative z-20 -mt-20">
                <div className="container mx-auto px-4">
                    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-6 md:p-10 border border-slate-100 backdrop-blur-xl">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                            <div className="flex flex-col items-center text-center px-4">
                                <Building2 className="w-10 h-10 text-blue-500 mb-4" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Top Tier</h3>
                                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Universities Globally</p>
                            </div>
                            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                                <PlaneTakeoff className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">{destination.visaProcess.length} Steps</h3>
                                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Streamlined Visa Process</p>
                            </div>
                            <div className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
                                <Navigation className="w-10 h-10 text-purple-500 mb-4" />
                                <h3 className="text-2xl font-bold text-slate-900 mb-1">Guaranteed</h3>
                                <p className="text-slate-500 font-medium text-sm uppercase tracking-wider">Admissions Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EDITORIAL OVERVIEW LAYOUT */}
            <section className="py-20 lg:py-28 relative overflow-hidden bg-white mt-12">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50/50 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn className="max-w-6xl mx-auto">
                        <div className="mb-8 inline-flex items-center gap-2">
                             <BookOpen className="w-5 h-5 text-blue-600" />
                             <span className="text-slate-800 font-bold text-sm uppercase tracking-widest border-b-2 border-blue-600 pb-1">The Overview</span>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                            <div className="lg:w-2/5">
                                <h2 className="text-3xl md:text-5xl font-display text-slate-900 leading-[1.1] font-bold mb-8">
                                    {firstSentence}
                                </h2>
                                <div className="w-24 h-1.5 bg-blue-600 rounded-full mb-8"></div>
                                <Link to="/services" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors group">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Explore More Countries
                                </Link>
                            </div>
                            
                            <div className="lg:w-3/5 space-y-6 text-lg text-slate-600 font-light leading-relaxed">
                                {remainingFirstPara && <p>{remainingFirstPara}</p>}
                                {destination.overviewParagraphs.slice(1).map((para, idx) => (
                                    <p key={idx}>{para}</p>
                                ))}

                                {/* Fun Facts Bento Box */}
                                <div className="mt-12 bg-amber-50 rounded-3xl p-8 border border-amber-100 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Lightbulb className="w-32 h-32 text-amber-500" />
                                    </div>
                                    <h4 className="text-xl font-bold text-amber-900 mb-6 flex items-center gap-2 relative z-10">
                                        <Lightbulb className="w-5 h-5 text-amber-600" />
                                        Fascinating Facts about {destination.name}
                                    </h4>
                                    <ul className="space-y-4 relative z-10">
                                        {destination.funFacts.map((fact, idx) => (
                                            <li key={idx} className="flex gap-3 text-amber-800 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2.5 shrink-0" />
                                                <span>{fact}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* MULTI-GRID BENTO LAYOUT FOR DETAILS */}
            <section className="py-20 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto px-4">
                    <FadeIn className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">Everything You Need to Know</h2>
                        <p className="text-slate-500 text-lg">Comprehensive details to prepare you for your educational journey.</p>
                    </FadeIn>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                        
                        {/* Top Universities Card */}
                        <FadeIn delay={100} className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100">
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-6">Premier Institutions</h3>
                                <ul className="space-y-4">
                                    {destination.topUniversities.map((uni, idx) => (
                                        <li key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                                                <MoveRight className="w-4 h-4" />
                                            </div>
                                            <span className="font-semibold text-slate-700">{uni}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeIn>

                        {/* Living Costs & Process (Right Column Span 2) */}
                        <div className="lg:col-span-2 flex flex-col gap-8">
                            
                            {/* Cost of Living */}
                            <FadeIn delay={200}>
                                <div className="bg-[#020617] text-white rounded-3xl p-8 shadow-xl border border-slate-800 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                                            <Banknote className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-6">Estimated Cost of Living</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {destination.livingCosts.map((cost, idx) => (
                                                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">{cost.category}</p>
                                                    <p className="text-xl font-bold text-emerald-50">{cost.cost}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Visa Process */}
                            <FadeIn delay={300}>
                                <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 h-full">
                                    <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                                        <PlaneTakeoff className="w-7 h-7 text-indigo-500" />
                                        Streamlined Visa Process
                                    </h3>
                                    
                                    <div className="space-y-6 relative before:absolute before:inset-0 before:left-6 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-slate-100">
                                        {destination.visaProcess.map((step, idx) => (
                                            <div key={idx} className="relative flex items-center w-full group">
                                                {/* Left Column Spacer */}
                                                <div className="hidden md:block md:w-1/2 md:pr-12 text-right">
                                                    {idx % 2 === 0 ? (
                                                        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm group-hover:-translate-y-1 transition-transform">
                                                            <h4 className="font-bold text-slate-900 text-lg mb-1">{step.title}</h4>
                                                            <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                                                        </div>
                                                    ) : null}
                                                </div>

                                                {/* Center Node */}
                                                <div className="absolute left-6 md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center border-4 border-white z-10 text-white font-bold shadow-md">
                                                    {step.step}
                                                </div>

                                                {/* Right Column Spacer */}
                                                <div className="w-full pl-16 md:w-1/2 md:pl-12 text-left">
                                                    {idx % 2 !== 0 || window.innerWidth < 768 ? ( // Fallback for mobile stacking
                                                        <div className={`p-5 rounded-2xl border group-hover:-translate-y-1 transition-transform ${idx % 2 !== 0 ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100 md:hidden'}`}>
                                                            <h4 className="font-bold text-slate-900 text-lg mb-1">{step.title}</h4>
                                                            <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                        </div>
                    </div>
                </div>
            </section>

                 {/* FINAL CTA SECTION */}
                 <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-800 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <FadeIn>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 drop-shadow-md">Ready to study in {destination.name}?</h2>
                            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                                {destination.whyUs} Let's make your global dreams a reality.
                            </p>
                            <button 
                                onClick={() => setIsConsultationModalOpen(true)}
                                className="inline-flex items-center gap-2 bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-white/20 cursor-pointer"
                            >
                                Book a Free Consultation
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </FadeIn>
                    </div>
                </section>
            </div>
            
            <Footer />
            <ConsultationModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
            <WhatsAppButton />
            <MobileFloatingCTA onOpenModal={() => setIsConsultationModalOpen(true)} />
        </>
    );
}
