
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";
import { Phone, Mail, MapPin, Globe, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
    const [time, setTime] = useState(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const openModal = () => setIsModalOpen(true);

    // Time formatters
    const torontoTime = time.toLocaleTimeString("en-US", {
        timeZone: "America/Toronto",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    const indiaTime = time.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-primary/30">
            {/* Pass onOpenModal to Header if needed, though on this page specific functionality might differ */}
            <Header onOpenModal={openModal} />

            <main className="pt-24 pb-12 relative overflow-hidden">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
                <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 z-10 relative">

                    {/* Hero Section */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md animate-fade-in">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <span className="text-sm font-medium text-emerald-400 tracking-wide uppercase">Always On, 24/7 Support</span>
                        </div>

                        <h1 className="font-display font-bold text-5xl md:text-7xl mb-6 leading-tight">
                            Global Support, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200">
                                Local Touch.
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you're in Toronto or New Delhi, our team is always active.
                            Connect with us instantly.
                        </p>
                    </div>

                    {/* Time & Status Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto mb-16">
                        {/* Toronto Clock */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Toronto (HQ)</p>
                                    <p className="text-2xl font-bold font-mono text-white/90">{torontoTime}</p>
                                </div>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>

                        {/* India Clock */}
                        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between group hover:bg-white/[0.05] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-secondary/20 text-secondary group-hover:scale-110 transition-transform">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">New Delhi</p>
                                    <p className="text-2xl font-bold font-mono text-white/90">{indiaTime}</p>
                                </div>
                            </div>
                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between md:col-span-2 lg:col-span-1">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary/20 text-primary">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-slate-400 text-sm font-medium">Avg. Response Time</p>
                                    <p className="text-lg font-bold text-white">&lt; 15 Mins</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto items-start">

                        {/* Left Column: Direct Action */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Visual Map/Location Card */}
                            <div className="relative h-64 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-slate-900/40 transition-colors z-10 pointer-events-none" />
                                <iframe
                                    src="https://maps.google.com/maps?q=12508+Kennedy+Road,+Caledon+ON,+L7C4L6&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                                    title="Map"
                                />
                                <div className="absolute bottom-4 left-4 z-20 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-500" />
                                    <span className="text-xs font-semibold">Caledon, ON</span>
                                </div>
                            </div>

                            {/* Direct Contact Options */}
                            <div className="grid gap-4">
                                <a
                                    href="https://wa.me/+917508813555"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white p-5 rounded-2xl flex items-center justify-between transition-all group hover:shadow-lg hover:shadow-[#25D366]/20"
                                >
                                    <div className="flex items-center gap-4">
                                        <MessageCircle className="w-8 h-8" />
                                        <div className="text-left">
                                            <p className="font-bold text-lg">WhatsApp Us</p>
                                            <p className="text-white/80 text-sm">Instant support via chat</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="tel:+91 75088 13555"
                                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white p-5 rounded-2xl flex items-center justify-between transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <Phone className="w-6 h-6 text-primary" />
                                        <div className="text-left">
                                            <p className="font-bold text-lg">Call Directly</p>
                                            <p className="text-slate-400 text-sm">+91 75088 13555</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                                </a>

                                <a
                                    href="mailto:info@globalpasscareer.com"
                                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white p-5 rounded-2xl flex items-center justify-between transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-6 h-6 text-secondary" />
                                        <div className="text-left">
                                            <p className="font-bold text-lg">Email Us</p>
                                            <p className="text-slate-400 text-sm">info@globalpasscareer.com</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold mb-2 text-white">Send a Message</h3>
                                    <p className="text-slate-400">Fill out the form below and our team will get back to you shortly.</p>
                                </div>
                                {/* Wrapping the dark-themed form in a container that handles light-mode specific styles if MultiStepForm relies on them, 
                        BUT MultiStepForm likely has its own styles. Since this page is forced dark mode via bg-slate-950, 
                        we might need to ensure MultiStepForm looks good. 
                        Assuming MultiStepForm uses Tailwind classes that adapt or are transparent/white capable.
                    */}
                                <div className="[&_label]:text-slate-300 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_textarea]:bg-white/5 [&_textarea]:border-white/10 [&_textarea]:text-white [&_button[type=submit]]:bg-primary">
                                    <MultiStepForm />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
