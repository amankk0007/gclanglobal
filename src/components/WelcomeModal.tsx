import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Star, Users, Award, Globe, X, MessageCircle } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const WelcomeModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal after a short delay when page loads
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const features = [
        { icon: Users, text: "5000+ Happy Families", color: "text-primary" },
        { icon: Globe, text: "Global Network", color: "text-secondary" },
        { icon: Award, text: "Expert Counselors", color: "text-amber-500" },
        { icon: Star, text: "5-Star Rated", color: "text-yellow-400" },
    ];

    const whatsappUrl = "https://wa.me/15198060052?text=Hello!%20I'm%20interested%20in%20career%20counseling%20services.";

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="w-[90%] sm:max-w-md max-h-[85vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white p-0 rounded-2xl sm:rounded-3xl">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <X className="w-4 h-4 text-white" />
                </button>

                {/* Header with gradient */}
                <div className="relative p-5 pb-3 text-center bg-gradient-to-b from-primary/30 via-primary/10 to-transparent">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute top-0 right-1/4 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />

                    {/* Logo/Icon */}
                    <div className="relative w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-2xl shadow-primary/30">
                        <OptimizedImage
                            src="/logo.png"
                            alt="Global Pass"
                            className="w-12 h-12"
                            imgClassName="rounded-lg object-cover"
                        />
                    </div>

                    <h2 className="relative font-display text-xl sm:text-2xl font-bold text-white mb-1">
                        Welcome to Global Pass
                    </h2>
                    <p className="relative text-slate-300 text-xs sm:text-sm">
                        Your Trusted Career & Education Partner
                    </p>
                </div>

                {/* Why Choose Us */}
                <div className="px-5 pb-3">
                    <div className="grid grid-cols-2 gap-2">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10"
                            >
                                <div className={`${feature.color}`}>
                                    <feature.icon className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] sm:text-xs font-medium text-slate-200">{feature.text}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Benefits List */}
                <div className="px-5 pb-3">
                    <div className="bg-white/5 rounded-xl p-3 sm:p-4 border border-white/10">
                        <h3 className="font-semibold text-white mb-2 text-xs sm:text-sm">Why Families Trust Us:</h3>
                        <div className="space-y-2">
                            {[
                                "Free Expert Career Consultancy",
                                "University Admission Assistance",
                                "Visa & Immigration Support",
                                "Scholarship Guidance"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                                    <span className="text-slate-300 text-xs sm:text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="p-5 pt-0 space-y-2.5">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <Button className="w-full h-10 sm:h-12 bg-[#25D366] hover:bg-[#20BA5C] text-white font-semibold rounded-xl shadow-lg shadow-[#25D366]/30 gap-2 text-sm sm:text-base">
                            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Connect on WhatsApp
                        </Button>
                    </a>
                    <Button
                        onClick={() => setIsOpen(false)}
                        variant="outline"
                        className="w-full h-9 sm:h-11 border-white/20 text-white hover:bg-white/10 rounded-xl text-xs sm:text-sm"
                    >
                        Explore Website
                    </Button>
                </div>

                {/* Footer */}
                <div className="px-5 pb-4 text-center">
                    <p className="text-[10px] sm:text-xs text-slate-500">We typically respond within 5 minutes</p>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default WelcomeModal;
