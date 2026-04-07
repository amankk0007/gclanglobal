import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Leadership from "@/components/Leadership";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import { Users, GraduationCap, Globe2, Award, Sparkles, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const stats = [
        { label: "Students Guided", value: "10k+", icon: Users },
        { label: "Partner Institutions", value: "500+", icon: Building2 },
        { label: "Visa Success Rate", value: "99%", icon: CheckCircle2 },
        { label: "Years Experience", value: "20+", icon: Award },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <Header onOpenModal={openModal} />

            <main>
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 bg-[#020617] overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-wider uppercase mb-6 backdrop-blur-sm">
                            <Sparkles className="w-3 h-3 fill-current" /> Our Story
                        </div>
                        <h1 className="font-display font-bold text-4xl lg:text-7xl text-white mb-6 leading-tight">
                            Bridging Borders, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Building Futures</span>
                        </h1>
                        <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                            Global Pass Career Consulting Inc. is a Canada-based leader in global education, empowering students to achieve their dreams with precision, ethics, and expertise.
                        </p>
                    </div>
                </section>

                {/* Metrics Section */}
                <section className="py-12 -mt-10 relative z-20 container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-2">{stat.value}</span>
                                <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Narrative Section */}
                <section className="py-20 lg:py-28 container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[40px] rotate-3 opacity-20 blur-lg" />
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                                alt="Team Collaboration"
                                className="relative rounded-[30px] border-8 border-white shadow-2xl w-full object-cover"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="font-display font-bold text-3xl lg:text-5xl text-slate-900 mb-6">
                                Global Standards, <br />
                                <span className="text-primary italic">Indian Values.</span>
                            </h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                                <p>
                                    Founded in 2022, Global Pass was born from a simple yet powerful mission: to democratize access to world-class education. We understand that studying abroad is not just an academic pursuit but a life-changing investment for families.
                                </p>
                                <p>
                                    Our team combines deep Canadian market expertise with a strong understanding of Indian cultural values. We don't just process applications; we mentor students to become global citizens who are ready to lead.
                                </p>
                                <ul className="grid sm:grid-cols-2 gap-4 mt-8">
                                    {[
                                        "Personalized Career Mapping",
                                        "End-to-End Visa Support",
                                        "Scholarship Assistance",
                                        "Post-Arrival Settlement"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-800 font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Associated Ventures Section */}
                <section className="py-16 container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <img
                            src="/tree.jpeg"
                            alt="Associated ventures of Global Pass"
                            className="w-full max-w-3xl mx-auto rounded-2xl shadow-lg border border-slate-200"
                        />
                        <p className="mt-5 text-lg font-semibold text-slate-800">
                            Associated venture of Global pass
                        </p>
                    </div>
                </section>

                {/* Leadership Section - Reusing Existing Component */}
                <Leadership />

                {/* Final CTA Section */}
                <section className="py-20 lg:py-28 bg-[#020617] relative overflow-hidden text-center">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <h2 className="font-display font-bold text-3xl lg:text-5xl text-white mb-6">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
                            Join thousands of successful students who have trusted Global Pass. Book a free consultation today.
                        </p>
                        <Button
                            onClick={openModal}
                            className="h-14 px-10 rounded-full bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform shadow-lg shadow-primary/25 text-lg font-bold"
                        >
                            Book Your Free Session
                        </Button>
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



export default AboutPage;
