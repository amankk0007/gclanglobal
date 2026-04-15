import { Globe, CheckCircle2, Star, ArrowRight } from "lucide-react";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export interface DestinationData {
  id: string;
  name: string;
  flag: string;
  image: string;
  description: string;
  benefits: string[];
  whyUs: string;
  
  // New Long Form Fields
  overviewParagraphs: string[];
  topUniversities: string[];
  livingCosts: { category: string; cost: string }[];
  visaProcess: { step: number; title: string; desc: string }[];
  funFacts: string[];
}

export const destinations: DestinationData[] = [
  {
    id: "canada",
    name: "Canada",
    flag: "🇨🇦",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=800&q=80",
    description: "A top choice for international students due to its high quality of life and welcoming immigration policies.",
    benefits: [
      "Post-Graduation Work Permit (PGWP) up to 3 years",
      "Easy pathways to Permanent Residency (PR)",
      "World-class healthcare and safety",
      "Affordable tuition compared to US/UK"
    ],
    whyUs: "We have direct tie-ups with 100+ Canadian colleges & universities, ensuring quick offer letters and maximum scholarship opportunities.",
    overviewParagraphs: [
      "Canada has rapidly evolved into the most sought-after global destination for international students, and for brilliant reasons. It offers a pristine blend of incredibly high academic standards, a famously safe and welcoming multicultural society, and arguably the most transparent and rewarding post-study immigration pathways in the world.",
      "Canadian universities consistently rank among the world's best, highly respected for their rigorous research programs, innovative curriculum, and focus on employability. Whether you are pursuing complex engineering degrees, disruptive tech diplomas, or advanced healthcare studies, Canada’s education system is fundamentally designed to integrate you directly into its booming workforce.",
      "Beyond the classroom, life in Canada is unparalleled. From the bustling, culturally diverse streets of Toronto and Vancouver to the breathtaking, majestic landscapes of the Rockies, the country offers a standard of living that is both incredibly high and highly inclusive."
    ],
    topUniversities: [
      "University of Toronto",
      "University of British Columbia",
      "McGill University",
      "University of Waterloo",
      "McMaster University",
      "University of Alberta"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "CAD $800 - $1,500" },
      { category: "Food & Groceries", cost: "CAD $300 - $500" },
      { category: "Transportation", cost: "CAD $100 - $150" },
      { category: "Utilities & Internet", cost: "CAD $100 - $200" }
    ],
    visaProcess: [
      { step: 1, title: "Offer Acceptance", desc: "Receive the unconditional Letter of Acceptance (LOA) from a Designated Learning Institution (DLI)." },
      { step: 2, title: "Payment & GIC", desc: "Pay the first year's tuition fee and purchase a Guaranteed Investment Certificate (GIC) of CAD $20,635." },
      { step: 3, title: "Medical Examination", desc: "Undergo an upfront medical exam from a panel physician approved by IRCC." },
      { step: 4, title: "Visa Filing", desc: "Lodge the Study Permit application (usually under the SDS category for faster processing)." }
    ],
    funFacts: [
      "Canada has the most lakes of any country in the world.",
      "Over 20% of Canada's population was born foreign-born.",
      "Poutine is definitely something you will eat at 2 AM after exams."
    ]
  },
  {
    id: "usa",
    name: "USA",
    flag: "🇺🇸",
    image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&q=80",
    description: "Home to the world's top-ranked universities and limitless career growth opportunities in tech and business.",
    benefits: [
      "STEM courses offer up to 3 years of OPT",
      "Highest average starting salaries globally",
      "Flexible curriculum and research opportunities",
      "Diverse cultural exposure"
    ],
    whyUs: "Our experts specialize in F1 visa counseling and help you navigate the complex US admission process with ease, focusing on STEM courses.",
    overviewParagraphs: [
      "The United States remains the undisputed heavyweight champion of higher education and technological innovation. Hosting the highest number of top-100 universities globally, studying in the US is an investment that yields the highest potential professional and financial returns.",
      "What makes the US system deeply attractive is its unparalleled flexibility. The liberal arts philosophy allows students to explore multiple disciplines before declaring a major. At the graduate level, the funding available for pioneering research in STEM (Science, Technology, Engineering, and Mathematics) is simply unmatched anywhere else on earth.",
      "Graduating from a US university does not just give you a degree; it gives you a globally recognized seal of excellence. With Silicon Valley, Wall Street, and the biotech hubs of the East Coast, the US offers international students direct access to the most dynamic, high-paying job markets governed by the lucrative OPT (Optional Practical Training) visa extensions."
    ],
    topUniversities: [
      "Massachusetts Institute of Technology (MIT)",
      "Stanford University",
      "Harvard University",
      "California Institute of Technology",
      "University of California, Berkeley",
      "New York University (NYU)"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "USD $900 - $2,000" },
      { category: "Food & Groceries", cost: "USD $300 - $600" },
      { category: "Health Insurance", cost: "USD $100 - $250" },
      { category: "Miscellaneous", cost: "USD $150 - $400" }
    ],
    visaProcess: [
      { step: 1, title: "Secure SEVIS I-20", desc: "Receive the official I-20 form from your accepting US university after showing financial proof." },
      { step: 2, title: "Pay SEVIS Fee", desc: "Pay the $350 I-901 SEVIS fee to the US Department of Homeland Security." },
      { step: 3, title: "Complete DS-160", desc: "Carefully fill out the online non-immigrant DS-160 visa application form." },
      { step: 4, title: "Visa Interview", desc: "Attend the crucial F-1 visa interview at the US Embassy/Consulate with our specialized mock-interview training." }
    ],
    funFacts: [
      "The US holds more international students than any other country.",
      "College sports are massive—sometimes drawing 100,000+ crowds.",
      "The networking opportunities on US campuses can literally launch million-dollar startups."
    ]
  },
  {
    id: "uk",
    name: "UK",
    flag: "🇬🇧",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    description: "Experience a rich academic heritage with shorter duration courses that save you time and money.",
    benefits: [
      "Masters programs are only 1 year",
      "2-year Graduate Route Visa (PSW)",
      "Free health coverage via NHS",
      "Proximity to rest of Europe"
    ],
    whyUs: "We provide dedicated support for Russell Group university applications and assist with credibility interviews.",
    overviewParagraphs: [
      "The United Kingdom is synonymous with academic prestige, home to centuries-old institutions that have shaped modern science, literature, and business. Studying in the UK is a fast-paced, highly rewarding experience distinguished by its intense, specialized curriculum.",
      "One of the largest tactical advantages of the UK education system is the duration. Unlike the standard two-year master's programs in North America, UK master's degrees are typically just one year. This structure saves students a massive amount of tuition and living expenses, while launching them into the professional workforce a year earlier.",
      "With the re-introduction of the 2-year Graduate Route (PSW) visa, the UK has once again become highly lucrative for international students looking to secure international work experience. From the financial district of London to the booming tech sectors of Manchester and Edinburgh, opportunity is abundant."
    ],
    topUniversities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "University College London (UCL)",
      "University of Edinburgh",
      "King's College London"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "GBP £600 - £1,200" },
      { category: "Food & Groceries", cost: "GBP £200 - £300" },
      { category: "Transport", cost: "GBP £50 - £100" },
      { category: "Utilities", cost: "GBP £100 - £150" }
    ],
    visaProcess: [
      { step: 1, title: "Obtain CAS", desc: "Receive your Confirmation of Acceptance for Studies (CAS) from the sponsor university." },
      { step: 2, title: "Show Financials", desc: "Demonstrate required maintenance funds (usually 28 days old) in your bank account." },
      { step: 3, title: "Apply Online", desc: "Submit the UK Student Visa route application and pay the healthcare surcharge (IHS)." },
      { step: 4, title: "Biometrics & Interview", desc: "Attend VFS/TLS for biometrics. Be prepared for a potential credibility interview." }
    ],
    funFacts: [
      "London has over 100,000 international students.",
      "You can travel from London to Paris by train in just over 2 hours.",
      "The British really do drink exactly as much tea as the stereotypes suggest."
    ]
  },
  {
    id: "australia",
    name: "Australia",
    flag: "🇦🇺",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&q=80",
    description: "Known for its laid-back lifestyle, high wages, and strong focus on research and innovation.",
    benefits: [
      "Extended post-study work rights (up to 4-6 years)",
      "High minimum wage rates",
      "Regional area migration benefits",
      "Excellent climate and outdoor lifestyle"
    ],
    whyUs: "Our team helps you identify regional universities that offer better scholarship chances and extended PR pathways.",
    overviewParagraphs: [
      "Australia is a global powerhouse of education and research, offering a stunning mix of world-class universities and an incomparably high quality of life. From the cosmopolitan energy of Sydney and Melbourne to the booming regional cities of Adelaide and Perth, Australia is a magnet for ambitious international talent.",
      "The Australian educational framework is heavily regulated to protect international students, ensuring that you receive the exact premium education you pay for (under the ESOS Act). Australian graduates are highly sought after globally, particularly in fields like Nursing, IT, Mining Engineering, and Environmental Science.",
      "Financially, Australia is incredibly supportive. It boasts one of the highest minimum wages in the world, allowing students to comfortably support their living expenses through part-time work. Furthermore, recent policies granting extended post-study work rights (in specific sectors) make it a premier destination for those seeking long-term settlement."
    ],
    topUniversities: [
      "University of Melbourne",
      "University of Sydney",
      "University of New South Wales (UNSW)",
      "Australian National University (ANU)",
      "University of Queensland",
      "Monash University"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "AUD $800 - $1,500" },
      { category: "Food & Groceries", cost: "AUD $400 - $600" },
      { category: "Utilities", cost: "AUD $150 - $250" },
      { category: "Transport & Phone", cost: "AUD $100 - $200" }
    ],
    visaProcess: [
      { step: 1, title: "GTE/GS Assessment", desc: "Clear the university's Genuine Student (GS) assessment to prove intent of study." },
      { step: 2, title: "Obtain eCoE", desc: "Pay tuition and receive the electronic Confirmation of Enrolment (eCoE)." },
      { step: 3, title: "Health Check (OSHC)", desc: "Purchase Overseas Student Health Cover and undergo required medicals." },
      { step: 4, title: "Lodge Subclass 500", desc: "Apply for the Student Visa online through the ImmiAccount portal." }
    ],
    funFacts: [
      "Australia has 10,000+ beaches. You could visit one every day for 27 years.",
      "Melbourne has been ranked as the world's most livable city numerous times.",
      "The minimum wage in Australia is among the absolute highest globally."
    ]
  },
  {
    id: "new-zealand",
    name: "New Zealand",
    flag: "🇳🇿",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800&q=80",
    description: "A safe, friendly, and scenic destination offering practical, hands-on learning experiences.",
    benefits: [
      "Green List roles offer straight-to-residence",
      "Family-friendly visa policies",
      "Safe and peaceful environment",
      "Industry-aligned polytechnic courses"
    ],
    whyUs: "We specialize in courses that align with New Zealand's long-term skill shortage list to maximize your settlement chances.",
    overviewParagraphs: [
      "New Zealand is globally renowned not just for its breathtaking landscapes, but for a progressive, agile education system that is heavily aligned with modern industry needs. It is arguably the safest, most peaceful English-speaking country for international students today.",
      "The country's universities and Institutes of Technology (Te Pūkenga) are deeply practical. Instead of purely theoretical exams, courses heavily feature internships, lab work, and real-world projects. This ensures that a New Zealand graduate is perfectly 'work-ready' from day one.",
      "For families and mature students, New Zealand's immigration pathways are distinctly generous. Partners of students in specific high-level or shortage-list programs are often eligible for open work visas, making it a spectacular destination for couples looking to build a new life in a secure, prosperous environment."
    ],
    topUniversities: [
      "University of Auckland",
      "University of Otago",
      "Victoria University of Wellington",
      "University of Canterbury",
      "Massey University",
      "University of Waikato"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "NZD $800 - $1,400" },
      { category: "Food & Groceries", cost: "NZD $400 - $550" },
      { category: "Transport", cost: "NZD $100 - $150" },
      { category: "Power & Phone", cost: "NZD $150 - $250" }
    ],
    visaProcess: [
      { step: 1, title: "Offer of Place", desc: "Secure an unconditional offer from an NZQA-approved institution." },
      { step: 2, title: "FTS / Financials", desc: "Set up a Funds Transfer Scheme (FTS) to prove living costs security." },
      { step: 3, title: "Medical & Police Check", desc: "Undergo a chest x-ray and provide standard background checks." },
      { step: 4, title: "AIP & Tuition Payment", desc: "Receive 'Approval in Principle', transfer your tuition fees, and get your visa issued." }
    ],
    funFacts: [
      "New Zealand is the least corrupt country in the world.",
      "You are never more than 128km away from the ocean.",
      "There are roughly 5 sheep for every 1 person."
    ]
  },
  {
    id: "europe",
    name: "Europe",
    flag: "🇪🇺",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80",
    description: "Access high-quality education at very low or no tuition fees in public universities across Schengen.",
    benefits: [
      "Travel across 27 Schengen countries",
      "Low or zero tuition fees in Germany/France",
      "English-taught programs available",
      "Rich history and culture"
    ],
    whyUs: "We guide you through the specific requirements of public universities in Germany, France, and Malta, including blocked account (details).",
    overviewParagraphs: [
      "Studying in Europe offers an incredibly diverse, culturally rich, and highly affordable alternative to traditional English-speaking destinations. The Schengen area provides international students with unprecedented freedom to travel, network, and absorb the history of 27 distinct countries seamlessly.",
      "The largest draw to countries like Germany, France, and Finland is the economics. Many public universities in these nations offer world-class education at virtually zero or heavily subsidized tuition fees. When coupled with the massive boom in English-taught master's programs, Europe represents the highest ROI (Return on Investment) in global education.",
      "European degrees are fiercely respected, especially in Engineering, Design, Automotive, and Luxury Business Management. Once graduated, students often benefit from job-seeker visas that allow them to hunt for employment across multiple booming European economies."
    ],
    topUniversities: [
      "Technical University of Munich (Germany)",
      "Sorbonne University (France)",
      "KU Leuven (Belgium)",
      "University of Amsterdam (Netherlands)",
      "ETH Zurich (Switzerland)",
      "Politecnico di Milano (Italy)"
    ],
    livingCosts: [
      { category: "Housing (Germany/Avg)", cost: "EUR €400 - €800" },
      { category: "Food & Groceries", cost: "EUR €200 - €300" },
      { category: "Health Insurance", cost: "EUR €110 - €150" },
      { category: "Travel / Leisure", cost: "EUR €100 - €200" }
    ],
    visaProcess: [
      { step: 1, title: "University Admission", desc: "Secure a highly competitive seat in a public or private European university." },
      { step: 2, title: "Blocked Account (Fin)", desc: "For countries like Germany, deposit ~€11,208 into a blocked bank account for living costs." },
      { step: 3, title: "Schengen Paperwork", desc: "Procure specialized European health insurance and apostilled documents." },
      { step: 4, title: "National D-Visa", desc: "Apply for the long-stay National Visa at the respective country's consulate." }
    ],
    funFacts: [
      "Germany offers totally free tuition at public universities, even for international students.",
      "A Schengen student visa lets you weekend-trip across 27 countries without border checks.",
      "Europe is home to the oldest continually operating universities in the world."
    ]
  },
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    description: "Emerging global education hub with affordable premium institutions and diverse culture.",
    benefits: [
      "Very affordable cost of living",
      "rapidly growing economy",
      "IT and Medical hubs",
      "Cultural familiarity for NRIs"
    ],
    whyUs: "We assist NRI students in securing admissions under the DASA scheme and management quotas in top Indian colleges.",
    overviewParagraphs: [
      "For Non-Resident Indians (NRIs) and international students alike, India is rapidly becoming an educational powerhouse. Home to the third-largest higher education network in the world, the sheer scale of academic and entrepreneurial energy in India is staggering.",
      "Institutes of National Importance (like IITs and NITs), premier medical colleges, and elite private universities (like Amity and Manipal) offer education that rivals western counterparts but at a fraction of the cost. The booming tech hubs of Bangalore, Hyderabad, and Pune provide instant access to the world's fastest-growing startup ecosystems.",
      "We specialize heavily in assisting NRI/OIC students navigate the complex DASA (Direct Admission of Students Abroad) scheme, state entrance exams, and management quota channels to secure seats in India’s most prestigious colleges."
    ],
    topUniversities: [
      "Indian Institutes of Technology (IITs)",
      "National Institutes of Technology (NITs)",
      "Manipal Academy of Higher Education",
      "Amity University",
      "Vellore Institute of Technology (VIT)",
      "Delhi University"
    ],
    livingCosts: [
      { category: "Housing (Premium Hostel)", cost: "INR ₹10,000 - ₹20,000" },
      { category: "Food & Groceries", cost: "INR ₹5,000 - ₹10,000" },
      { category: "Transport", cost: "INR ₹1,500 - ₹3,000" },
      { category: "Entertainment", cost: "INR ₹3,000 - ₹5,000" }
    ],
    visaProcess: [
      { step: 1, title: "Entrance/NRI Quota", desc: "Clear relevant exams (JEE/NEET) or apply directly through NRI management quotas." },
      { step: 2, title: "Offer Registration", desc: "Accept the provisional admission letter and pay the institutional fees." },
      { step: 3, title: "FRRO Registration", desc: "For foreign passport holders, register with the FRRO upon arrival in India." },
      { step: 4, title: "Equivalency (AIU)", desc: "Ensure foreign high-school boards receive AIU equivalency certification." }
    ],
    funFacts: [
      "India produces the highest number of engineers in the world annually.",
      "The CEO of Google, Microsoft, and Adobe are all graduates of the Indian education system.",
      "Living costs in India are among the lowest in the world for international students."
    ]
  },
  {
    id: "caribbean",
    name: "Caribbean (MBBS)",
    flag: "🌴",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80",
    description: "The smart pathway to becoming a doctor in the USA/Canada without the high competition.",
    benefits: [
      "No MCAT required for admission",
      "Clinical rotations in US hospitals",
      "High USMLE pass rates",
      "Affordable tuition compared to US med schools"
    ],
    whyUs: "We partner with accredited Caribbean medical schools that have a proven track record of placing students in US residencies.",
    overviewParagraphs: [
      "Gaining admission to a Medical School in the United States or Canada is famously one of the most competitive, gatekept academic processes in the world. Caribbean medical schools have emerged as the premier 'smart pathway' bypass for dedicated students intent on practicing medicine in North America.",
      "The curriculum structure of top-tier Caribbean universities exactly mirrors the US medical system. You spend your first two years (Basic Sciences) enjoying the tropical climate of the islands. Crucially, the final two years (Clinical Rotations) are conducted strictly within actual hospitals inside the United States.",
      "Because you complete US-based clinicals, you are highly prepared for the USMLE (United States Medical Licensing Examination). Thousands of Caribbean graduates successfully secure highly competitive US Medical Residencies every single year, proving this is a highly valid, successful route to the MD title."
    ],
    topUniversities: [
      "St. George's University (SGU)",
      "Ross University School of Medicine",
      "American University of Antigua (AUA)",
      "Saba University School of Medicine",
      "American University of the Caribbean (AUC)"
    ],
    livingCosts: [
      { category: "Housing (Monthly)", cost: "USD $800 - $1,500" },
      { category: "Food & Groceries", cost: "USD $400 - $700" },
      { category: "Transport/Flights", cost: "USD $200 (Varied)" },
      { category: "Utilities", cost: "USD $150 - $300" }
    ],
    visaProcess: [
      { step: 1, title: "Admission Acceptance", desc: "Pass the university interview and provide prerequisite science transcripts." },
      { step: 2, title: "Island Student Visa", desc: "Apply for the specific Caribbean island's student entry visa." },
      { step: 3, title: "Basic Sciences", desc: "Complete 2 years on the island and take the USMLE Step 1 exam." },
      { step: 4, title: "US Visa for Clinicals", desc: "Switch to a US B1/J1 visa to complete your clinical rotations in American hospitals." }
    ],
    funFacts: [
      "Over 25% of all practicing doctors in the US are international medical graduates, many from the Caribbean.",
      "Top Caribbean schools have hospital networks across NY, NJ, California, and Florida.",
      "You literally get to study anatomy overlooking turquoise ocean waters."
    ]
  },
  {
    id: "central-asia",
    name: "Central Asia (MBBS)",
    flag: "🌏",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
    description: "The most budget-friendly option for Indian students aspiring to become doctors.",
    benefits: [
      "Extremely low tuition fees",
      "WHO and NMC recognized universities",
      "English medium instruction",
      "Indian food and hostels available"
    ],
    whyUs: "We ensure you only apply to universities with a high FMGE passing rate and adequate safety measures for international students.",
    overviewParagraphs: [
      "For thousands of Indian students, the dream of becoming a doctor (MBBS) is hampered by the massive surge in private medical college fees and insanely competitive NEET cut-offs. Central Asian countries like Kazakhstan, Kyrgyzstan, and Uzbekistan have stepped in to offer a fully recognized, budget-friendly alternative.",
      "Medical Universities in these regions are fully recognized by the WHO, FAIMER, and crucial for Indian students, the NMC (National Medical Commission). This allows graduates to return home, write the FMGE (Screening Test), and practice legally in India.",
      "These institutions cater heavily to the massive influx of Indian contingents. Instruction is fundamentally in English, the campuses feature dedicated Indian messes (serving traditional food), and the living costs are actually equivalent to or lower than living in metropolitan Indian tier-1 cities."
    ],
    topUniversities: [
      "Kazakh National Medical University",
      "Tashkent Medical Academy",
      "Kyrgyz State Medical Academy",
      "Samarkand State Medical Institute",
      "Osh State University"
    ],
    livingCosts: [
      { category: "Hostel (Yearly)", cost: "USD $600 - $1,200" },
      { category: "Indian Mess (Monthly)", cost: "USD $100 - $150" },
      { category: "Local Transport", cost: "USD $20 - $40" },
      { category: "Misc. Expenses", cost: "USD $50 - $100" }
    ],
    visaProcess: [
      { step: 1, title: "NEET Qualification", desc: "Achieve the minimum qualifying score in the NEET UG examination." },
      { step: 2, title: "Admission Letter", desc: "Submit transcripts to secure the university admission letter." },
      { step: 3, title: "Ministry Approval", desc: "Receive the official invitation letter approved by the respective foreign Ministry of Education." },
      { step: 4, title: "Embassy Visa", desc: "File for the student visa at the country's embassy in New Delhi." }
    ],
    funFacts: [
      "There are entire university blocks in Kyrgyzstan where almost every student is from India.",
      "A 5-year MBBS in Central Asia is often cheaper than a 4-year engineering degree in a private Indian college.",
      "The medical degrees are valid globally, not just in India."
    ]
  }
];

