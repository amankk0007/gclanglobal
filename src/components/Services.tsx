import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lightbulb,
  FileText,
  Mail,
  GraduationCap,
  HandHeart,
  FileCheck,
  Award,
  School,
  Wallet,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
import OptimizedImage from "@/components/ui/OptimizedImage";

// Import existing and new premium images
import careerCounselingImg from "@/assets/students/career-counseling-premium.png";
import admissionGuidanceImg from "@/assets/students/university-admission-premium.png";
import offerLetterImg from "@/assets/students/offer-letter.jpg";
import scholarshipImg from "@/assets/students/scholarship-finance-premium.png";
import handHoldingImg from "@/assets/students/hand-holding.jpg";
import credentialImg from "@/assets/students/credential.jpg";
import equivalencyImg from "@/assets/students/equivalency.jpg";
import boardingSchoolImg from "@/assets/students/boarding-school.jpg";
import educationLoanImg from "@/assets/students/education-loan.jpg";

export type ServiceCategory = "All" | "Guidance" | "Admissions" | "Documentation" | "Financial";

// Adding robust type for our new structure
export interface ServiceContent {
  id: string;
  icon: any;
  title: string;
  category: string;
  shortDesc: string;
  description: string;
  image: string;
  features?: string[];
  whatweoffer?: string[];
  benefits?: string[];
  programs?: string[];
  roles?: string[];
  responsibilities?: string[];
  locations?: string[];

  // New Long Form Content Fields
  overviewParagraphs?: string[];
  whyChooseUs?: string[];
  process?: { step: number; title: string; description: string }[];
  faqs?: { question: string; answer: string }[];
}

