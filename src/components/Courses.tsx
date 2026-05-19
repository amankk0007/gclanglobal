import { useState, useCallback } from "react";
import { Cpu, BarChart3, Hotel, Stethoscope, Anchor, BookOpen, ArrowRight, Sparkles, School, ChevronLeft, ChevronRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import medicalImg from "@/assets/medical_student.jpg";
import engineeringImg from "@/assets/engineering.png";
import hospitalityImg from "@/assets/hospitality.png";
import merchantnavyImg from "@/assets/merchantnavy.png";
import managementImg from "@/assets/management.png";
import lawstudentImg from "@/assets/law_student.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

// Updated Courses Data
const courses = [
  {
    id: "medical",
    icon: Stethoscope,
    title: "Medical & Healthcare",
    desc: "Embark on a noble journey in medicine. Top universities for MBBS, Nursing, and specialized healthcare degrees.",
    tags: ["MBBS", "Nursing", "Public Health"],
    color: "from-rose-500 to-red-600",
    image: medicalImg
  },
  {
    id: "engineering",
    icon: Cpu,
    title: "Engineering & Tech",
    desc: "Build the future with cutting-edge programs in AI, Robotics, Civil, and Software Engineering.",
    tags: ["Computer Science", "AI & ML", "Civil"],
    color: "from-blue-500 to-indigo-600",
    image: engineeringImg
  },
  {
    id: "management",
    icon: BarChart3,
    title: "Business & Management",
    desc: "Develop leadership skills with global MBA and BBA programs designed for the modern business world.",
    tags: ["MBA", "Finance", "Marketing"],
    color: "from-amber-500 to-orange-600",
    image: managementImg
  },
  {
    id: "hospitality",
    icon: Hotel,
    title: "Hospitality & Tourism",
    desc: "Master the art of service in the world's booming tourism and luxury hotel sectors.",
    tags: ["Hotel Mgmt", "Culinary Arts", "Travel & Tourism"],
    color: "from-emerald-500 to-teal-600",
    image: hospitalityImg
  },
  {
    id: "navy",
    icon: Anchor,
    title: "Merchant Navy",
    desc: "Navigate the high seas and secure a high-paying global career in maritime operations.",
    tags: ["Nautical Science", "Marine Eng", "Naval Architecture"],
    color: "from-cyan-500 to-blue-600",
    image: merchantnavyImg
  },
  {
    id: "law",
    icon: BookOpen,
    title: "Law & Humanities",
    desc: "Advocate for justice or explore human culture with prestigious law and arts degrees.",
    tags: ["LLB / LLM", "Psychology", "International Relations"],
    color: "from-violet-500 to-purple-600",
    image: lawstudentImg
  }
];

interface CoursesProps {
  onOpenModal?: () => void;
}

const Courses = ({ onOpenModal }: CoursesProps) => {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false }, [
    // Autoplay removed for better control when mixed with static cards
  ]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="courses" className="py-24 bg-[#0A0F1C] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 fill-current" /> Future Pathways
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-white leading-tight">
              Explore Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Career Options</span>
            </h2>
            <p className="text-slate-400 mt-4 text-lg max-w-xl">
              We offer comprehensive counseling for a wide range of global career paths. Find the one that matches your ambition.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 hidden md:flex">
            <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white hover:bg-primary hover:border-primary flex items-center justify-center transition-all duration-300 group">
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 text-white hover:bg-primary hover:border-primary flex items-center justify-center transition-all duration-300 group">
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden -mx-4 px-4 py-8" ref={emblaRef}>
          <div className="flex gap-3 md:gap-6">

            {/* Special Residential Schools Card - Always First */}
            <div className="flex-[0_0_45%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0">
              <Link to="/residential-schools" className="block h-full group">
                <div className="h-full bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 rounded-2xl md:rounded-3xl p-0.5 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20">
                  <div className="absolute inset-0 bg-[#0A0F1C] m-[1px] rounded-[14px] md:rounded-[22px]" />
                  <div className="relative h-full p-3 md:p-6 flex flex-col items-start z-10">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3 md:mb-6 shadow-lg">
                      <School className="w-5 h-5 md:w-7 md:h-7 text-white" />
                    </div>
                    <div className="mb-2 inline-flex px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] md:text-xs font-bold text-primary uppercase">
                      Special
                    </div>
                    <h3 className="text-sm md:text-2xl font-display font-bold text-white mb-2 md:mb-3 leading-tight">Residential Schools</h3>
                    <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed mb-4 md:mb-8 flex-grow line-clamp-3">
                      Smooth transition to India's best education system. Global competence with strong Indian values.
                    </p>
                    <div className="group-hover:translate-x-2 transition-transform duration-300 flex items-center text-white font-bold text-[10px] md:text-sm">
                      Explore <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 text-primary" />
                    </div>
                  </div>

                  {/* Decorative Glow */}
                  <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary to-secondary opacity-30 blur-[60px] group-hover:opacity-50 transition-opacity" />
                </div>
              </Link>
            </div>

            {/* Standard Course Cards */}
            {courses.map((course) => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className="flex-[0_0_45%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 cursor-pointer group"
              >
                <div className="bg-[#111625] border border-white/5 rounded-2xl md:rounded-3xl overflow-hidden h-full relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 hover:border-white/10">
                  {/* Image Part */}
                  <div className="aspect-square relative overflow-hidden">
                    <OptimizedImage src={course.image} alt={course.title} className="w-full h-full" imgClassName="object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111625] via-[#111625]/20 to-transparent" />

                    <div className={`absolute top-2 left-2 md:top-4 md:left-4 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-lg`}>
                      <course.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
                    </div>
                  </div>

                  {/* Content Part */}
                  <div className="p-3 md:p-6 relative -mt-4 bg-[#111625]">
                    <h3 className="text-sm md:text-xl font-display font-bold text-white mb-1 md:mb-2 group-hover:text-primary transition-colors line-clamp-2 md:line-clamp-none">{course.title}</h3>
                    <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-2">
                      {course.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-6">
                      {course.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] md:text-[10px] font-medium px-1.5 py-0.5 md:px-2 md:py-1 rounded-md bg-white/5 text-slate-300 border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-[10px] md:text-sm font-bold text-primary group-hover:translate-x-1 transition-transform duration-300">
                      View Details <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white flex items-center justify-center">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
        <DialogContent className="bg-[#0A0F1C] border-white/10 text-white p-0 gap-0 max-w-2xl overflow-hidden rounded-3xl">
          {selectedCourse && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="relative h-48 md:h-auto md:w-2/5 overflow-hidden">
                <OptimizedImage src={selectedCourse.image} alt={selectedCourse.title} className="w-full h-full" imgClassName="object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedCourse.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <selectedCourse.icon className="w-16 h-16 text-white drop-shadow-lg opacity-80" />
                </div>
              </div>
              <div className="p-8 md:w-3/5">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{selectedCourse.title}</h3>
                <p className="text-slate-400 text-sm mb-6 uppercase tracking-wider">Top-Tier Programs</p>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {selectedCourse.desc} Our counselors will assist you with university shortlisting, application reviews, and scholarship opportunities.
                </p>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Popular Programs</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.tags.map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={() => { onOpenModal?.(); setSelectedCourse(null); }} className="flex-1 bg-primary hover:bg-primary/90 text-white rounded-xl h-12">
                    Book Consultation
                  </Button>
                  <Button onClick={() => setSelectedCourse(null)} variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl h-12 px-6">
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Courses;
