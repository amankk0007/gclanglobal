import { ArrowRight, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef } from "react";

// Importing all gallery images for rotation
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
import imgKingRealtyAward from "@/assets/gallery/gl-king-realty-award.jpg";
import imgAirportStudent from "@/assets/gallery/gl-airport-student.jpg";
import imgAirportFamily from "@/assets/gallery/gl-airport-family.jpg";
import imgAirportFamily2 from "@/assets/gallery/gl-airport-family-2.jpg";
import imgRestaurantGroup from "@/assets/gallery/gl-restaurant-group.jpg";
import imgPicnicCelebration from "@/assets/gallery/gl-picnic-celebration.jpg";
import imgGarrySirSignature from "@/assets/gallery/gl-garry-sir-signature.jpg";
import imgPicnicCelebration2 from "@/assets/gallery/gl-picnic-celebration-2.jpg";
import imgGarrySirSignature2 from "@/assets/gallery/gl-garry-sir-signature-2.jpg";
import imgFormalQuartet from "@/assets/gallery/gl-formal-quartet.jpg";
import imgCommunityRally from "@/assets/gallery/gl-community-rally.jpg";
import imgGroupKey from "@/assets/gallery/group-key.jpg";
import imgMouIetBhaddal from "@/assets/gallery/MoU signed with IET Bhaddal College.jpeg";
import imgWinningFootballTeam from "@/assets/gallery/Congratulations to the Winning Football Team.jpeg";
import imgDelegateAustralia from "@/assets/gallery/Delegate from Australia.jpeg";
import imgPlacementDriveSviet from "@/assets/gallery/Placement drive at sviet.jpeg";
import imgPlacementDriveSvietCollege from "@/assets/gallery/Placement drive in SVIET college.jpeg";
import imgJobPlacementDriveUsIt from "@/assets/gallery/Job placement drive organized by Global Pass for international students in a US-based IT company.jpeg";
import imgIndustrialVisitAmbtel from "@/assets/gallery/Industrial Visit at US base company Ambtel .jpeg";
import imgGuestOfHonourFootballTournament from "@/assets/gallery/Guest of Honour at the 63rd Principal Harbhajan Singh Football Tournament, Garhshankar.jpeg";
import imgUniversal from "@/assets/gallery/universal.jpeg";
import imgNews from "@/assets/gallery/news.jpeg";

