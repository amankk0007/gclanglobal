import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ConsultationModal from "@/components/ConsultationModal";
import { useState } from "react";
import { AlertTriangle, ShieldCheck, FileWarning } from "lucide-react";

const DisclaimerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sections = [
    {
      title: "No Guarantee of Outcomes",
      points: [
        "Admission to any college/university",
        "Visa approval",
        "Job placement or employment",
        "Business or startup success"
      ],
      desc: "We provide guidance and assistance only. Final outcomes depend on institutions, authorities, and individual performance."
    },
    {
      title: "Third-Party Decision Responsibility",
      points: [
        "Universities & colleges",
        "Immigration authorities",
        "Employers & recruiters"
      ],
      desc: "We are not responsible for rejections, delays, or policy changes made by third parties."
    },
    {
      title: "Accuracy of Information",
      points: [
        "Policies may change without notice",
        "Requirements may vary over time"
      ],
      desc: "We strive for accuracy but are not liable for outdated or changed information."
    },
    {
      title: "Financial Protection Clause",
      points: [
        "Service fees are for consultation & processing",
        "Third-party payments are non-refundable",
        "Service fees non-refundable unless stated"
      ],
      desc: ""
    },
    {
      title: "User Responsibility",
      points: [
        "Provide genuine documents",
        "Avoid fake or misleading information",
        "Follow legal and immigration rules"
      ],
      desc: "False information will void responsibility from our side."
    },
    {
      title: "Limitation of Liability",
      points: [
        "Financial loss",
        "Rejection or delays",
        "Emotional stress",
        "Opportunity loss"
      ],
      desc: "We are not liable for any direct or indirect damages."
    },
    {
      title: "Indemnification",
      points: [
        "Misuse of services",
        "False information",
        "Third-party decisions"
      ],
      desc: "Users agree to hold the company harmless from claims."
    },
    {
      title: "Fraud & Misrepresentation",
      points: [
        "Service termination",
        "Reporting to authorities",
        "Legal action"
      ],
      desc: ""
    },
    {
      title: "Jurisdiction",
      points: [
        "All disputes subject to Indian courts"
      ],
      desc: ""
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header onOpenModal={() => setIsModalOpen(true)} />

      <main className="flex-grow">

        {/* 🔥 HERO */}
        <section className="py-20 bg-slate-900 text-center">
          <div className="container mx-auto px-4">

            <div className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-xs mb-6">
              <FileWarning className="w-3 h-3" />
              Legal Disclaimer
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Disclaimer
            </h1>

            <p className="text-slate-300 max-w-xl mx-auto">
              Please read this disclaimer carefully before using our services.
            </p>

          </div>
        </section>

        {/* 🔥 CONTENT */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">

            <div className="space-y-8">

              {sections.map((section, i) => (
                <div
                  key={i}
                  className="p-8 border rounded-2xl shadow-sm hover:shadow-lg transition"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                    {i + 1}. {section.title}
                  </h2>

                  {section.desc && (
                    <p className="text-slate-600 mb-4">{section.desc}</p>
                  )}

                  <ul className="space-y-2">
                    {section.points.map((point, idx) => (
                      <li key={idx} className="flex gap-2 text-slate-600 text-sm">
                        <span className="text-primary">•</span> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>

          </div>
        </section>

        {/* 🔥 FINAL ACCEPTANCE BOX */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">

            <div className="p-8 bg-red-50 border border-red-200 rounded-2xl text-center">
              <div className="flex justify-center items-center gap-2 text-red-600 mb-4">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Acceptance of Terms</span>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                By using our services, you acknowledge that you understand the risks,
                accept all terms, and agree that Global Pass Career Consultancy acts
                only as a service provider and not a decision-making authority.
              </p>
            </div>

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

export default DisclaimerPage;