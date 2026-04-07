import { MessageSquare, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface MobileFloatingCTAProps {
    onOpenModal: () => void;
}

const MobileFloatingCTA = ({ onOpenModal }: MobileFloatingCTAProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling down 100px
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-4 z-50 lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Button
                onClick={onOpenModal}
                className="rounded-full shadow-lg shadow-primary/30 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-6 h-auto flex items-center gap-2"
            >
                <Calendar className="w-5 h-5" />
                <span>Book Consulting</span>
            </Button>
        </div>
    );
};

export default MobileFloatingCTA;
