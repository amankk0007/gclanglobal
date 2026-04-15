import { useState } from "react";
import { User, Sparkles, Brain, Target, Award, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const PremiumKnowYourselfButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCareerForm = () => {
    window.open('/src/career-form-2-saas.html', '_blank', 'width=900,height=700,scrollbars=yes,resizable=yes');
    setIsOpen(false);
  };

  return (
    <>
      {/* Premium Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 border border-white/20 backdrop-blur-sm"
      >
        {/* Sparkle Icon */}
        <Sparkles className="w-4 h-4 animate-pulse" />
        
        {/* Button Text */}
        <span className="font-semibold text-sm">Know Yourself</span>
        
        {/* Arrow Icon */}
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
        
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
      </button>

      {/* Premium Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 border-slate-700/50 text-white p-0 rounded-3xl overflow-hidden shadow-2xl">
          {/* Header with Gradient */}
          <div className="relative p-8 pb-6 text-center bg-gradient-to-b from-white/10 via-transparent to-transparent">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20"></div>
            
            {/* Icon */}
            <div className="relative w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-purple-500/30">
              <Brain className="w-10 h-10 text-white" />
            </div>
            
            {/* Title */}
            <h3 className="relative font-display text-2xl font-bold text-white mb-3">
              Discover Your True Potential
            </h3>
            
            {/* Subtitle */}
            <p className="relative text-slate-300 text-sm leading-relaxed">
              Advanced AI-powered career assessment to unlock your perfect professional path
            </p>
          </div>

          {/* Features Section */}
          <div className="px-8 pb-6 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">Personalized Analysis</h4>
                  <p className="text-xs text-slate-400">AI-driven insights into your strengths</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">Career Matching</h4>
                  <p className="text-xs text-slate-400">Perfect career recommendations</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-sm">Skill Roadmap</h4>
                  <p className="text-xs text-slate-400">Step-by-step development plan</p>
                </div>
              </div>
            </div>

            {/* Premium CTA Button */}
            <button
              onClick={openCareerForm}
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Premium Assessment
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Footer */}
          <div className="px-8 pb-6 text-center border-t border-white/10 pt-4">
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Free Assessment
              </span>
              <span>10-15 Minutes</span>
              <span>Instant Results</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PremiumKnowYourselfButton;
