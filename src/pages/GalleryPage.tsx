import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar, MapPin, ChevronLeft, ChevronRight, X, Camera, ArrowLeft, Grid3x3, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Importing all gallery images
import imgNewspaper from "@/assets/gallery/gl-newspaper.jpg";
import imgRayat from "@/assets/gallery/gl-rayat-bahra.jpg";
import imgEvergreen from "@/assets/gallery/gl-evergreen.jpg";
import imgKey from "@/assets/gallery/gl-key-handover.jpg";
import imgTorontoGroup from "@/assets/gallery/gl-toronto-cup-group.jpg";
import imgNewspaper2 from "@/assets/gallery/gl-newspaper-2.jpg";
import imgDougFord from "@/assets/gallery/gl-doug-ford.jpg";
import imgAwardGroup from "@/assets/gallery/gl-award-group.jpg";
import imgGazeboAward from "@/assets/gallery/gl-gazebo-award.jpg";
import imgThreeMen from "@/assets/gallery/gl-three-men.jpg";
import imgWomanAward from "@/assets/gallery/gl-woman-award.jpg";
import imgSinghGrafix from "@/assets/gallery/gl-singh-grafix.jpg";
import imgPressConf from "@/assets/gallery/gl-press-conf.jpg";
import imgBusinessMeeting from "@/assets/gallery/gl-business-meeting.jpg";
import imgGoldenTemple from "@/assets/gallery/gl-golden-temple.jpg";
import imgTrophy2023 from "@/assets/gallery/gl-trophy-2023.jpg";
import imgOutdoorDuo from "@/assets/gallery/gl-outdoor-duo.jpg";
import imgGalaEvent from "@/assets/gallery/gl-gala-event.jpg";
import imgTrudeau from "@/assets/gallery/gl-trudeau.jpg";
import imgGalaTrio from "@/assets/gallery/gl-gala-trio.jpg";
import imgAdeshHospital from "@/assets/gallery/gl-adesh-hospital.jpg";
import imgGalaTrio2 from "@/assets/gallery/gl-gala-trio-2.jpg";
import imgSeminarGroup from "@/assets/gallery/gl-seminar-group.jpg";
import imgEventDuo from "@/assets/gallery/gl-event-duo.jpg";
import imgFutureDepot from "@/assets/gallery/gl-future-depot.jpg";
import imgGalaTrio3 from "@/assets/gallery/gl-gala-trio-3.jpg";
import imgSeminarGroup2 from "@/assets/gallery/gl-seminar-group-2.jpg";
import imgFutureDepot2 from "@/assets/gallery/gl-future-depot-2.jpg";
import imgGalaTrio4 from "@/assets/gallery/gl-gala-trio-4.jpg";
import imgEventCouple from "@/assets/gallery/gl-event-couple.jpg";
import imgMississaugaMalton from "@/assets/gallery/gl-mississauga-malton.jpg";
import imgDougFord2 from "@/assets/gallery/gl-doug-ford-2.jpg";
import imgAmityUniversity from "@/assets/gallery/amity-university.jpeg";
import imgKingRealtyAward from "@/assets/gallery/gl-king-realty-award.jpg";
import imgAirportStudent from "@/assets/gallery/gl-airport-student.jpg";
import imgAirportFamily from "@/assets/gallery/gl-airport-family.jpg";
import imgFutureSummit from "@/assets/gallery/Future-Summit.jpeg";
import imgAirportFamily2 from "@/assets/gallery/gl-airport-family-2.jpg";
import imgRestaurantGroup from "@/assets/gallery/gl-restaurant-group.jpg";
import imgPicnicCelebration from "@/assets/gallery/gl-picnic-celebration.jpg";
import imgMrYong from "@/assets/gallery/Mr-Yong.jpeg";
import imgGarrySirSignature from "@/assets/gallery/gl-garry-sir-signature.jpg";
import imgAfricaPerson from "@/assets/gallery/Africa-Person.jpeg";
import imgPicnicCelebration2 from "@/assets/gallery/gl-picnic-celebration-2.jpg";
import imgGarrySirSignature2 from "@/assets/gallery/gl-garry-sir-signature-2.jpg";
import imgFormalQuartet from "@/assets/gallery/gl-formal-quartet.jpg";
import imgCommunityRally from "@/assets/gallery/gl-community-rally.jpg";
import imgGroupKey from "@/assets/gallery/group-key.jpg";
import imgRootsCountry from "@/assets/gallery/roots-country.jpeg";
import imgMouIetBhaddal from "@/assets/gallery/MoU signed with IET Bhaddal College.jpeg";
import imgWinningFootballTeam from "@/assets/gallery/Congratulations to the Winning Football Team.jpeg";
import imgDelegateAustralia from "@/assets/gallery/Delegate from Australia.jpeg";
import imgPlacementDriveSviet from "@/assets/gallery/Placement drive at sviet.jpeg";
// import imgPlacementDriveSvietCollege from "@/assets/gallery/Placement drive in SVIET college.jpeg";
import imgJobPlacementDriveUsIt from "@/assets/gallery/Job placement drive organized by Global Pass for international students in a US-based IT company.jpeg";
import imgIndustrialVisitAmbtel from "@/assets/gallery/Industrial Visit at US base company Ambtel .jpeg";
import imgGuestOfHonourFootballTournament from "@/assets/gallery/Guest of Honour at the 63rd Principal Harbhajan Singh Football Tournament, Garhshankar.jpeg";
import imgUniversal from "@/assets/gallery/universal.jpeg";
import imgNews from "@/assets/gallery/news.jpeg";

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
}

const allGalleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Bharat Vikas Parishad Award",
    category: "Awards",
    date: "March 31, 2024",
    location: "Hoshiarpur, India",
    image: imgNewspaper
  },
  {
    id: 2,
    title: "Rayat-Bahra University Partnership",
    category: "Collaborations",
    date: "2024",
    location: "Mohali, India",
    image: imgRayat
  },
  {
    id: 3,
    title: "Evergreen College Global Tie-up",
    category: "Collaborations",
    date: "2023",
    location: "Toronto, Canada",
    image: imgEvergreen
  },
  {
    id: 4,
    title: "Student Success: Key Handover",
    category: "Student Success",
    date: "December 2023",
    location: "Ontario, Canada",
    image: imgKey
  },
  {
    id: 5,
    title: "Toronto Cup 2023 Celebration",
    category: "Sports & Culture",
    date: "2023",
    location: "Toronto, Canada",
    image: imgTorontoGroup
  },
  {
    id: 6,
    title: "Social Recognition Coverage",
    category: "Media",
    date: "2024",
    location: "India",
    image: imgNewspaper2
  },
  {
    id: 7,
    title: "Meeting with Premier Doug Ford",
    category: "Events",
    date: "Summer 2023",
    location: "Toronto, Canada",
    image: imgDougFord
  },
  
  {
    id: 9,
    title: "Community Award Ceremony",
    category: "Awards",
    date: "2024",
    location: "Ontario, Canada",
    image: imgGazeboAward
  },
  {
    id: 10,
    title: "Great meeting with Mayor Patrick Brown and Councillor Rod Power in Brampton 🇨🇦.",
    category: "Events",
    date: "2023",
    location: "Canada",
    image: imgThreeMen
  },
  {
    id: 11,
    title: "Excellence in Service Award",
    category: "Awards",
    date: "2023",
    location: "Ontario, Canada",
    image: imgWomanAward
  },
  {
    id: 12,
    title: "Singh Grafix Community Event",
    category: "Sports & Culture",
    date: "2023",
    location: "Ontario, Canada",
    image: imgSinghGrafix
  },
  {
    id: 13,
    title: "Press conference on Indo-Pacific Strategy in Amritsar 🇮🇳 with , MP George Chahal,  Calgary 🇨🇦.",
    category: "Media",
    date: "2024",
    location: "India",
    image: imgPressConf
  },
  {
    id: 14,
    title: "MOU with SG Encon Private Limited",
    category: "Collaborations",
    date: "2024",
    location: "India",
    image: imgBusinessMeeting
  },
  {
    id: 15,
    title: "Blessed to Visit Golden Temple ",
    category: "Cultural Events",
    date: "2024",
    location: "Amritsar, India",
    image: imgGoldenTemple
  },
  // {
  //   id: 16,
  //   title: "Caledon West Community Fair Trophy",
  //   category: "Awards",
  //   date: "2023",
  //   location: "Caledon, Canada",
  //   image: imgTrophy2023
  // },
  {
    id: 17,
    title: "Mr Graham McGregor,MPP Brampton",
    category: "Collaborations",
    date: "2023",
    location: "Ontario, Canada",
    image: imgOutdoorDuo
  },
  {
    id: 18,
    title: "Annual Gala Event",
    category: "Events",
    date: "2024",
    location: "Toronto, Canada",
    image: imgGalaEvent
  },
  {
    id: 19,
    title: "Meeting with PM Justin Trudeau",
    category: "Government Relations",
    date: "2024",
    location: "Ottawa, Canada",
    image: imgTrudeau
  },
  // {
  //   id: 20,
  //   title: "Gala Fundraiser Event",
  //   category: "Events",
  //   date: "2024",
  //   location: "Toronto, Canada",
  //   image: imgGalaTrio
  // },
  {
    id: 21,
    title: "Guest at Adesh hospital and college",
    category: "Collaborations",
    date: "2024",
    location: "India",
    image: imgAdeshHospital
  },
  {
    id: 22,
    title: "Community Gala Evening",
    category: "Events",
    date: "2024",
    location: "Ontario, Canada",
    image: imgGalaTrio2
  },
  {
    id: 23,
    title: "Educational Seminar",
    category: "Events",
    date: "2024",
    location: "Ontario, Canada",
    image: imgSeminarGroup
  },
  {
    id: 24,
    title: "Canada’s former defence Minister",
    category: "Events",
    date: "2023",
    location: "Toronto, Canada",
    image: imgEventDuo
  },
  {
    id: 25,
    title: "Meeting with Amarjot Sandhu, MPP for Brampton",
    category: "Events",
    date: "2023",
    location: "Ontario, Canada",
    image: imgFutureDepot
  },
  // {
  //   id: 26,
  //   title: "Charity Gala Dinner",
  //   category: "Events",
  //   date: "2024",
  //   location: "Toronto, Canada",
  //   image: imgGalaTrio3
  // },
  {
    id: 27,
    title: "Community Education Seminar",
    category: "Events",
    date: "2024",
    location: "Ontario, Canada",
    image: imgSeminarGroup2
  },
  {
    id: 28,
    title: "Community Outreach Event",
    category: "Collaborations",
    date: "2023",
    location: "Ontario, Canada",
    image: imgFutureDepot2
  },
  {
    id: 29,
    title: "Honored to attend a Christmas dinner in Ottawa with Randeep Sarai (MP, Surrey Centre) 🎄🇨🇦",
    category: "Events",
    date: "2024",
    location: "Toronto, Canada",
    image: imgGalaTrio4
  },
  {
    id: 30,
    title: "Networking Event",
    category: "Events",
    date: "2024",
    location: "Toronto, Canada",
    image: imgEventCouple
  },
  {
    id: 31,
    title: "Mississauga-Malton Community Event",
    category: "Community",
    date: "2024",
    location: "Mississauga, Canada",
    image: imgMississaugaMalton
  },
  {
    id: 32,
    title: "Community Event with Premier Ford",
    category: "Government Relations",
    date: "2023",
    location: "Ontario, Canada",
    image: imgDougFord2
  },
  {
    id: 33,
    title: "King Realty Excellence Award",
    category: "Awards",
    date: "2024",
    location: "Ontario, Canada",
    image: imgKingRealtyAward
  },
  {
    id: 34,
    title: "Student Departure - Study Abroad",
    category: "Student Success",
    date: "2024",
    location: "Toronto Airport, Canada",
    image: imgAirportStudent
  },
  // {
  //   id: 35,
  //   title: "Family Send-off - New Beginnings",
  //   category: "Student Success",
  //   date: "2024",
  //   location: "Toronto Airport, Canada",
  //   image: imgAirportFamily
  // },
  {
    id: 36,
    title: "Welcoming our student at Toronto Pearson International Airport 🇨🇦",
    category: "Student Success",
    date: "2024",
    location: "Toronto Airport, Canada",
    image: imgAirportFamily2
  },
  {
    id: 37,
    title: "Team Celebration Dinner",
    category: "Events",
    date: "2024",
    location: "Ontario, Canada",
    image: imgRestaurantGroup
  },
  {
    id: 38,
    title: "Community Picnic Celebration",
    category: "Community",
    date: "2024",
    location: "Ontario, Canada",
    image: imgPicnicCelebration
  },
  {
    id: 39,
    title: "Signature Moment with Garry Sir",
    category: "Special Moments",
    date: "2024",
    location: "Canada",
    image: imgGarrySirSignature
  },
  {
    id: 40,
    title: "Outdoor Community Picnic",
    category: "Community",
    date: "2024",
    location: "Ontario, Canada",
    image: imgPicnicCelebration2
  },
  {
    id: 41,
    title: "Garry Sir Autograph Session",
    category: "Special Moments",
    date: "2024",
    location: "Canada",
    image: imgGarrySirSignature2
  },
  {
    id: 42,
    title: "Formal Evening Reception",
    category: "Events",
    date: "2024",
    location: "Toronto, Canada",
    image: imgFormalQuartet
  },
  {
    id: 43,
    title: "Community Advocacy Rally",
    category: "Community",
    date: "2024",
    location: "Ontario, Canada",
    image: imgCommunityRally
  },
  {
    id: 44,
    title: "Group Key Handover",
    category: "Student Success",
    date: "2024",
    location: "India",
    image: imgGroupKey
  },
  {
    id: 45,
    title: "MoU Signed with IET Bhaddal College",
    category: "Collaborations",
    date: "2026",
    location: "Punjab, India",
    image: imgMouIetBhaddal
  },
  {
    id: 46,
    title: "Congratulations to the Winning Football Team",
    category: "Sports & Culture",
    date: "2026",
    location: "India",
    image: imgWinningFootballTeam
  },
  {
    id: 47,
    title: "Delegate from Australia",
    category: "Collaborations",
    date: "2026",
    location: "India",
    image: imgDelegateAustralia
  },
  {
    id: 48,
    title: "Placement Drive at SVIET",
    category: "Student Success",
    date: "2026",
    location: "Punjab, India",
    image: imgPlacementDriveSviet
  },
  // {
  //   id: 49,
  //   title: "Placement Drive in SVIET College",
  //   category: "Student Success",
  //   date: "2026",
  //   location: "Punjab, India",
  //   image: imgPlacementDriveSvietCollege
  // },
  {
    id: 50,
    title: "Job Placement Drive for International Students in US-Based IT Company",
    category: "Student Success",
    date: "2026",
    location: "India",
    image: imgJobPlacementDriveUsIt
  },
  {
    id: 51,
    title: "Industrial Visit at US-Based Company Ambtel",
    category: "Collaborations",
    date: "2024",
    location: "India",
    image: imgIndustrialVisitAmbtel
  },
  {
    id: 52,
    title: "Guest of Honour at 63rd Principal Harbhajan Singh Football Tournament, Garhshankar",
    category: "Sports & Culture",
    date: "2024",
    location: "Garhshankar, India",
    image: imgGuestOfHonourFootballTournament
  }
  ,
  {
    id: 53,
    title: "Guest of Honour at 63rd Principal Harbhajan Singh Football Tournament, Garhshankar",
    category: "Sports & Culture",
    date: "2024",
    location: "Garhshankar, India",
    image: imgGuestOfHonourFootballTournament
  },
  {
    id: 54,
    title: "Universal Event Highlight",
    category: "Events",
    date: "2026",
    location: "India",
    image: imgUniversal
  },
  {
    id: 55,
    title: "News Coverage",
    category: "Media",
    date: "2026",
    location: "India",
    image: imgNews
  },
  {
    id: 56,
    title: "Tie up with Amity University Mohali",
    category: "Events",
    date: "2026",
    location: "India",
    image: imgAmityUniversity
  },
  {
    id: 57,
    title: "Tie-up with Root Country School, Baghi (Himachal Pradesh)",
    category: "Events",
    date: "2026",
    location: "India",
    image: imgRootsCountry
  },
  {
    id: 58,
    title: "Government official from Africa, strengthening global partnerships in education and career opportunities.",
    category: "Events",
    date: "2026",
    location: "India",  
    image: imgAfricaPerson
  },
  {
    id: 59,
    title: "Thrive Future Summit 2026 – Honored to connect with key functionaries and global leaders shaping the future of education and innovation.",
    category: "Events",
    date: "2026",
    location: "India",  
    image: imgFutureSummit
  },
  {
    id: 60,
    title: "Young  entrepreneur Mr. Yong",
    category: "Events",
    date: "2026",
    location: "India",  
    image: imgMrYong
  }

];

