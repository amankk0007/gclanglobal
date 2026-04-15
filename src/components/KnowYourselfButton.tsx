import { useState } from "react";
import { User, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const KnowYourselfButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openCareerForm = () => {
    // Open the career form in a new window
    window.open('/src/career-form-2-saas.html', '_blank', 'width=800,height=600,scrollbars=yes,resizable=yes');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-3 group"
        aria-label="Know Yourself"
      >
        {/* Tooltip */}
        <span className="hidden md:block bg-card text-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Know Yourself!
        </span>

        {/* Button */}
        <div className="relative">
          {/* Enhanced Pulse ring with light effect */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-ping opacity-40"></span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-purple-400 animate-pulse opacity-60"></span>
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 to-purple-300 animate-ping opacity-30"></span>

          {/* Main button with enhanced glow */}
          <div className="relative w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 hover:scale-110 ring-4 ring-blue-300 ring-opacity-50">
            <User className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
        </div>
      </button>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-sm bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 text-white p-0 rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="relative p-6 pb-4 text-center bg-gradient-to-b from-blue-500/20 to-transparent">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-display text-xl font-bold text-white">Know Yourself</h3>
            <p className="text-slate-400 text-sm mt-1">Discover your perfect career path</p>
          </div>

          {/* Content */}
          <div className="p-6 pt-2 space-y-4">
            <div className="text-center space-y-3">
              <p className="text-slate-300 text-sm leading-relaxed">
                Take our comprehensive career assessment test to discover your strengths, interests, and ideal career paths.
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 border border-blue-500/30 rounded-xl p-4">
                <h4 className="font-semibold text-white mb-2">What you'll discover:</h4>
                <ul className="text-sm text-slate-300 space-y-1">
                  <li>â€¢ Your personality type</li>
                  <li>â€¢ Career interests and strengths</li>
                  <li>â€¢ Recommended career paths</li>
                  <li>â€¢ Skill development roadmap</li>
                </ul>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={openCareerForm}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Assessment
            </button>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6 text-center">
            <p className="text-xs text-slate-500">Free assessment â€¢ 10-15 minutes</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KnowYourselfButton;