const GallerySection = () => {
    // Rotating selection of gallery images
    const galleryImages = [
        { id: 101, src: imgPlacementDriveSviet, alt: "Placement Drive at SVIET", category: "Student Success" },
        { id: 102, src: imgPlacementDriveSvietCollege, alt: "Placement Drive in SVIET College", category: "Student Success" },
        { id: 103, src: imgMouIetBhaddal, alt: "MoU Signed with IET Bhaddal College", category: "Collaborations" },
        { id: 104, src: imgJobPlacementDriveUsIt, alt: "Job Placement Drive for International Students in US-Based IT Company", category: "Student Success" },
        { id: 105, src: imgIndustrialVisitAmbtel, alt: "Industrial Visit at US-Based Company Ambtel", category: "Collaborations" },
        { id: 106, src: imgGuestOfHonourFootballTournament, alt: "Guest of Honour at 63rd Principal Harbhajan Singh Football Tournament, Garhshankar", category: "Sports & Culture" },
        { id: 1, src: imgNewspaper, alt: "Bharat Vikas Parishad Award", category: "Awards" },
        { id: 2, src: imgRayat, alt: "Rayat-Bahra University Partnership", category: "Collaborations" },
        { id: 3, src: imgEvergreen, alt: "Evergreen College Global Tie-up", category: "Collaborations" },
        { id: 4, src: imgKey, alt: "Student Success: Key Handover", category: "Student Success" },
        { id: 5, src: imgTorontoGroup, alt: "Toronto Cup 2023 Celebration", category: "Sports & Culture" },
        { id: 6, src: imgNewspaper2, alt: "Social Recognition Coverage", category: "Media" },
        { id: 7, src: imgDougFord, alt: "Meeting with Premier Doug Ford", category: "Events" },
        // { id: 8, src: imgAwardGroup, alt: "Community Service Award", category: "Awards" },
        { id: 9, src: imgGazeboAward, alt: "Community Award Ceremony", category: "Awards" },
        { id: 10, src: imgThreeMen, alt: "Great meeting with Mayor Patrick Brown and Councillor Rod Power in Brampton 🇨🇦.", category: "Events" },
        { id: 11, src: imgWomanAward, alt: "Excellence in Service Award", category: "Awards" },
        { id: 12, src: imgSinghGrafix, alt: "Singh Grafix Community Event", category: "Sports & Culture" },
        { id: 13, src: imgPressConf, alt: "Media Press Conference", category: "Media" },
        { id: 14, src: imgBusinessMeeting, alt: "MOU with SG Encon Private Limited", category: "Collaborations" },
        { id: 15, src: imgGoldenTemple, alt: "Blessed to Visit Golden Temple", category: "Cultural Events" },
        // { id: 16, src: imgTrophy2023, alt: "Caledon West Community Fair Trophy", category: "Awards" },
        { id: 17, src: imgOutdoorDuo, alt: "Partnership Meeting", category: "Collaborations" },
        { id: 18, src: imgGalaEvent, alt: "Annual Gala Event", category: "Events" },
        { id: 19, src: imgTrudeau, alt: "Meeting with PM Justin Trudeau", category: "Government Relations" },
        // { id: 20, src: imgGalaTrio, alt: "Gala Fundraiser Event", category: "Events" },
        { id: 21, src: imgAdeshHospital, alt: "Guest at Adesh hospital and college", category: "Collaborations" },
        { id: 22, src: imgGalaTrio2, alt: "Community Gala Evening", category: "Events" },
        { id: 23, src: imgSeminarGroup, alt: "Educational Seminar", category: "Events" },
        { id: 24, src: imgEventDuo, alt: "Canada’s former defence Minister", category: "Events" },
        { id: 25, src: imgFutureDepot, alt: "Meeting with Amarjot Sandhu, MPP for Brampton", category: "Events" },
        // { id: 26, src: imgGalaTrio3, alt: "Charity Gala Dinner", category: "Events" },
        { id: 27, src: imgSeminarGroup2, alt: "Community Education Seminar", category: "Events" },
        { id: 28, src: imgFutureDepot2, alt: "Community Outreach Event", category: "Collaborations" },
        { id: 29, src: imgGalaTrio4, alt: "Leadership Gala", category: "Events" },
        { id: 30, src: imgEventCouple, alt: "Networking Event", category: "Events" },
        { id: 31, src: imgMississaugaMalton, alt: "Mississauga-Malton Community Event", category: "Community" },
        { id: 32, src: imgDougFord2, alt: "Community Event with Premier Ford", category: "Government Relations" },
        { id: 33, src: imgKingRealtyAward, alt: "King Realty Excellence Award", category: "Awards" },
        { id: 34, src: imgAirportStudent, alt: "Student Departure - Study Abroad", category: "Student Success" },
        // { id: 35, src: imgAirportFamily, alt: "Family Send-off - New Beginnings", category: "Student Success" },
        { id: 36, src: imgAirportFamily2, alt: "Welcoming our student at Toronto Pearson International Airport 🇨🇦", category: "Student Success" },
        { id: 37, src: imgRestaurantGroup, alt: "Team Celebration Dinner", category: "Events" },
        { id: 38, src: imgPicnicCelebration, alt: "Community Picnic Celebration", category: "Community" },
        { id: 39, src: imgGarrySirSignature, alt: "Signature Moment with Garry Sir", category: "Special Moments" },
        { id: 40, src: imgPicnicCelebration2, alt: "Outdoor Community Picnic", category: "Community" },
        { id: 41, src: imgGarrySirSignature2, alt: "Garry Sir Autograph Session", category: "Special Moments" },
        { id: 42, src: imgFormalQuartet, alt: "Formal Evening Reception", category: "Events" },
        { id: 43, src: imgCommunityRally, alt: "Community Advocacy Rally", category: "Community" },
        { id: 44, src: imgGroupKey, alt: "Group Key Handover", category: "Student Success" },
        { id: 46, src: imgWinningFootballTeam, alt: "Congratulations to the Winning Football Team", category: "Sports & Culture" },
        { id: 47, src: imgDelegateAustralia, alt: "Delegate from Australia", category: "Collaborations" },
        { id: 48, src: imgUniversal, alt: "Universal Event Highlight", category: "Events" },
        { id: 49, src: imgNews, alt: "News Coverage", category: "Media" }
    ];

    const autoplayRef = useRef(
        Autoplay({ delay: 1200, stopOnInteraction: false, stopOnMouseEnter: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            containScroll: "trimSnaps",
            skipSnaps: false
        },
        [autoplayRef.current]
    );

    useEffect(() => {
        if (emblaApi) {
            autoplayRef.current.play();
        }
    }, [emblaApi]);

    return (
        <section className="py-12 lg:py-20 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4 border border-primary/20">
                            <ImageIcon className="w-4 h-4 text-primary" />
                            <span className="text-primary font-bold text-sm uppercase tracking-wider">Our Gallery</span>
                        </div>
                        <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
                            Life at <span className="gradient-text">Global Pass</span>
                        </h2>
                        <p className="text-muted-foreground text-lg mt-4">
                            Celebrating our milestones, partnerships, and student success stories.
                        </p>
                    </div>

                    <Link to="/gallery" className="hidden md:block">
                        <Button className="btn-premium rounded-full px-6 group">
                            View All Photos
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {/* Auto-playing Carousel */}
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex gap-4">
                        {galleryImages.map((image, index) => (
                            <div
                                key={image.id}
                                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_23%] min-w-0"
                            >
                                <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 animate-fade-up">
                                    <OptimizedImage
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full"
                                        imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Category Badge */}
                                    <span className="absolute top-4 left-4 text-primary-foreground text-xs font-semibold uppercase tracking-wider bg-primary/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                        {image.category}
                                    </span>

                                    {/* Title Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        <h4 className="text-white font-bold text-base leading-tight">{image.alt}</h4>
                                    </div>

                                    {/* Hover Border Effect */}
                                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/gallery">
                        <Button className="btn-premium rounded-full px-8 w-full">
                            View All Photos
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
