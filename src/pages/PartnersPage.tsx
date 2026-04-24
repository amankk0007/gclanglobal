import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ConsultationModal from "@/components/ConsultationModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileFloatingCTA from "@/components/MobileFloatingCTA";
import { Handshake, Building2, Globe, Award, Star, Users, CheckCircle2, ArrowRight, Sparkles, TrendingUp, Shield, Zap, Briefcase, Target, Lightbulb, Rocket, Crown, Diamond, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/OptimizedImage";

const PartnersPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const openModal = () => setIsModalOpen(true);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Partner data with updated websites
    const partners = [
        {
            name: "Voytale",
            type: "Spiritual Travel Partner",
            description: "A leading spiritual tourism company offering curated pilgrimage journeys, wellness retreats, and luxury travel experiences across India.",
            website: "https://www.voytale.com",
            ranking: "Top Spiritual Travel Company",
            clients: "10,000+"
        },
        {
            name: "Nrisetu",
            type: "Educational Partner",
            description: "Premier platform for NRI students offering specialized educational services and guidance.",
            website: "https://www.nrisetu.in",
            ranking: "Top NRI Platform",
            students: "15,000+"
        },
        {
            name: "Jangatha",
            type: "Educational Partner",
            description: "Innovative educational technology platform connecting students with global opportunities.",
            website: "https://www.jangatha.com",
            ranking: "Top EdTech",
            students: "8,000+"
        },
        {
            name: "Sky Immigration Solutions",
            type: "Immigration Partner",
            description: "Expert immigration services providing comprehensive visa and settlement solutions.",
            website: "https://www.skyimmigration.com",
            ranking: "Top Immigration",
            students: "5,000+"
        },
        {
            name: "TCIL IT Chandigarh",
            type: "Educational Partner",
            description: "Premier technical institute offering quality education and training programs with modern infrastructure.",
            website: "https://tcilitchandigarh.com",
            ranking: "Top Technical Institute",
            students: "25,000+"
        },
        {
            name: "TowRides",
            type: "Transport Partner",
            description: "Leading transportation service provider known for reliability and excellent customer service.",
            website: "https://towrides.in",
            ranking: "Top Transport Service",
            students: "12,000+"
        },
        {
            name: "ICS Global Pass",
            type: "Educational Partner",
            description: "Progressive educational consultancy offering innovative programs and global opportunities.",
            website: "https://icsglobalpass.com",
            ranking: "Top Innovation",
            students: "18,000+"
        }
    ];

    const stats = [
        { label: "Partner Institutions", value: "500+", icon: Building2, color: "from-blue-500 to-blue-700" },
        { label: "Countries Covered", value: "25+", icon: Globe, color: "from-blue-400 to-blue-600" },
        { label: "Success Rate", value: "99%", icon: CheckCircle2, color: "from-blue-600 to-blue-800" },
        { label: "Years Partnership", value: "15+", icon: Award, color: "from-blue-500 to-blue-700" },
    ];

    const benefits = [
        {
            icon: Zap,
            title: "Fast-Track Admissions",
            description: "Expedited application processing with priority review for our students.",
            gradient: "from-blue-400 to-blue-600"
        },
        {
            icon: Shield,
            title: "Guaranteed Quality",
            description: "All partners are accredited institutions with proven track records.",
            gradient: "from-blue-500 to-blue-700"
        },
        {
            icon: TrendingUp,
            title: "Career Growth",
            description: "Access to exclusive internship and job placement programs.",
            gradient: "from-blue-600 to-blue-800"
        },
        {
            icon: Sparkles,
            title: "Premium Support",
            description: "Dedicated advisors and personalized guidance throughout your journey.",
            gradient: "from-blue-400 to-blue-600"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
            <Header onOpenModal={openModal} />

            <main>
                {/* Professional Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                    {/* Professional Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                        <div className="absolute inset-0">
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/20 via-blue-500/20 to-blue-700/20 animate-gradient-shift"></div>
                            <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-30 animate-float"></div>
                            <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-3xl opacity-30 animate-float-delay-1"></div>
                            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-30 animate-float-delay-2"></div>
                            <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-3xl opacity-30 animate-float-delay-3"></div>
                        </div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay"></div>
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <div className="max-w-6xl mx-auto">
                            {/* Premium Badge */}
                            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white mb-12 animate-fade-in-up">
                                <Crown className="w-6 h-6 text-blue-400" />
                                <span className="text-sm font-bold tracking-wider uppercase">Elite Partnership Network</span>
                                <Award className="w-6 h-6 text-blue-400" />
                            </div>

                            {/* Main Title */}
                            <h1 className="font-display font-bold text-6xl md:text-7xl lg:text-9xl text-white mb-8 leading-tight">
                                <span className="block mb-4 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent animate-gradient">
                                    Strategic
                                </span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-white animate-shimmer">
                                    Partnerships
                                </span>
                            </h1>

                            {/* Enhanced Subtitle */}
                            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
                                Empowering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300 font-bold">global education</span> through
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 font-bold">strategic partnerships</span> with world-class institutions
                            </p>

                            {/* Premium CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button
                                    onClick={openModal}
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-10 py-5 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105 border-2 border-white/20"
                                >
                                    <Rocket className="w-6 h-6 mr-3" />
                                    Start Partnership Journey
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-10 py-5 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105"
                                >
                                    Explore Network
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Professional Scroll Indicator */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                        <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
                            <div className="w-2 h-4 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mt-2 animate-pulse"></div>
                        </div>
                    </div>
                </section>

                {/* Professional Stats Section */}
                <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-blue-100/50 to-blue-50/50"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                <Target className="w-4 h-4" />
                                <span>Achievement Metrics</span>
                                <Target className="w-4 h-4" />
                            </div>
                            <h2 className="font-display font-bold text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                                Our Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Impact</span>
                            </h2>
                            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Transforming lives through strategic educational partnerships worldwide
                            </p>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-500"
                                         style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-white/50">
                                        <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                            <stat.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="font-display font-bold text-4xl lg:text-5xl text-slate-900 mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-slate-600 font-medium text-lg">
                                            {stat.label}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium Partners Showcase */}
                <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-blue-50/20 to-blue-100/20"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                <Crown className="w-4 h-4" />
                                <span>Elite Partners</span>
                                <Crown className="w-4 h-4" />
                            </div>
                            <h2 className="font-display font-bold text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                                Our Distinguished <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Partner Network</span>
                            </h2>
                            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Curated partnerships with institutions that share our commitment to excellence and innovation
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {partners.map((partner, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 p-6 h-full"
                                >
                                    <div className="flex flex-col h-full">
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full mb-4">
                                                {partner.type}
                                            </span>
                                            <h3 className="font-bold text-xl text-gray-900 mb-3">
                                                {partner.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                                {partner.description}
                                            </p>
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Ranking</div>
                                                <div className="font-bold text-base text-gray-900">{partner.ranking}</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 font-semibold mb-1 uppercase tracking-wider">Students</div>
                                                <div className="font-bold text-base text-gray-900">{partner.students}</div>
                                            </div>
                                        </div>

                                        <a
                                            href={partner.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 text-center"
                                        >
                                            Visit Website
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium Benefits Section */}
                <section className="py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-blue-50/20 to-blue-100/20"></div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-20">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                <Lightbulb className="w-4 h-4" />
                                <span>Exclusive Advantages</span>
                                <Lightbulb className="w-4 h-4" />
                            </div>
                            <h2 className="font-display font-bold text-5xl md:text-6xl text-slate-900 mb-6 leading-tight">
                                Why Partner With <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Global Pass</span>
                            </h2>
                            <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
                                Discover the unparalleled benefits that set our partnership ecosystem apart
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="group relative">
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 rounded-3xl transition-all duration-700"
                                         style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }}></div>
                                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 border border-white/50">
                                        <div className={`w-20 h-20 bg-gradient-to-br ${benefit.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                                            <benefit.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <h3 className="font-bold text-xl text-slate-900 mb-4">
                                            {benefit.title}
                                        </h3>
                                        <p className="text-slate-600 text-base leading-relaxed">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Premium Partnership CTA Section */}
                <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-blue-700/10 animate-gradient-shift"></div>
                        <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-40 animate-float"></div>
                        <div className="absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-3xl opacity-40 animate-float-delay-1"></div>
                        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-30 animate-float-delay-2"></div>
                    </div>
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                    
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <div className="max-w-5xl mx-auto">
                            <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/20 text-white font-bold text-xs uppercase tracking-wider mb-12">
                                <Briefcase className="w-5 h-5 text-blue-400" />
                                <span>Partnership Opportunity</span>
                                <Briefcase className="w-5 h-5 text-blue-400" />
                            </div>
                            
                            <h2 className="font-display font-bold text-5xl md:text-7xl text-white mb-8 leading-tight">
                                Become Our <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600">Strategic Partner</span>
                            </h2>
                            
                            <p className="text-slate-200 text-xl md:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed font-light">
                                Join our elite network of world-class institutions and co-create the future of global education through innovation and excellence
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-8 justify-center">
                                <Button
                                    onClick={openModal}
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-12 py-6 text-xl font-bold rounded-full transition-all duration-500 hover:scale-105 border-2 border-white/20"
                                >
                                    <Users className="w-6 h-6 mr-3" />
                                    Connect With Partnership Team
                                    <ArrowRight className="w-6 h-6 ml-3" />
                                </Button>
                                <a
                                    href="mailto:partnerships@globalpasscareer.com"
                                    className="inline-flex items-center justify-center px-12 py-6 rounded-full border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-xl transition-all duration-500 font-bold text-xl hover:scale-105"
                                >
                                    <Briefcase className="w-6 h-6 mr-3" />
                                    Submit Partnership Proposal
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <ConsultationModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
            <WhatsAppButton />
            <MobileFloatingCTA onOpenModal={openModal} />
        </div>
    );
};

export default PartnersPage;
