import { Target, Globe2, Sparkles } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const Vision = () => {
    // Destination images from Destinations component
    const destinationImages = [
        {
            url: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
            name: "Canada",
            flag: "🇨🇦"
        },
        {
            url: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
            name: "USA",
            flag: "🇺🇸"
        },
        {
            url: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
            name: "UK",
            flag: "🇬🇧"
        },
        {
            url: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
            name: "Australia",
            flag: "🇦🇺"
        },
        {
            url: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
            name: "New Zealand",
            flag: "🇳🇿"
        },
        {
            url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
            name: "Europe",
            flag: "🇪🇺"
        }
    ];

    // Duplicate for seamless loop
    const tickerImages = [...destinationImages, ...destinationImages];

    return (
        <section className="py-16 lg:py-20 relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-secondary/5 to-transparent rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                    {/* Left Content */}
                    <div className="lg:w-5/12 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">Our Core Purpose</span>
                        </div>
                        <h2 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
                            Driving Global <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ambitions</span>
                        </h2>
                        <p className="text-slate-600 text-lg leading-relaxed mb-8">
                            At Global Pass, we don't just process applications; we architect futures. Our mission is to bridge the gap between talent and opportunity on a global scale.
                        </p>

                        {/* Infinite Vertical Ticker */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-80 bg-slate-900">
                            {/* Gradient Overlays for fade effect */}
                            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-900 to-transparent z-10" />
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent z-10" />

                            {/* Ticker Container */}
                            <div className="ticker-vertical">
                                {tickerImages.map((destination, index) => (
                                    <div key={index} className="ticker-item-vertical relative group">
                                        <OptimizedImage
                                            src={destination.url}
                                            alt={destination.name}
                                            className="w-full h-48"
                                            imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <div className="absolute bottom-0 left-0 right-0 p-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-3xl">{destination.flag}</span>
                                                <span className="text-white font-bold text-lg">{destination.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Caption Overlay */}
                            <div className="absolute bottom-4 left-0 right-0 text-center z-20 pointer-events-none">
                                <div className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-full inline-flex items-center gap-2 shadow-2xl border border-white/20">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <p className="text-white font-bold text-xs tracking-wider uppercase drop-shadow-md">
                                        10k+ Happy Families • Global Destinations
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-lg text-center">
                                <span className="block text-3xl font-bold text-primary mb-1">98%</span>
                                <span className="text-xs text-slate-500 font-medium uppercase">Visa Success</span>
                            </div>
                            <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-lg text-center">
                                <span className="block text-3xl font-bold text-secondary mb-1">10k+</span>
                                <span className="text-xs text-slate-500 font-medium uppercase">Students Guided</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Cards */}
                    <div className="lg:w-7/12 grid md:grid-cols-2 gap-6">

                        {/* Mission Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 md:translate-y-8">
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Our Mission</h3>
                            <p className="text-slate-500 leading-relaxed">
                                To empower students by providing precise career guidance and securing admissions with leading global universities, while supporting institutions with financial tools for growth.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:shadow-2xl hover:border-secondary/20 transition-all duration-300">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                                <Globe2 className="w-7 h-7 text-secondary" />
                            </div>
                            <h3 className="font-display font-bold text-2xl text-slate-900 mb-3">Our Vision</h3>
                            <p className="text-slate-500 leading-relaxed">
                                To become the world's most trusted partner in education, connecting students with opportunities worldwide and enabling institutions to expand their impact.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Footer Badge */}
                <div className="mt-12 lg:mt-14 text-center">
                    <p className="inline-block text-sm font-medium text-slate-400 bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                        🇨🇦 Headquartered in Canada • 🇮🇳 Operations in India
                    </p>
                </div>

            </div>

            {/* CSS for Vertical Ticker Animation */}
            <style>{`
                @keyframes scroll-vertical {
                    0% {
                        transform: translateY(0);
                    }
                    100% {
                        transform: translateY(-50%);
                    }
                }

                .ticker-vertical {
                    display: flex;
                    flex-direction: column;
                    animation: scroll-vertical 20s linear infinite;
                }

                .ticker-vertical:hover {
                    animation-play-state: paused;
                }

                .ticker-item-vertical {
                    flex-shrink: 0;
                    width: 100%;
                }
            `}</style>
        </section>
    );
};

export default Vision;
