import { Users, Star, Building2 } from "lucide-react";

const About = () => {

  return (
    <section id="about" className="py-16 lg:py-20 relative overflow-hidden bg-white">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Abstract Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
      <svg className="absolute top-0 right-0 opacity-10 pointer-events-none" width="400" height="400" viewBox="0 0 400 400" fill="none">
        <path d="M400 0L0 400" stroke="white" strokeWidth="2" />
        <path d="M430 -30L30 370" stroke="white" strokeWidth="1" />
        <path d="M370 30L-30 430" stroke="white" strokeWidth="1" />
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8 animate-fade-in">
              <Star className="w-3 h-3 fill-current" /> Established 2022
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-slate-900 mb-8 leading-tight">
              Global Pass Career Consultancy Inc.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">
              
              </span>
            </h2>

            <div className="relative pl-8 border-l-2 border-primary/20 mb-10">
              <p className="text-xl md:text-3xl text-slate-600 leading-relaxed font-light font-display">
                "Global Pass Career Consultancy Inc. is driven by a team of experienced educators and industry professionals focused on guiding students towards successful careers. <span className="text-slate-900 font-medium"></span><span className="text-slate-900 font-medium"></span>."
              </p>
            </div>

            <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <Building2 className="w-4 h-4 text-primary" />
                Canada HQ
              </div>
              <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                <Users className="w-4 h-4 text-secondary" />
                Global Team
              </div>
            </div>
          </div>

          {/* Right Column: Simple Content */}
          <div className="lg:w-1/2">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Achievements</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">98%</p>
                  <p className="text-sm text-slate-600">Success Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary mb-1">5000+</p>
                  <p className="text-sm text-slate-600">Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary mb-1">15+</p>
                  <p className="text-sm text-slate-600">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-secondary mb-1">50+</p>
                  <p className="text-sm text-slate-600">Universities</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-700">20+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-700">Certified Counselors</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-700">Global Network</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
