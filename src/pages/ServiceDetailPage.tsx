import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import { services } from "@/components/Services";
import { Sparkles, CheckCircle2, ArrowRight, ArrowLeft, Target, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Animation Wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = domRef.current;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        }, { threshold: 0.1 });
        
        if (currentRef) observer.observe(currentRef);
        return () => { if (currentRef) observer.unobserve(currentRef); };
    }, []);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const ServiceDetailPage = () => {
    const { id } = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    const service = useMemo(() => services.find((s) => s.id === id), [id]);

    // Scroll to top on mount when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!service) {
        return <Navigate to="/services" replace />;
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans overflow-x-hidden">
            <Header onOpenModal={openModal} />

            <main className="flex-grow pt-[70px] lg:pt-[80px]">
                {/* HERO SECTION */}
                <section className="relative py-16 lg:py-32 overflow-hidden bg-[#0A0F1C] text-center md:text-left flex items-center justify-center min-h-[45vh]">
                    <div className="absolute inset-0 z-0">
                        <OptimizedImage
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full"
                            imgClassName="object-cover opacity-20 scale-105 animate-in zoom-in duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/80 to-transparent" />
                        <div className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <FadeIn className="flex-1 max-w-4xl mx-auto md:mx-0">
                            <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 md:mb-8 text-sm font-semibold uppercase tracking-wider group">
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to All Services
                            </Link>

                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white w-fit text-xs md:text-sm font-bold tracking-wider uppercase mb-6 md:mb-8 backdrop-blur-md mx-auto md:mx-0 shadow-lg">
                                <service.icon className="w-4 h-4 md:w-5 md:h-5 text-blue-400" /> {service.category}
                            </div>

                            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl text-white mb-6 md:mb-8 leading-[1.1] drop-shadow-2xl">
                                {service.title}
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl max-w-3xl leading-relaxed md:ml-0 mx-auto font-light border-l-4 border-blue-500 pl-4 md:pl-6">
                                {service.shortDesc}
                            </p>
                        </FadeIn>
                    </div>
                </section>

                {/* OVERVIEW SECTION - EDITORIAL SPLIT LAYOUT */}
                {service.overviewParagraphs && service.overviewParagraphs.length > 0 && (
                    <section className="py-16 lg:py-28 relative bg-white border-b border-slate-100 overflow-hidden">
                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

                        <div className="container mx-auto px-4 relative z-10">
                            <FadeIn className="max-w-6xl mx-auto">
                                
                                <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-5 py-2 mb-12 shadow-sm">
                                    <Sparkles className="w-4 h-4 text-blue-600" />
                                    <span className="text-slate-800 font-bold text-xs uppercase tracking-wider">Comprehensive Overview</span>
                                </div>

                                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                                    {/* Left Column: Big Lead Statement (Sticky on Desktop) */}
                                    <div className="lg:w-[45%]">
                                        <div className="sticky top-32">
                                            <service.icon className="w-12 h-12 text-blue-100 mb-8" />
                                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display text-slate-900 leading-tight font-bold mb-6">
                                                {service.overviewParagraphs[0]}
                                            </h2>
                                            <div className="w-20 h-1 bg-primary rounded-full mt-8"></div>
                                        </div>
                                    </div>

                                    {/* Right Column: Detailed Body Text */}
                                    <div className="lg:w-[55%]">
                                        <div className="prose prose-lg md:prose-xl text-slate-600 max-w-none">
                                            {service.overviewParagraphs.slice(1).map((para, idx) => (
                                                <p key={idx} className="mb-8 leading-relaxed font-light">
                                                    {para}
                                                </p>
                                            ))}
                                        </div>
                                        
                                        {/* Small decorative quote aesthetic at the bottom */}
                                        <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 relative">
                                            <div className="absolute top-0 left-8 -translate-y-1/2 text-6xl text-primary/20 font-serif">"</div>
                                            <p className="text-lg font-medium text-slate-800 italic relative z-10">
                                                Your aspirations deserve global opportunities. We build the bridge to your future.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </FadeIn>
                        </div>
                    </section>
                )}

                {/* WHY CHOOSE US (If available) */}
                {service.whyChooseUs && service.whyChooseUs.length > 0 && (
                    <section className="py-12 lg:py-20 bg-slate-50 border-y border-slate-200">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <FadeIn>
                                    <h2 className="font-display font-bold text-2xl md:text-3xl text-center text-slate-900 mb-10 flex items-center justify-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-primary" /> The Global Pass Advantage
                                    </h2>
                                </FadeIn>
                                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                                    {service.whyChooseUs.map((reason, idx) => (
                                        <FadeIn key={idx} delay={idx * 100}>
                                            <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-all hover:-translate-y-1 h-full">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50/80 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Target className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <p className="text-slate-700 text-base md:text-lg font-medium leading-relaxed pt-1.5">{reason}</p>
                                            </div>
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* DYNAMIC LISTS (Features, Benefits, Programs, Roles) */}
                <section className="py-12 lg:py-20 bg-white relative">
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-5xl mx-auto space-y-12">

                            {service.features && service.features.length > 0 && (
                                <FadeIn>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 pb-3 border-b border-slate-100">Core Capabilities</h3>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-colors">
                                                <div className="w-6 h-6 rounded-full bg-green-100/80 flex items-center justify-center flex-shrink-0 shadow-sm border border-green-200/50">
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                                                </div>
                                                <p className="text-slate-700 font-medium text-sm md:text-base">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            )}

                            {service.benefits && (
                                <FadeIn>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 pb-3 border-b border-slate-100">Key Benefits</h3>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {service.benefits.map((item, idx) => (
                                            <div key={idx} className="px-5 py-3 bg-emerald-50/40 text-emerald-800 rounded-xl text-sm font-medium border border-emerald-100/50 hover:bg-emerald-50 transition-colors shadow-sm">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            )}

                            {service.whatweoffer && (
                                <FadeIn>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 pb-3 border-b border-slate-100">What We Offer</h3>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                                        {service.whatweoffer.map((item, idx) => (
                                            <div key={idx} className="px-5 py-3 bg-blue-50/40 text-blue-800 rounded-xl text-sm font-medium border border-blue-100/50 hover:bg-blue-50 transition-colors shadow-sm">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            )}

                            {service.programs && (
                                <FadeIn>
                                    <h3 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-6 pb-3 border-b border-slate-100">Available Programs</h3>
                                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                                        {service.programs.map((item, idx) => (
                                            <div key={idx} className="px-4 py-3 bg-slate-900 hover:bg-slate-800 transition-colors text-white rounded-lg text-sm font-semibold shadow-md text-center border border-slate-800">
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </FadeIn>
                            )}

                        </div>
                    </div>
                </section>

                {/* PROCESS SECTION */}
                {service.process && service.process.length > 0 && (
                    <section className="py-12 lg:py-24 bg-[#020617] text-white relative">
                        <div className="container mx-auto px-4 relative z-10">
                            <div className="max-w-4xl mx-auto">
                                <FadeIn className="text-center mb-12">
                                    <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">How It Works</h2>
                                    <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
                                        Our structured, step-by-step approach ensures absolute transparency and success.
                                    </p>
                                </FadeIn>

                                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-white/10">
                                    {service.process.map((step, idx) => (
                                        <FadeIn key={idx} delay={idx * 150} className="relative flex items-center w-full group">
                                            
                                            {/* Center Node Desktop */}
                                            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full items-center justify-center border-4 border-[#020617] z-10 text-white font-bold shadow-xl transition-transform group-hover:scale-110">
                                                {step.step}
                                            </div>

                                            {/* Center Node Mobile */}
                                            <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center border-4 border-[#020617] z-10 text-white font-bold shadow-xl transition-transform group-hover:scale-110">
                                                {step.step}
                                            </div>

                                            {idx % 2 === 0 ? (
                                                // LEFT SIDE
                                                <>
                                                    <div className="w-full md:w-1/2 flex md:justify-end pl-14 md:pl-0 md:pr-10">
                                                        <div className="w-full text-left bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-2xl hover:bg-white/10 transition-colors group-hover:-translate-y-1 group-hover:border-white/20">
                                                            <h4 className="font-bold text-lg md:text-xl mb-2 text-white">{step.title}</h4>
                                                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">{step.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="hidden md:block w-1/2"></div>
                                                </>
                                            ) : (
                                                // RIGHT SIDE
                                                <>
                                                    <div className="hidden md:block w-1/2"></div>
                                                    <div className="w-full md:w-1/2 flex md:justify-start pl-14 md:pl-10">
                                                        <div className="w-full text-left bg-white/5 backdrop-blur-md border border-white/10 p-5 md:p-6 rounded-2xl hover:bg-white/10 transition-colors group-hover:-translate-y-1 group-hover:border-white/20">
                                                            <h4 className="font-bold text-lg md:text-xl mb-2 text-white">{step.title}</h4>
                                                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">{step.description}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </FadeIn>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}


                {/* FAQ SECTION */}
                {service.faqs && service.faqs.length > 0 && (
                    <section className="py-12 lg:py-24 bg-slate-50 border-t border-slate-200">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <FadeIn className="text-center mb-12">
                                    <HelpCircle className="w-10 h-10 text-primary mx-auto mb-4 opacity-80" />
                                    <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-4">Frequently Asked Questions</h2>
                                    <p className="text-slate-500 text-base md:text-lg">Have more questions? We're here to help.</p>
                                </FadeIn>

                                <FadeIn delay={200} className="bg-white rounded-3xl p-5 md:p-8 shadow-md shadow-slate-200/50 border border-slate-100">
                                    <Accordion type="single" collapsible className="w-full text-left">
                                        {service.faqs.map((faq, idx) => (
                                            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-slate-100 last:border-0">
                                                <AccordionTrigger className="text-left py-4 text-base md:text-lg font-semibold text-slate-800 hover:text-primary transition-colors">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-slate-600 text-sm md:text-base leading-relaxed pb-5 px-1">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </FadeIn>
                            </div>
                        </div>
                    </section>
                )}


                {/* MASSIVE BOTTOM CALL TO ACTION */}
                <section className="py-16 md:py-24 bg-white relative border-t border-slate-200 overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />

                    <div className="container mx-auto px-4 text-center relative z-10">
                        <FadeIn className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative">
                            {/* Decorative element inside CTA */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
                            
                            <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-blue-400 mb-4 block relative z-10">Take the next step</span>
                            <h2 className="font-display font-bold text-3xl md:text-5xl text-white mb-6 leading-tight relative z-10">
                                Ready to build your global future?
                            </h2>
                            <p className="text-slate-300 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
                                Our expert consultants are ready to answer your questions and design a personalized roadmap specifically tailored to your aspirations. Let's make it happen.
                            </p>
                            <Button
                                onClick={openModal}
                                className="h-14 md:h-16 px-8 md:px-10 rounded-full bg-white text-slate-900 hover:bg-slate-100 shadow-xl hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all duration-300 text-base md:text-lg font-bold group inline-flex items-center gap-3 relative z-10"
                            >
                                Book Your Free Consultation
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </FadeIn>
                    </div>
                </section>

            </main>

            <Footer />
            <WhatsAppButton />
            <MobileFloatingCTA onOpenModal={openModal} />
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ServiceDetailPage;
