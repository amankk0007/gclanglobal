import { Phone, MapPin, Mail, Sparkles } from "lucide-react";
import MultiStepForm from "./MultiStepForm";

const Contact = () => {
  return (
    <section id="contact" className="py-16 lg:py-20 relative overflow-hidden bg-gradient-to-b from-slate-100/80 to-white">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 mb-4 shadow-sm border border-border">
            <Sparkles className="w-4 h-4 text-secondary" />
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Start Your <span className="text-primary">Global Journey</span>
          </h2>
          <p className="text-xl font-display font-semibold text-secondary">
            Build it with Global Pass Career Consultancy Inc.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Info Side */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary text-white p-8 rounded-3xl shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />

              <h3 className="font-display font-bold text-2xl mb-8 relative z-10">Get in Touch</h3>

              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Addresses</p>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-secondary mb-1">Canada</p>
                        <p className="font-medium leading-relaxed text-sm">
                          12508, Kennedy Road,<br />
                          Caledon ON, L7C4L6
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-secondary mb-1">India</p>
                        <p className="font-medium leading-relaxed text-sm">
                          SCO 3017-18 Sector 22-D,<br />
                          Chandigarh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Phone / WhatsApp</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-secondary mb-1">Canada</p>
                        <a href="tel:+15198060052" className="block font-medium hover:text-secondary transition-colors">+1 (519) 806-0052</a>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-secondary mb-1">India</p>
                        <a href="tel:+917508813555" className="block font-medium hover:text-secondary transition-colors">+91-7508813555</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm mb-1 uppercase tracking-wider font-semibold">Email</p>
                    <a href="mailto:globalpasscareer@gmail.com" className="font-medium hover:text-secondary transition-colors">info@globalpasscareer.com</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Embed - Enhanced */}
            <div className="relative group">
              {/* Gradient border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-500" />

              <div className="relative h-64 rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-800">
                {/* Map label */}
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-slate-700">Caledon, ON</span>
                </div>

                <iframe
                  src="https://maps.google.com/maps?q=12508+Kennedy+Road,+Caledon+ON,+L7C4L6&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Global Pass Location"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-3">
            <MultiStepForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
