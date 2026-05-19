import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import { services, ServiceCategory } from "@/components/Services";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/OptimizedImage";

const ServicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredServices = useMemo(() => {
        return activeCategory === "All"
            ? services
            : services.filter(service => service.category === activeCategory);
    }, [activeCategory]);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Header onOpenModal={openModal} />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 bg-[#020617] overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 fill-current" /> Expert Solutions
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight max-w-4xl">
                            Empowering Your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Global Journey</span>
                        </h1>
                        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                            From personalized career counseling to final placements, we provide end-to-end support to ensure your success on the global stage.
                        </p>
                    </div>
                </section>

                {/* Services Grid Section */}
                <section className="py-20 relative bg-slate-50">
                    <div className="container mx-auto px-4">
                        {/* Category Filter */}
                        <div className="flex justify-center mb-16">
                            <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200 shadow-sm overflow-x-auto hide-scrollbar max-w-full">
                                {["All", "Guidance", "Admissions", "Documentation", "Financial"].map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category as ServiceCategory)}
                                        className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                                            activeCategory === category
                                                ? "bg-slate-900 text-white shadow-md transform scale-105"
                                                : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
                            {filteredServices.map((service, idx) => (
                                <div
                                    key={service.id || idx}
                                    onClick={() => navigate(`/services/${service.id}`)}
                                    className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer flex flex-col relative h-full transform hover:-translate-y-2"
                                >
                                    {/* Card Image */}
                                    <div className="h-56 overflow-hidden relative">
                                        <OptimizedImage
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full"
                                            imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                            <service.icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-lg border border-white/10">
                                                {service.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-8 flex-1 flex flex-col relative bg-white">
                                        <h3 className="font-display font-bold text-2xl text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {service.title}
                                        </h3>
                                        <p className="text-slate-600 mb-6 leading-relaxed flex-1">
                                            {service.shortDesc}
                                        </p>

                                        {/* Preview of features */}
                                        <ul className="mb-6 space-y-2">
                                            {service.features?.slice(0, 2).map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2 text-sm text-slate-500">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="line-clamp-1">{feature}</span>
                                                </li>
                                            ))}
                                            {(service.features?.length || 0) > 2 && (
                                                <li className="text-xs font-medium text-slate-400 pl-6 italic">...and more</li>
                                            )}
                                        </ul>

                                        <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-sm font-semibold text-slate-500 group-hover:text-primary transition-colors">Explore Detail</span>
                                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1 shadow-sm">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-24 bg-white relative border-t border-slate-100">
                    <div className="container mx-auto px-4 text-center">
                        <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-50 to-white border border-slate-100 p-8 md:p-12 rounded-[3rem] shadow-xl shadow-slate-200/50">
                            <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-4">Unsure where to start?</h2>
                            <p className="text-slate-600 text-lg mb-8">
                                Schedule a one-on-one session with our senior counselors. Let's design a roadmap specifically tailored to your aspirations.
                            </p>
                            <Button
                                onClick={openModal}
                                className="h-14 px-8 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform shadow-lg shadow-primary/25 text-lg font-bold"
                            >
                                Book Your Free Consultation
                            </Button>
                        </div>
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

export default ServicesPage;
