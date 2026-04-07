import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

const testimonials = [
  {
    id: 1,
    name: "Aarav Sharma",
    university: "University of Toronto",
    course: "MSc Computer Science",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    quote: "Global Pass guided me through every step of my journey to Canada. Their expertise in university selection and the visa process was truly invaluable. I am now pursuing my dream career!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    university: "University of Melbourne",
    course: "MBA (Finance)",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    quote: "The career counseling sessions were an eye-opener. They helped me discover my true potential and secure admission with a scholarship at my dream university. Highly recommended!",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Verma",
    university: "Queen's University Belfast",
    course: "B.Eng Mechanical",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    quote: "As an NRI student, I was confused about the application process. Global Pass acted as a local guardian, ensuring my transition was smooth and seamless.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sanya Gupta",
    university: "UC Berkeley",
    course: "Data Science",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    quote: "From the first consultation to my flight, the support was phenomenal. They didn't just help me get admitted; they prepared me for life abroad.",
    rating: 5,
  },
];

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-secondary text-xs font-bold tracking-wider uppercase mb-4">
            <Star className="w-3 h-3 fill-secondary" /> Testimonials <Star className="w-3 h-3 fill-secondary" />
          </div>
          <h2 className="font-display font-bold text-4xl lg:text-5xl text-slate-900 mb-6 leading-tight">
            What Our Students <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Have to Say</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Real stories of ambition, guidance, and success from students who trusted Global Pass.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons (Desktop) */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-xl items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-100 shadow-xl items-center justify-center text-slate-400 hover:text-primary hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Viewport */}
          <div className="overflow-hidden px-4 md:px-10 -mx-4 md:-mx-10 py-10" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_35%] min-w-0 pl-6 md:pl-8 relative">
                  <div className={`
                        relative bg-white rounded-3xl p-8 border transition-all duration-500 group h-full flex flex-col items-center text-center
                        ${selectedIndex === index
                      ? "shadow-2xl shadow-primary/10 border-primary/20 scale-105 z-10"
                      : "shadow-lg border-slate-100 scale-95 opacity-70 hover:opacity-100 grayscale hover:grayscale-0"}
                   `}>

                    {/* Quote Icon */}
                    <div className="absolute top-6 right-8 opacity-10">
                      <Quote className="w-12 h-12 text-primary" />
                    </div>

                    {/* Image */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-primary/20 to-secondary/20">
                        <OptimizedImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full rounded-full"
                          imgClassName="object-cover border-4 border-white shadow-md"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-sm">
                        <Quote className="w-3 h-3 text-white fill-current" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>

                    {/* Content */}
                    <blockquote className="text-slate-600 leading-relaxed mb-6 italic flex-grow">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <h4 className="font-display font-bold text-lg text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm font-medium text-primary">{testimonial.course}</p>
                      <p className="text-xs text-slate-400 mt-1">{testimonial.university}</p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`transition-all duration-300 rounded-full ${index === selectedIndex ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-slate-200 hover:bg-slate-300"
                  }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonials;