interface DestinationsProps {
  onOpenModal?: () => void;
}

const Destinations = ({ onOpenModal }: DestinationsProps) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const navigate = useNavigate();

  return (
    <section id="destinations" className="py-12 lg:py-20 relative overflow-hidden bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-muted/50 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Study Destinations</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Your Gateway to <span className="text-primary">Global Education</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We guide students to top destinations worldwide for quality education and career opportunities.
          </p>
        </div>

        {/* Destinations Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {destinations.map((dest) => (
              <CarouselItem key={dest.name} className="pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                <div
                  onClick={() => navigate(`/destinations/${dest.id}`)}
                  className="group relative rounded-3xl overflow-hidden aspect-[3/4] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-border/50"
                >
                  <OptimizedImage
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full"
                    imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity" />

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-center transform transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/20 text-3xl shadow-lg">
                      {dest.flag}
                    </div>
                    <h3 className="font-display font-bold text-white text-xl mb-1 flex items-center justify-center gap-2">
                      {dest.name}
                    </h3>
                    <div className="mt-4">
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/20 hover:bg-white hover:text-primary text-white text-xs font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300 shadow-lg group-hover:scale-105">
                        View Details
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-10">
            <CarouselPrevious className="relative left-0 translate-y-0 h-10 w-10 border border-border hover:bg-primary hover:text-white transition-all shadow-sm" />
            <CarouselNext className="relative right-0 translate-y-0 h-10 w-10 border border-border hover:bg-primary hover:text-white transition-all shadow-sm" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Destinations;
