import { ArrowRight, GraduationCap, CheckCircle, Shield, Plane, Globe, BookOpen, Heart, Users, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useState } from "react";
import ConsultationModal from "@/components/ConsultationModal";

const ResidentialSchools = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const services = [
        {
            icon: School,
            title: "Admissions Support",
            description: "End-to-end assistance for admission to top residential schools across India."
        },
        {
            icon: BookOpen,
            title: "Equivalency Guidance",
            description: "Support with academic equivalency and curriculum alignment for students transferring from international education systems."
        },
        {
            icon: Users,
            title: "Regular Monitoring",
            description: "We stay in regular contact with students to ensure academic progress, well-being, and personal development."
        },
        {
            icon: Shield,
            title: "Local Guardian Support",
            description: "We act as a responsible local guardian, ensuring student safety, discipline, and parental peace of mind."
        },
        {
            icon: Plane,
            title: "Airport-to-School",
            description: "Safe and reliable escort and transportation from airport to school campus."
        }
    ];

    const benefits = [
        "Best Indian Education System with strong academic foundations",
        "Schools affiliated with CBSE and ICSE boards",
        "Focus on discipline, values, and holistic development",
        "Preparation for global careers as doctors, engineers, scientists, and innovators"
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Header onOpenModal={() => setIsModalOpen(true)} />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#020617]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Education Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/90 to-[#020617]" />
                </div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-primary-foreground/90 text-sm font-semibold mb-6 animate-fade-in backdrop-blur-sm">
                        Global Pass Residential Program
                    </span>
                    <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-white mb-6 leading-tight animate-fade-up">
                        Residential Schools for <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NRI Students</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up delay-100">
                        Ensuring a smooth transition from abroad to India’s best education system while nurturing strong values and global competitiveness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
                        <Button
                            onClick={() => setIsModalOpen(true)}
                            size="lg"
                            className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 px-8 h-14 text-lg"
                        >
                            Enquire Now
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                            className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 h-14 text-lg"
                        >
                            Explore Education
                        </Button>
                    </div>
                </div>
            </div>

            {/* Vision Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mb-4">Our Vision for NRI Students</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6" />
                        <p className="text-slate-600">
                            We bridge the gap between global exposure and Indian roots.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Globe,
                                title: "Global Competence",
                                desc: "Students are trained to compete confidently at the international level."
                            },
                            {
                                icon: Heart,
                                title: "Cultural Connection",
                                desc: "Students stay connected to their Indian roots, traditions, and values."
                            },
                            {
                                icon: GraduationCap,
                                title: "Balanced Lifestyle",
                                desc: "Encouraging positive habits and discipline while retaining global exposure."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-[#020617] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-3xl rounded-full" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 space-y-8">
                            <div>
                                <h2 className="font-display font-bold text-3xl lg:text-5xl mb-6">Why Choose Indian Residential Schools?</h2>
                                <p className="text-lg text-slate-300 mb-2">Made in India, Ready for the World.</p>
                                <div className="w-20 h-1.5 bg-secondary rounded-full" />
                            </div>

                            <div className="grid gap-6">
                                {benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                                            <CheckCircle className="w-5 h-5 text-secondary" />
                                        </div>
                                        <p className="text-lg text-slate-200">{benefit}</p>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => setIsModalOpen(true)}
                                size="lg"
                                className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-10 h-14 text-lg shadow-xl shadow-white/10"
                            >
                                Get Detailed Info
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-square sm:aspect-video lg:aspect-square">
                                <img
                                    src="https://images.unsplash.com/photo-1596767702656-628d0979a05b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80"
                                    alt="Indian Residential School"
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="font-display font-bold text-2xl text-white">World-Class Facilities</h3>
                                    <p className="text-white/80">Blending tradition with modernity.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section id="services" className="py-20 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Comprehensive Support</span>
                        <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate-900 mt-2 mb-6">Our Services</h2>
                        <p className="text-slate-600">
                            Global Pass Career Consultancy provides complete guidance and support.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 text-primary">
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-display font-bold text-xl text-slate-900 mb-3">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Commitment Section */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <School className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                    <h2 className="font-display font-bold text-3xl lg:text-5xl text-slate-900 mb-6">Our Commitment</h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        "At Global Pass Career Consultancy, we shape students into confident global citizens with strong Indian values, prepared for academic excellence and future leadership."
                    </p>
                </div>
            </section>

            <Footer />
            <WhatsAppButton />
            <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default ResidentialSchools;