const categories = ["All", "Awards", "Collaborations", "Student Success", "Sports & Culture", "Media", "Government Relations", "Events", "Cultural Events", "Community", "Special Moments"];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"masonry" | "grid">("masonry");

  const filteredItems = activeCategory === "All"
    ? allGalleryItems
    : allGalleryItems.filter(item => item.category === activeCategory);

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

          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary bg-primary/10 px-6 py-2 backdrop-blur-sm">
              <Camera className="w-4 h-4 mr-2" />
              Our Journey in Pictures
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 leading-tight">
              Community & Milestones
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Celebrating our global connections, student achievements, and community impact through memorable moments
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{allGalleryItems.length}+</div>
                <div className="text-sm text-gray-400">Memories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{categories.length - 1}</div>
                <div className="text-sm text-gray-400">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">2023-24</div>
                <div className="text-sm text-gray-400">Timeline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          {/* Enhanced Filter Bar */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 lg:p-6 mb-10 sticky top-20 z-40 shadow-2xl">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Category Filters - Horizontally scrollable on mobile */}
              <div className="flex gap-2 flex-1 overflow-x-auto pb-2 lg:pb-0 lg:flex-wrap scrollbar-hide -mx-2 px-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50 scale-105"
                      : "border-slate-700 text-gray-400 hover:text-white hover:border-primary/50 hover:bg-primary/10"
                      }`}
                  >
                    {category}
                    {activeCategory === category && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {filteredItems.length}
                      </span>
                    )}
                  </Button>
                ))}
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full p-1 self-start lg:self-auto">
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded-full transition-all ${viewMode === "masonry"
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                    }`}
                  title="Masonry View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-full transition-all ${viewMode === "grid"
                    ? "bg-primary text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                    }`}
                  title="Grid View"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div
            className={
              viewMode === "masonry"
                ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-6"
                : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
            }
          >
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden cursor-pointer animate-fade-in break-inside-avoid mb-4 lg:mb-6 ${viewMode === "grid" ? "aspect-square" : ""
                  }`}
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-800">
                  <OptimizedImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full"
                    imgClassName="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated Border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 via-transparent to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                  </div>

                  {/* Category Badge */}
                  <Badge className="absolute top-4 left-4 bg-primary/90 text-white backdrop-blur-md text-xs border border-white/20 shadow-lg">
                    {item.category}
                  </Badge>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-display font-bold text-white text-base mb-2 line-clamp-2 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <div className="flex flex-col gap-1.5 text-xs text-gray-300">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
                      </span>
                      <span className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Hover Icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-50 group-hover:scale-100">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-6">
                <Camera className="w-10 h-10 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No images found</h3>
              <p className="text-gray-400">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {/* Enhanced Lightbox Modal */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-[98vw] h-[95vh] p-0 bg-black/95 backdrop-blur-2xl border-slate-800">
          <div className="relative w-full h-full flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 backdrop-blur-md group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigate("prev")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 backdrop-blur-md group"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate("next")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all border border-white/20 backdrop-blur-md group"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
              <img
                src={filteredItems[currentIndex]?.image}
                alt={filteredItems[currentIndex]?.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
              />
            </div>

            {/* Enhanced Info Bar */}
            <div className="p-6 lg:p-8 border-t border-slate-800 bg-gradient-to-t from-black to-transparent backdrop-blur-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3 bg-primary/20 text-primary border-primary/30">
                    {filteredItems[currentIndex]?.category}
                  </Badge>
                  <h3 className="font-display text-2xl font-bold text-white mb-2">
                    {filteredItems[currentIndex]?.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {filteredItems[currentIndex]?.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {filteredItems[currentIndex]?.location}
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
    </div>
  );
};

export default GalleryPage;
