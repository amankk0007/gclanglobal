
import { GraduationCap, School, Globe, Target, Handshake, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const ResidentialSchools = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Dynamic Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 -left-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 -right-64 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[128px] animate-pulse delay-700" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[96px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Content */}
                    <div className="lg:w-1/2 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                            <GraduationCap className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium text-primary tracking-wide uppercase">Premium Education</span>
                        </div>

                        <h2 className="font-display font-bold text-4xl lg:text-7xl text-white mb-6 leading-[1.1]">
                            Elite Residential <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400">
                                Schools
                            </span>
                        </h2>

                        <p className="text-slate-400 text-lg lg:text-xl leading-relaxed mb-8 max-w-xl font-light">
                            We bridge the gap between global aspirations and Indian heritage. Secure admission in India's most prestigious boarding schools.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="text-white font-bold text-sm">01</span>
                                </div>
                                <span className="text-slate-300">CBSE/ICSE Curriculum</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <span className="text-white font-bold text-sm">02</span>
                                </div>
                                <span className="text-slate-300">World-Class Campus</span>
                            </div>
                        </div>

                        <Button
                            variant="default"
                            size="lg"
                            className="h-14 px-8 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-semibold text-lg hover:scale-105 transition-all duration-300 group"
                            onClick={() => window.location.href = '/residential-schools'}
                        >
                            Explore Schools
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Right Content - Bento Grid */}
                    <div className="lg:w-1/2 w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Card 1 */}
                            <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/20 overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <School className="w-24 h-24 text-white/5 -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <School className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Top-Tier Network</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Direct partnerships with India's most prestigious legacy institutions.
                                </p>
                            </div>

                            {/* Card 2 */}
                            <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/20 overflow-hidden sm:translate-y-8">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Globe className="w-24 h-24 text-white/5 -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/20 to-red-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Globe className="w-6 h-6 text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Global Standards</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    International facilities combined with deep cultural immersion.
                                </p>
                            </div>

                            {/* Card 3 */}
                            <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/20 overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Target className="w-24 h-24 text-white/5 -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Target className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Holistic Growth</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Comprehensive focus on academics, arts, sports, and character.
                                </p>
                            </div>

                            {/* Card 4 */}
                            <div className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-all duration-500 hover:border-white/20 overflow-hidden sm:translate-y-8">
                                <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <Handshake className="w-24 h-24 text-white/5 -rotate-12 transform group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary/40 to-red-600/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <Handshake className="w-6 h-6 text-secondary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Full Support</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    End-to-end guidance from school selection to admission.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResidentialSchools;
