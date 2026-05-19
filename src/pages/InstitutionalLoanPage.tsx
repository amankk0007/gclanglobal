import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";
import ltsuLogo from "@/assets/universities/ltsu.png";
import svietLogo from "@/assets/universities/swami.png";
import rootLogo from "@/assets/universities/roots.png";
import { useState } from "react";
import { CheckCircle2, Sparkles, GraduationCap, ShieldCheck, Users, Award } from "lucide-react";

const ChannelPartnerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

    const partners = [
      {
        name: "Amity University Mohali",
        // logo: "https://upload.wikimedia.org/wikipedia/en/9/9b/Amity_University_logo.png"
      },
      {
        name: "Lamrin Tech Skills University",
        logo: ltsuLogo
      },
      {
        name: "SVIET Banur",
        logo: svietLogo
      },
      {
        name: "Root Country School",
        logo: rootLogo
      }
    ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* 🔥 HERO */}
        <section className="py-24 bg-slate-900 text-center relative overflow-hidden">
          <div className="absolute w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full top-0 left-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-1.5 rounded-full text-xs mb-6">
              <Sparkles className="w-3 h-3" />
              Channel Partner Network
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Partnering with{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Top Institutes in India
              </span>
            </h1>

            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              We build strong academic partnerships to provide students with the best education,
              scholarships, and career opportunities.
            </p>
          </div>
        </section>

        {/* 🔥 PARTNER LOGOS */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">

            <h2 className="text-3xl font-bold mb-10">
              Our Partner Institutions
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {partners.map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-white border rounded-2xl shadow-sm hover:shadow-xl transition group"
                >
 <img
  src={item.logo}
  alt={item.name}
  className="h-20 md:h-24 w-auto mx-auto object-contain mb-4 group-hover:scale-110 transition"
 />
                
                  <p className="text-sm font-semibold text-slate-700">
                    {item.name}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 🔥 VALUE SECTION */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">

            <div className="grid md:grid-cols-3 gap-8">

              <div className="p-8 bg-white rounded-3xl shadow-sm text-center">
                <GraduationCap className="mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Top Education</h3>
                <p className="text-slate-600 text-sm">
                  Access to industry-focused and top-ranked academic programs.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow-sm text-center">
                <Award className="mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Scholarships</h3>
                <p className="text-slate-600 text-sm">
                  Merit-based and need-based scholarship opportunities.
                </p>
              </div>

              <div className="p-8 bg-white rounded-3xl shadow-sm text-center">
                <Users className="mx-auto text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Career Growth</h3>
                <p className="text-slate-600 text-sm">
                  Placement support and career-focused learning pathways.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 🔥 DETAILED CONTENT */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">

            <div className="grid md:grid-cols-2 gap-12">

              {/* LEFT */}
              <div className="bg-white p-8 rounded-3xl border shadow-sm">
                <h3 className="text-xl font-bold mb-6">
                  What Our Partnerships Deliver
                </h3>

                {[
                  "Access to top-ranked academic programs",
                  "Industry-oriented education",
                  "Scholarship opportunities",
                  "Streamlined admission process",
                  "Direct institution coordination",
                  "Enhanced placement support"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <CheckCircle2 className="text-green-500 w-5 h-5 mt-1" />
                    <p className="text-slate-600">{item}</p>
                  </div>
                ))}
              </div>

              {/* RIGHT */}
              <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl text-white shadow-xl">
                <h3 className="text-xl font-bold mb-6">
                  Why It Matters for Students
                </h3>

                {[
                  "Trusted and verified universities",
                  "Better admission guidance",
                  "Higher chances of scholarships",
                  "Career-focused pathways"
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 mt-1" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* 🔥 COMMITMENT */}
        <section className="py-20 bg-slate-900 text-center">
          <div className="container mx-auto px-4">

            <ShieldCheck className="mx-auto text-primary mb-4" />

            <h3 className="text-3xl font-bold text-white mb-4">
              Our Commitment
            </h3>

            <p className="text-slate-300 max-w-2xl mx-auto">
              We ensure transparent, ethical, and student-focused partnerships,
              helping every student achieve success through the right guidance
              and opportunities.
            </p>

          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ChannelPartnerPage;