export const services: ServiceContent[] = [
  {
    id: "career-counseling",
    icon: Lightbulb,
    title: "Career Consultancy",
    category: "Guidance",
    shortDesc: "Personalized interest & aptitude roadmap",
    description: "One-to-one counseling based on interest and aptitude to create a long-term career roadmap.",
    image: careerCounselingImg,
    features: ["Personalized one-to-one counseling", "Interest & aptitude assessment", "Stream & subject selection", "Long-term roadmap creation"],
    overviewParagraphs: [
      "Navigating the immense landscape of career opportunities can be overwhelming for both students and parents. At Global Pass Career Consultancy, our Career Consultancy services are designed to bring absolute clarity to your future. We do not believe in a one-size-fits-all approach; instead, we dive deep into understanding the unique personality traits, innate skills, and long-term aspirations of every individual.",
      "Our psychometric evaluations and aptitude assessments provide a data-driven foundation for our advice. Based on these insights, our experienced counselors craft a meticulously planned, long-term roadmap. Whether you are contemplating which stream to choose in high school or determining the best undergraduate major, we are here to support your pivotal life decisions.",
      "Beyond just academic choices, we prepare you for the realities of the modern workforce. We discuss emerging industries, demand forecasts for various professions, and the soft skills required to truly excel. Let us build a definitive blueprint that bridges the gap between where you are today and the successful professional you strive to become."
    ],
    whyChooseUs: [
      "Scientifically backed psychometric assessments.",
      "Decades of collective counseling experience.",
      "Extensive knowledge of emerging global career trends.",
      "Personalized touch with multiple follow-up sessions."
    ],
    process: [
      { step: 1, title: "Initial Profiling", description: "A detailed discussion with the student and parents to understand academic history and personal aspirations." },
      { step: 2, title: "Aptitude Assessment", description: "Administering standard, scientifically-validated tests to identify strengths and potential career alignments." },
      { step: 3, title: "Roadmap Creation", description: "Drafting a step-by-step career blueprint detailing the required subjects, courses, and extracurriculars." },
      { step: 4, title: "Ongoing Mentorship", description: "Continuous touchpoints over the academic year to ensure the student remains motivated and on track." }
    ],
    faqs: [
      { question: "When is the right time to start career counseling?", answer: "We recommend starting as early as Grade 9 or 10. Early planning enables students to choose the right academic streams and build a robust profile over several years." },
      { question: "Are parents involved in the counseling sessions?", answer: "Absolutely. We view career planning as a collaborative family effort. We highly encourage parents to participate in the roadmap presentations." },
      { question: "How accurate are the aptitude assessments?", answer: "We use globally recognized, peer-reviewed evaluation frameworks. While no test is perfect, they provide a highly reliable baseline for making informed decisions." }
    ]
  },
  {
    id: "admission-guidance",
    icon: FileText,
    title: "Admission Guidance",
    category: "Admissions",
    shortDesc: "School & University global admissions",
    description: "Expert guidance for admissions in India & Abroad, helping with course and country shortlisting.",
    image: admissionGuidanceImg,
    features: ["School, College & University admissions", "Course & Country shortlisting", "Institution shortlisting", "Application strategy"],
    overviewParagraphs: [
      "Securing admission into a top-tier institution requires significantly more than just excellent academic grades. Universities today are looking for well-rounded candidates whose profiles stand out in highly competitive global pools. Our Admission Guidance service provides an end-to-end support system that optimizes your chances of acceptance into dream universities across India and around the globe.",
      "We begin by understanding your academic constraints, budget, and geographic preferences. With this knowledge, we meticulously shortlist universities and programs that represent the best cultural and academic fit. From the Ivy League and Russell Group institutions to top public universities and specialized colleges, our network and knowledge base are expansive.",
      "The application process is handled with utmost precision. We guide you through crafting compelling Statements of Purpose (SOPs), refining essays, requesting impactful Letters of Recommendation (LORs), and fine-tuning your resume. Every document is reviewed to ensure it echoes your unique voice and strengths."
    ],
    whyChooseUs: [
      "Direct associations with hundreds of leading global institutions.",
      "Tailored application strategies that highlight your unique strengths.",
      "Dedicated essay and SOP review by editorial experts.",
      "End-to-end guidance from shortlisting to acceptance."
    ],
    process: [
      { step: 1, title: "Profile Evaluation", description: "Deep dive into your transcripts, test scores, and extracurricular activities." },
      { step: 2, title: "University Shortlisting", description: "Curating a mix of ambitious, target, and safe universities tailored to your profile." },
      { step: 3, title: "Application Preparation", description: "Drafting, editing, and finalizing SOPs, essays, and resumes." },
      { step: 4, title: "Submission & Tracking", description: "Filing applications perfectly before deadlines and tracking their status continuously." }
    ],
    faqs: [
      { question: "Which countries do you cover for university admissions?", answer: "We provide comprehensive guidance for the US, UK, Canada, Australia, Europe, Singapore, and prestigious institutions within India." },
      { question: "Do you guarantee admission?", answer: "While we boast an incredibly high success rate, ethical guidelines prevent us from guaranteeing admission to specific institutions. We guarantee that your application will be the strongest it can possibly be." },
      { question: "Can you help with scholarship applications as well?", answer: "Yes, our admission guidance inherently includes identifying and applying for relevant merit-based and need-based scholarships." }
    ]
  },
  {
    id: "offer-letter",
    icon: Mail,
    title: "Offer Letter Assistance",
    category: "Admissions",
    shortDesc: "Securing official offer letters",
    description: "Complete assistance in coordinating with institutions to secure official offer letters.",
    image: offerLetterImg,
    features: ["Institution coordination", "Securing official letters", "Offer conditions explanation", "Next steps guidance"],
    overviewParagraphs: [
      "Securing an offer letter from a foreign university is a critical milestone, but it is often fraught with complex bureaucratic hurdles and stringent documentation requirements. Our Offer Letter Assistance service ensures that this crucial phase is handled smoothly, swiftly, and without errors.",
      "Once an application is submitted, the wait begins. During this time, institutions frequently request additional documents, clarifications, or updated test scores. We take over the responsibility of communicating with university admission departments. By serving as an efficient liaison, we prevent minor delays from snowballing into missed semesters.",
      "When the offer letter finally arrives, it can come with complex conditions—such as required language scores, deposit deadlines, or academic prerequisites. Our experts sit down with you to decode every clause, ensuring you remain entirely compliant and successfully secure your seat."
    ],
    whyChooseUs: [
      "Direct channels of communication with international admission offices.",
      "Rapid response teams for addressing document discrepancies.",
      "Expertise in translating complex university compliance jargon.",
      "Assistance with tuition deposit procedures and deadlines."
    ],
    process: [
      { step: 1, title: "Document Verification", description: "Ensuring all required academic and financial documents are perfectly aligned with the university's standards." },
      { step: 2, title: "Direct Follow-ups", description: "Proactively contacting the institution to track the progress of the application." },
      { step: 3, title: "Condition Decoding", description: "Explaining 'Conditional' vs 'Unconditional' offers and what exactly needs to be done next." },
      { step: 4, title: "Acceptance & Deposit", description: "Guiding the payment of initial tuition deposits to secure the enrollment." }
    ],
    faqs: [
      { question: "How long does it usually take to receive an offer letter?", answer: "It varies significantly by country and institution, ranging from 48 hours to 8 weeks. We provide timelines based on the specific university." },
      { question: "What is a conditional offer letter?", answer: "It means you have been accepted, provided you meet certain remaining requirements—such as achieving a specific final grade or passing an English proficiency test." },
      { question: "What happens if my application is rejected?", answer: "We immediately activate our contingency plans, focusing on the alternative universities we selected during the shortlisting phase." }
    ]
  },
  {
    id: "placement-assistance",
    icon: School,
    title: "Placement Assistance",
    category: "Placement",
    shortDesc: "Career outcomes for our students",
    description: "We are strongly committed to ensuring successful career outcomes for our students. Through our strategic industry connections, we provide complete support and assistance for final placements.",
    image: boardingSchoolImg,
    features: ["IT & Technology", "Telecommunications", "Construction & Infrastructure", "Pharmaceuticals", "Hospitality & Hotel Management"],
    whatweoffer: [
      "Dedicated placement support until final selection",
      "Interview preparation and mock sessions",
      "Resume building and profile enhancement",
      "Direct connections with hiring companies",
      "Internship and job opportunities across industries"
    ],
    overviewParagraphs: [
      "Education is an investment, and achieving a robust return on that investment means securing a highly rewarding job. Global Pass Career Consultancy goes beyond just educational placements—we extend our support deep into career initiation through our comprehensive Placement Assistance.",
      "Our industry partnerships span across multiple high-growth sectors including Information Technology, Telecommunications, Civil Infrastructure, Hospitality, and Pharmaceuticals. We bridge the critical gap between academic curriculum and corporate requirements, ensuring that our students are market-ready.",
      "Our Placement Cell works tirelessly to prepare you for the rigors of corporate recruitment. From formatting an ATS-friendly resume to conducting stressful mock interviews and group discussions, we refine every aspect of your professional persona. We don't just find you a job; we launch your career."
    ],
    whyChooseUs: [
      "Extensive network of corporate recruiters and HR heads.",
      "Specialized training modules for corporate interviews.",
      "Personalized resume rewriting and LinkedIn optimization.",
      "A proven track record of placing students in Fortune 500 equivalent companies."
    ],
    process: [
      { step: 1, title: "Skill Gap Analysis", description: "Evaluating your current skill set against the specific demands of your target industry." },
      { step: 2, title: "Profile Fine-tuning", description: "Professionally overhauling your resume, cover letters, and digital profiles." },
      { step: 3, title: "Interview Prep", description: "Conducting rigorous mock interviews and aptitude test training." },
      { step: 4, title: "Corporate Introductions", description: "Scheduling interviews directly with our partner organizations." }
    ],
    faqs: [
      { question: "Is placement assistance only for students who used your admission services?", answer: "No, our placement assistance programs are open to recent graduates and professionals looking to leverage our corporate network." },
      { question: "Do you offer internships?", answer: "Yes, we actively help students secure pre-final year internships which often successfully convert into full-time pre-placement offers (PPOs)." },
      { question: "What sectors have the highest placement rates currently?", answer: "IT, Data Science, Digital Marketing, and Healthcare Administration are seeing massive demand, though we secure placements across all core sectors." }
    ]
  },
  {
    id: "scholarships-program",
    icon: GraduationCap,
    title: "Scholarships Program",
    category: "Financial",
    shortDesc: "Empowering Talent. Supporting Dreams.",
    description: "Global Pass Career Consultancy is committed to making quality education accessible and affordable for deserving students. Through our strategic partnerships with leading universities, colleges, and schools, we offer exclusive scholarship opportunities to support academic excellence and future career growth.",
    image: scholarshipImg,
    features: [
      "Lamrin Tech Skills University",
      "Mother Mary's Institute of Nursing",
      "Institute of Fashion And Communication Technology",
      "Amity University",
      "Swami Vivekanand Institute of Engineering & Technology",
      "Root Country School"
    ],
    benefits: [
      "Tuition fee waivers (partial to significant)",
      "Merit-based scholarships",
      "Need-based financial assistance",
      "Program-specific scholarships",
      "Early admission incentives"
    ],
    overviewParagraphs: [
      "Financial constraints should never stand in the way of brilliance. At Global Pass Career Consultancy, we firmly believe that talented minds deserve the absolute best environments to thrive, regardless of their economic background. Our Comprehensive Scholarship Program is designed specifically to dismantle financial barriers and deliver world-class education.",
      "We have forged exclusive partnerships with leading educational institutions like Lamrin Tech Skills University, Amity University, SVIET, and more. Because of our deep relationships with these entities, our students gain access to specialized scholarship pools that are often unavailable to the general public.",
      "Securing a scholarship is a nuanced art. It requires demonstrating exceptional merit, aligning your profile with the institution's values, and submitting airtight financial documentation. Our dedicated scholarship advisors guide you through this complex labyrinth, maximizing your chances of securing tuition waivers that range from partial discounts to full-ride coverage."
    ],
    whyChooseUs: [
      "Insider knowledge of institutional scholarship criteria.",
      "Exclusive financial aid agreements with partner universities.",
      "Assistance with both merit-based and need-based applications.",
      "Expert review of scholarship essays and financial affidavits."
    ],
    process: [
      { step: 1, title: "Eligibility Mapping", description: "Cross-referencing your academic and extracurricular profile with hundreds of available scholarships." },
      { step: 2, title: "Document Compilation", description: "Gathering income proofs, tax documents, and academic transcripts required by the aid office." },
      { step: 3, title: "Essay Formulation", description: "Drafting highly compelling scholarship essays that tell a powerful personal story." },
      { step: 4, title: "Application & Negotiation", description: "Filing the applications and acting as an advocate on your behalf with university financial departments." }
    ],
    faqs: [
      { question: "Are scholarships only for straight-A students?", answer: "Not at all. While merit-based scholarships require high grades, many institutions offer need-based aid, diversity scholarships, and program-specific grants." },
      { question: "Is your scholarship assistance an extra cost?", answer: "No, scholarship guidance is a fundamental pillar of our comprehensive admission services." },
      { question: "Can scholarships cover living expenses?", answer: "Some prestigious full-ride scholarships cover tuition, housing, and stipends, though they are highly competitive. We guide students toward all viable options." }
    ]
  },
  {
    id: "training-and-skill-development",
    icon: HandHeart,
    title: "Training & Skill Development",
    category: "Training",
    shortDesc: "Job-oriented training for real-world careers",
    description: "We are committed to making students industry-ready for final placements by providing practical, job-oriented training programs aligned with global market demands. Our programs focus on real-world skills, hands-on experience, and career transformation.",
    image: handHoldingImg,
    features: [
      "Industry-focused curriculum",
      "Practical & project-based learning",
      "Expert trainers & mentorship",
      "Placement-oriented approach",
      "Continuous career support"
    ],
    programs: [
      "Cyber Security (A1 Level)",
      "Data Science & Machine Learning",
      "Digital Marketing",
      "Cloud Computing",
      "Website Development",
      "Internet of Things (IoT)",
      "Embedded Systems",
      "Android App Development",
      "Business Analyst",
      "Data Analysis"
    ],
    overviewParagraphs: [
      "The modern corporate ecosystem is evolving at an unprecedented pace. Traditional degrees often struggle to keep up with the real-time demands of the technology and business sectors. To bridge this divide, Global Pass Career Consultancy offers intensive Training & Skill Development bootcamps focused on ultra-modern, high-demand skills.",
      "Our programs in Cyber Security, Data Science, Cloud Computing, and more are not grounded in obsolete theory. Instead, our curriculum is designed in direct collaboration with industry veterans. You will learn by doing—through extensive project-based practicals, case studies, and live digital environments.",
      "Upon completion, you aren't just handed a certificate; you inherit a highly marketable portfolio of completed projects. This hands-on approach guarantees that when you walk into an interview room, you have proven experience, rather than just academic concepts."
    ],
    whyChooseUs: [
      "Curriculum designed directly by industry tech leads.",
      "State-of-the-art laboratory and cloud access.",
      "100% focus on practical, portfolio-building projects.",
      "Guaranteed interview opportunities upon successful completion."
    ],
    process: [
      { step: 1, title: "Program Selection", description: "Counseling to ensure you pick the skill track perfectly aligned with your aptitude." },
      { step: 2, title: "Intensive Training", description: "Engaging in daily/weekly modules led by experienced industry mentors." },
      { step: 3, title: "Live Projects", description: "Building real-world applications or solving actual corporate case studies." },
      { step: 4, title: "Certification & Placement", description: "Earning your certification and immediately entering our placement drives." }
    ],
    faqs: [
      { question: "Do I need a coding background for Data Science or Cloud Computing?", answer: "While helpful, it is not strictly necessary. We offer foundational modules that bring beginners up to speed before diving into complex topics." },
      { question: "How long are the training programs?", answer: "Programs range from intensive 6-week bootcamps to comprehensive 6-month specialized diplomas." },
      { question: "Are these certificates recognized by employers?", answer: "Absolutely. Furthermore, the tangible projects you complete will speak much louder to potential employers than the certificate itself." }
    ]
  },
  {
    id: "credential",
    icon: FileCheck,
    title: "Credential Evaluation",
    category: "Documentation",
    shortDesc: "WES, ICAS, IQAS, and more",
    description: "Guidance for international credential evaluation services.",
    image: credentialImg,
    features: ["World Education Services (WES)", "ICAS of Canada", "IQAS & CES", "ICES support"],
    overviewParagraphs: [
      "When immigrating to or seeking education in countries like Canada, the USA, or the UK, your native educational degrees must be translated into the local equivalent. The Credential Evaluation process (such as WES, IQAS, or ICAS) is notoriously strict, heavily bureaucratic, and entirely unforgiving of errors.",
      "Global Pass Career Consultancy takes the anxiety entirely out of this equation. Our experts intimately understand the precise document specifications demanded by governing bodies. We know exactly which transcripts need to be sealed, who must sign them, and how they must be dispatched to foreign assessment institutions.",
      "A failed credential evaluation can delay an immigration application by months or lead to a rejection. We oversee the entire lifecycle of the evaluation—coordinating directly with your home country universities to ensure documents are verified, sealed, and shipped precisely as requested by the evaluator."
    ],
    whyChooseUs: [
      "Flawless track record with WES, IQAS, and ICAS evaluations.",
      "Deep understanding of the nuances between different Indian universities.",
      "Complete handling of courier and institutional communication logistics.",
      "Time-saving expertise preventing expensive reapplications."
    ],
    process: [
      { step: 1, title: "Requirement Analysis", description: "Determining exactly which evaluation body (WES, ICAS, etc.) is most appropriate for your specific case." },
      { step: 2, title: "Account Setup", description: "Creating error-free profiles on the evaluation platforms and paying necessary duties." },
      { step: 3, title: "University Coordination", description: "Working with your previous institutions to obtain official, sealed, stamped transcripts." },
      { step: 4, title: "Dispatch & Tracking", description: "Sending the documents securely and monitoring the assessment status until the final report is generated." }
    ],
    faqs: [
      { question: "Which is the best evaluating body for Canadian PR?", answer: "WES is typically the fastest and most popular, but depending on your profession and degree, IQAS or CES may yield a better equivalency." },
      { question: "Can you get transcripts from any Indian University?", answer: "We provide guidance and support for obtaining transcripts from almost all major recognized universities across India." },
      { question: "How long does a WES evaluation take?", answer: "If documents are submitted perfectly, it generally takes 35 days from the date they receive the sealed envelopes. We ensure there are no delays on the document front." }
    ]
  },
  {
    id: "equivalency",
    icon: Award,
    title: "Equivalency Certification",
    category: "Documentation",
    shortDesc: "Indian & NRI qualification map",
    description: "Assistance with Indian equivalency for foreign qualifications.",
    image: equivalencyImg,
    features: ["Foreign qualification equivalency", "Engineering degree recognition", "Medical degree recognition", "Professional degree support"],
    overviewParagraphs: [
      "For NRI students or professionals returning to India with foreign degrees, securing equivalency certification is crucial. Without recognition from bodies like the Association of Indian Universities (AIU), foreign qualifications may not be valid for higher education or government employment within India.",
      "The equivalency process involves complex verifications. The syllabus, credit hours, and grading methodologies of the foreign institution must be rigorously mapped against the Indian framework. This technical process can be incredibly frustrating without professional guidance.",
      "Our team at Global Pass handles the intense paperwork required for AIU Equivalency, Medical Council of India (MCI) recognitions, and other statutory bodies. We ensure that your hard-earned international education is seamlessly authenticated and fully viable within the Indian ecosystem."
    ],
    whyChooseUs: [
      "Intimate knowledge of Association of Indian Universities (AIU) protocols.",
      "Efficient processing that saves months of running between government offices.",
      "Expertise in mapping complex foreign credit systems to Indian standards.",
      "Dedicated case managers for continuous updates."
    ],
    process: [
      { step: 1, title: "Documentation Gathering", description: "Collecting transcripts, graduation certificates, and syllabus details from the foreign university." },
      { step: 2, title: "Apostille & Verification", description: "Guiding you through necessary international apostille and embassy verification processes." },
      { step: 3, title: "Filing with AIU", description: "Submitting the precise, compliant dossier to the relevant Indian governing bodies." },
      { step: 4, title: "Follow-up & Delivery", description: "Navigating the bureaucratic channels to expedite the issuance of the equivalency certificate." }
    ],
    faqs: [
      { question: "Do I need an Equivalency Certificate to work in a private company?", answer: "While some private MNCs don't require it, an AIU certificate is strictly mandatory for Indian government jobs, civil services, and further education in public universities." },
      { question: "Does an online foreign degree get equivalency?", answer: "The AIU has very strict guidelines regarding online and distance learning degrees from abroad. We assess your specific degree to ensure it meets their criteria before applying." },
      { question: "How long does the AIU process securely take?", answer: "Typically, once the complete dossier is submitted, it takes between 30 to 45 working days, though we maintain constant follow-ups to push for faster turnarounds." }
    ]
  },
  {
    id: "join-our-team",
    icon: Wallet,
    title: "Join Our Team",
    category: "Careers",
    shortDesc: "Build Careers. Create Impact. Grow With Us.",
    description: "At Global Pass Career Consultancy, we are dedicated to shaping the future of students by connecting them with the right education and career opportunities. If you are passionate, driven, and looking to grow in a dynamic environment — we would love to have you on board.",
    image: educationLoanImg,
    roles: [
      "Content Creator",
      "Career Counsellor – Ropar Office",
      "Career Counsellor – Phagwara Office",
      "Telecaller"
    ],
    responsibilities: [
      "Develop creative content for social media & branding",
      "Guide students on career paths and admissions",
      "Handle inquiries, follow-ups & conversions",
      "Manage calls and student database"
    ],
    benefits: [
      "Competitive salary packages",
      "Attractive incentives & performance rewards",
      "Fast-growing consultancy exposure",
      "Work with top universities globally",
      "Continuous learning & growth",
      "Supportive & dynamic environment"
    ],
    locations: [
      "Ropar, Punjab",
      "Phagwara, Punjab"
    ],
    overviewParagraphs: [
      "Global Pass Career Consultancy represents a movement to democratize premium global education. We are growing at an exponential rate, and we are constantly searching for deeply passionate, articulate, and driven individuals to join our core team.",
      "Working with us means directly impacting the lives of thousands of ambitious students. It is a massive responsibility, and we reward our team members with leading compensation, performance-based incentives, and unparalleled opportunities for vertical career growth within the consultancy space.",
      "Whether you are an incredibly persuasive counselor, a highly creative social media content manager, or a meticulous operations executive, we offer an environment that nurtures talent. We do not just value experience; we fiercely value empathy, dedication, and the relentless drive to make a difference in a student's life."
    ],
    whyChooseUs: [
      "A culture of high autonomy, ownership, and deep respect.",
      "Lucrative performance incentives completely uncapped.",
      "Direct interactions with international university delegates.",
      "Fast-track promotion paths based entirely on merit."
    ],
    process: [
      { step: 1, title: "Application Submission", description: "Submit your comprehensive resume highlighting your skills and any relevant experience." },
      { step: 2, title: "Screening Call", description: "A brief telephonic interview with our HR to assess cultural fit and communication skills." },
      { step: 3, title: "In-Person Interview", description: "A detailed discussion with our leadership at either our Ropar or Phagwara offices." },
      { step: 4, title: "Offer & Onboarding", description: "Receiving your offer letter and beginning your extensive training program." }
    ],
    faqs: [
      { question: "Do I need prior experience in overseas education?", answer: "While highly preferred for counseling roles, it is not mandatory for all positions. We provide rigorous, world-class training to all new hires." },
      { question: "Are these roles purely commission-based?", answer: "Absolutely not. All roles offer a highly competitive base salary alongside attractive, performance-based incentive structures." },
      { question: "Can I apply if I live outside Punjab?", answer: "Currently, our roles are on-site at our Punjab locations. If you are willing to relocate, you are more than welcome to apply!" }
    ]
  }
];

