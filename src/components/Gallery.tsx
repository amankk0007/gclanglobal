import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, ChevronLeft, ChevronRight, X, Camera, Users, Award, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Career Consulting Seminar 2024",
    category: "Seminars",
    date: "March 2024",
    location: "Chandigarh, India",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "University Partnership Summit",
    category: "Collaborations",
    date: "February 2024",
    location: "Toronto, Canada",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Student Workshop - Study Abroad",
    category: "Workshops",
    date: "January 2024",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "International Education Fair",
    category: "Events",
    date: "December 2023",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Alumni Success Meet",
    category: "Student Events",
    date: "November 2023",
    location: "Ontario, Canada",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Scholarship Guidance Workshop",
    category: "Workshops",
    date: "October 2023",
    location: "Pune, India",
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&auto=format&fit=crop"
  }
];

const stats = [
  { icon: Camera, value: 50, suffix: "+", label: "Events Hosted" },
  { icon: Building2, value: 100, suffix: "+", label: "Partner Institutions" },
  { icon: Users, value: 5000, suffix: "+", label: "Event Attendees" },
  { icon: Award, value: 25, suffix: "+", label: "Awards & Recognition" }
];

const AnimatedCounter = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 text-primary bg-primary/5 px-4 py-1.5">
            <Camera className="w-3.5 h-3.5 mr-1.5" />
            Our Journey
          </Badge>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Events & Collaborations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Capturing moments from our seminars, workshops, and partnerships that shape student futures
          </p>
        </div>

        {/* Animated Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Masonry Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${index === 0 ? "md:col-span-2 md:row-span-2" : ""
                } ${index === 0 ? "aspect-[4/3]" : "aspect-square"}`}
            >
              {/* Image */}
              <OptimizedImage
                src={item.image}
                alt={item.title}
                className="w-full h-full"
                imgClassName="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

              {/* Category Badge */}
              <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
                {item.category}
              </Badge>

              {/* Content Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 lg:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className={`font-display font-bold text-foreground mb-2 ${index === 0 ? "text-xl lg:text-2xl" : "text-lg"
                  }`}>
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
            </div>
          ))}
        </div>

        {/* View Full Gallery CTA */}
        <div className="text-center">
          <Link to="/gallery">
            <Button size="lg" className="group">
              View Full Gallery
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-background/95 backdrop-blur-xl border-border/50">
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-background/80 hover:bg-background text-foreground transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
              <OptimizedImage
                src={galleryItems[currentIndex]?.image}
                alt={galleryItems[currentIndex]?.title}
                className="max-w-full max-h-full"
                imgClassName="object-contain rounded-lg"
              />
            </div>

            {/* Info Bar */}
            <div className="p-4 lg:p-6 border-t border-border/50 bg-card/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <Badge className="mb-2">{galleryItems[currentIndex]?.category}</Badge>
                  <h3 className="font-display text-xl font-bold text-foreground">
                    {galleryItems[currentIndex]?.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {galleryItems[currentIndex]?.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {galleryItems[currentIndex]?.location}
                  </span>
                  <span className="text-primary font-medium">
                    {currentIndex + 1} / {galleryItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
