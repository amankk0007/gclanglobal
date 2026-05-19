import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import MultiStepForm from "@/components/MultiStepForm";
import { Send, CheckCircle, ArrowRight, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95%] sm:w-full sm:max-w-4xl p-0 overflow-y-auto max-h-[85vh] bg-transparent border-none shadow-none">
                <div className="bg-white rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-3 sm:p-6 bg-primary/5 border-b border-border/50">
                        <DialogHeader>
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl md:text-2xl font-display font-bold text-foreground">Start Your Global Journey</DialogTitle>
                                    <DialogDescription className="text-base text-muted-foreground">Build it with Global Pass Career Consultancy Inc.</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>
                    </div>

                    <div className="p-0">
                        <MultiStepForm embedded={true} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConsultationModal;