interface ServicesProps {
  onOpenModal?: () => void;
}

const Services = ({ onOpenModal }: ServicesProps) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("All");
  const navigate = useNavigate();

  const filteredServices = useMemo(() => {
    return activeCategory === "All"
      ? services
      : services.filter(service => service.category === activeCategory);
  }, [activeCategory]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
    containScroll: "trimSnaps"
  });

  // Reset carousel to start when category changes
  useEffect(() => {
    if (emblaApi) emblaApi.scrollTo(0);
  }, [activeCategory, emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
      {/* Ambient Backdrops */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-4 shadow-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-primary font-bold text-xs uppercase tracking-wider">Our Services</span>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-5xl text-slate-900 leading-tight">
              End-to-End <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Support</span>
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-lg">
              Guidance from profile building to settling in your dream country. curated for your success.
            </p>
          </div>

          {/* Categories & Navigation */}
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 w-full md:w-auto">
              <div className="inline-flex p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                {["All", "Guidance", "Admissions", "Documentation", "Financial"].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category as ServiceCategory)}
                    className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${activeCategory === category
                      ? "bg-slate-900 text-white shadow-md transform scale-105"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Carousel Arrows */}
            <div className="hidden md:flex gap-2">
              <button onClick={scrollPrev} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary/30 transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={scrollNext} className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-50 hover:border-primary/30 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-5 py-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-5"
              >
                <div
                  onClick={() => navigate(`/services/${service.id}`)}
                  className="group h-full bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 cursor-pointer flex flex-col relative"
                >
                  {/* Card Image */}
                  <div className="h-48 overflow-hidden relative">
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full"
                      imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <service.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col relative bg-white">
                    <div className="mb-4">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 mb-1 block">
                        {service.category}
                      </span>
                      <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 group-hover:text-primary transition-colors">View Details</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
