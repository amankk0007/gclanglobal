import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, ChevronLeft, ChevronRight, X, Camera, ArrowLeft, Grid3x3, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { dataService, GalleryImage } from "@/services/dataService";

const GalleryPage = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryImage[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryImage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  useEffect(() => {
    const loadGallery = () => {
      const items = dataService.getGalleryImages().filter(img => img.isActive);
      setGalleryItems(items);
      setFilteredItems(items);
    };
    loadGallery();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, galleryItems]);

  const categories = ["All", ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const navigate = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
    } else {
      setCurrentIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />

      {/* Premium Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Home</span>
          </Link>

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider mb-8">
              <Camera className="w-4 h-4" />
              <span>Gallery</span>
              <Camera className="w-4 h-4" />
            </div>
            
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Gallery</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore our journey through captivating moments and achievements
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white/5 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-lg shadow-primary/25 hover:shadow-primary/40"
                    : "border-slate-600 text-slate-300 hover:border-primary hover:text-white hover:bg-primary/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          {/* View Mode Toggle */}
          <div className="flex justify-end mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-md text-white"
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className="rounded-md text-white"
              >
                <LayoutGrid className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Gallery Items */}
          <div className={`grid gap-4 ${
            viewMode === "grid" 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "columns-1 md:columns-2 lg:columns-3 xl:columns-4 space-y-4"
          }`}>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                  viewMode === "masonry" ? "break-inside-avoid" : ""
                }`}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-square overflow-hidden bg-slate-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/400x300?text=" + encodeURIComponent(item.title);
                    }}
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-primary/30">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-gray-300 line-clamp-2">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
              <p className="text-slate-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-white/10">
          <div className="relative h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
              <img
                src={filteredItems[currentIndex]?.imageUrl}
                alt={filteredItems[currentIndex]?.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/800x600?text=" + encodeURIComponent(filteredItems[currentIndex]?.title || "Image");
                }}
              />
            </div>

            {/* Info Bar */}
            <div className="p-6 lg:p-8 border-t border-white/10 bg-gradient-to-t from-black to-transparent backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary border-primary/30">
                    {filteredItems[currentIndex]?.category}
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {filteredItems[currentIndex]?.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {filteredItems[currentIndex]?.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(filteredItems[currentIndex]?.timestamp || "").toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium bg-primary/20 px-4 py-2 rounded-full border border-primary/30">
                    {currentIndex + 1} / {filteredItems.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default GalleryPage;
