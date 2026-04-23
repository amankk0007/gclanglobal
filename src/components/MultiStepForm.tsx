import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, ChevronRight, ChevronLeft, Loader2, User, GraduationCap, Globe, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";

const MultiStepForm = ({ embedded = false }: { embedded?: boolean }) => {
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Personal Information
        fullName: "",
        fatherName: "",
        nationality: "",
        phone: "",
        email: "",

        // Step 2: Educational Details
        schoolName: "",
        board: "",
        boardOther: "",
        qualification: "",
        admissionRequiredIn: "",

        // Step 3: Study Preferences & Course
        preferredCountries: [] as string[],
        preferredCountryOther: "",
        courseCategory: "",
        courseInterest: "",
        courseOther: "",

        // Step 4: Additional
        additionalInfo: ""
    });

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCountryToggle = (country: string) => {
        setFormData(prev => {
            const current = prev.preferredCountries;
            if (current.includes(country)) {
                return { ...prev, preferredCountries: current.filter(c => c !== country) };
            } else {
                return { ...prev, preferredCountries: [...current, country] };
            }
        });
    };

    const nextStep = () => {
        // Validation logic
        if (step === 1) {
            if (!formData.fullName || !formData.email || !formData.phone || !formData.fatherName) {
                toast({ title: "Please fill in all required fields", variant: "destructive" });
                return;
            }
        }
        if (step === 2) {
            if (!formData.schoolName || !formData.board || !formData.qualification || !formData.admissionRequiredIn) {
                toast({ title: "Please fill in all educational details", variant: "destructive" });
                return;
            }
        }
        if (step === 3) {
            if (formData.preferredCountries.length === 0) {
                toast({ title: "Please select at least one preferred country", variant: "destructive" });
                return;
            }
            if (!formData.courseInterest) {
                toast({ title: "Please select a course of interest", variant: "destructive" });
                return;
            }
        }
        setStep(prev => prev + 1);
    };

    const prevStep = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        
        try {
            // Prepare data for email API - Always send full data
            const emailData = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                education: formData.qualification,
                course: formData.courseInterest,
                destination: formData.preferredCountries.join(", "),
                message: formData.additionalInfo,
                fatherName: formData.fatherName,
                nationality: formData.nationality,
                schoolName: formData.schoolName,
                board: formData.board,
                admissionRequiredIn: formData.admissionRequiredIn,
                preferredCountries: formData.preferredCountries,
                courseCategory: formData.courseCategory,
                subject: embedded ? "Consultation Booking - Global Pass Career" : "Admission Application - Global Pass Career"
            };

            const formType = embedded ? 'contact' : 'admission';

            // Send email using API
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: emailData,
                    formType: formType
                })
            });

            if (response.ok) {
                // Also save to localStorage as backup - Always save full data
                if (embedded) {
                    await dataService.saveContactForm({
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        subject: "Consultation Booking - Global Pass Career",
                        message: `Full consultation details:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Father Name: ${formData.fatherName}
Nationality: ${formData.nationality}
School: ${formData.schoolName}
Board: ${formData.board}
Qualification: ${formData.qualification}
Admission Required: ${formData.admissionRequiredIn}
Preferred Countries: ${formData.preferredCountries.join(", ")}
Course Category: ${formData.courseCategory}
Course Interest: ${formData.courseInterest}
Additional Info: ${formData.additionalInfo}`
                    });
                } else {
                    await dataService.saveAdmissionForm({
                        ...emailData,
                        education: emailData.education || "",
                        course: emailData.course || "",
                        destination: emailData.destination || "",
                        message: emailData.message || ""
                    });
                }
                
                setIsSubmitted(true);
                toast({
                    title: embedded ? "Consultation Booked!" : "Application Received!",
                    description: embedded ? "We'll get back to you within 24 hours." : "Our counselors will review your profile and contact you shortly.",
                });
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            // Fallback to localStorage - Always save full data
            try {
                const fullApplicationData = {
                    name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    education: formData.qualification,
                    course: formData.courseInterest,
                    destination: formData.preferredCountries.join(", "),
                    message: formData.additionalInfo,
                    fatherName: formData.fatherName,
                    nationality: formData.nationality,
                    schoolName: formData.schoolName,
                    board: formData.board,
                    admissionRequiredIn: formData.admissionRequiredIn,
                    preferredCountries: formData.preferredCountries,
                    courseCategory: formData.courseCategory
                };

                if (embedded) {
                    await dataService.saveContactForm({
                        name: formData.fullName,
                        email: formData.email,
                        phone: formData.phone,
                        subject: "Consultation Booking - Global Pass Career",
                        message: `Full consultation details:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Father Name: ${formData.fatherName}
Nationality: ${formData.nationality}
School: ${formData.schoolName}
Board: ${formData.board}
Qualification: ${formData.qualification}
Admission Required: ${formData.admissionRequiredIn}
Preferred Countries: ${formData.preferredCountries.join(", ")}
Course Category: ${formData.courseCategory}
Course Interest: ${formData.courseInterest}
Additional Info: ${formData.additionalInfo}`
                    });
                } else {
                    await dataService.saveAdmissionForm({
                        ...fullApplicationData,
                        education: fullApplicationData.education || "",
                        course: fullApplicationData.course || "",
                        destination: fullApplicationData.destination || "",
                        message: fullApplicationData.message || ""
                    });
                }
                
                setIsSubmitted(true);
                toast({
                    title: embedded ? "Consultation Booked!" : "Application Received!",
                    description: embedded ? "We'll get back to you within 24 hours." : "Our counselors will review your profile and contact you shortly.",
                });
            } catch (fallbackError) {
                toast({
                    title: "Error",
                    description: "Failed to submit application. Please try again.",
                    variant: "destructive"
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={`bg-white rounded-3xl p-10 flex flex-col items-center justify-center min-h-[500px] text-center ${embedded ? "" : "shadow-2xl shadow-slate-200/50 border border-slate-100"}`}>
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-display font-bold text-3xl text-slate-800 mb-3">You're All Set!</h3>
                <p className="text-slate-500 mb-8 text-lg max-w-sm leading-relaxed">
                    Thank you for sharing your details. Our expert counselors are already analyzing your profile and will reach out within 24 hours.
                </p>
                <Button
                    onClick={() => {
                        setIsSubmitted(false); setStep(1); setFormData({
                            fullName: "", fatherName: "", nationality: "", phone: "", email: "",
                            schoolName: "", board: "", boardOther: "", qualification: "", admissionRequiredIn: "",
                            preferredCountries: [], preferredCountryOther: "", courseCategory: "", courseInterest: "", courseOther: "",
                            additionalInfo: ""
                        })
                    }}
                    variant="outline"
                    className="rounded-full h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                    Submit Another Application
                </Button>
            </div>
        );
    }

    const steps = [
        { num: 1, title: "Personal", icon: User },
        { num: 2, title: "Education", icon: GraduationCap },
        { num: 3, title: "Preferences", icon: Globe },
        { num: 4, title: "Additional", icon: FileText },
    ];

    return (
        <div className={`bg-white flex flex-col h-full min-h-[350px] sm:min-h-[600px] overflow-hidden ${embedded ? "" : "rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100"}`}>
            {/* Minimal Header */}
            <div className="pt-4 sm:pt-8 px-4 sm:px-8 pb-4 bg-white z-10">
                {/* Progress Indicators */}
                <div className="flex justify-between max-w-sm mx-auto mb-2">
                    {steps.map((s) => (
                        <div key={s.num} className={`flex flex-col items-center gap-2 transition-all duration-500 ${step >= s.num ? "opacity-100" : "opacity-40"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${step === s.num ? "bg-primary text-white scale-110 shadow-lg shadow-primary/30" :
                                step > s.num ? "bg-green-500 text-white" : "bg-slate-100 text-slate-400"
                                }`}>
                                {step > s.num ? <CheckCircle className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.title}</span>
                        </div>
                    ))}
                </div>
                {/* Connecting Line */}
                <div className="w-full h-1 bg-slate-100 rounded-full mt-2 overflow-hidden max-w-sm mx-auto">
                    <div
                        className="h-full bg-primary transition-all duration-700 ease-in-out rounded-full"
                        style={{ width: `${((step - 1) / 3) * 100}%` }}
                    />
                </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-8">
                <div className="max-w-md mx-auto">

                    {step === 1 && (
                        <div className="animate-fade-up space-y-3 sm:space-y-5">
                            <div className="text-center mb-3 sm:mb-6">
                                <h3 className="font-display font-bold text-lg sm:text-2xl text-slate-800">Personal Information</h3>
                                <p className="text-slate-500 text-xs sm:text-base">Tell us a bit about yourself.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Full Name</Label>
                                    <Input value={formData.fullName} onChange={e => handleChange("fullName", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="Enter your full name" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Father's Name</Label>
                                    <Input value={formData.fatherName} onChange={e => handleChange("fatherName", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="Enter father's name" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Nationality</Label>
                                    <Input value={formData.nationality} onChange={e => handleChange("nationality", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="e.g. Indian" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Contact Number</Label>
                                    <Input value={formData.phone} onChange={e => handleChange("phone", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="+91 00000 00000" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Email Address</Label>
                                    <Input value={formData.email} onChange={e => handleChange("email", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="email@example.com" />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-up space-y-5">
                            <div className="text-center mb-6">
                                <h3 className="font-display font-bold text-2xl text-slate-800">Educational Details</h3>
                                <p className="text-slate-500">Your academic background.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">School Name</Label>
                                    <Input value={formData.schoolName} onChange={e => handleChange("schoolName", e.target.value)} className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-all text-sm sm:text-lg" placeholder="Enter school name" />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Board</Label>
                                    <Select value={formData.board} onValueChange={(val) => handleChange("board", val)}>
                                        <SelectTrigger className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 text-sm sm:text-lg"><SelectValue placeholder="Select Board" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cbse">CBSE</SelectItem>
                                            <SelectItem value="icse">ICSE</SelectItem>
                                            <SelectItem value="state">State Board</SelectItem>
                                            <SelectItem value="ib">IB</SelectItem>
                                            <SelectItem value="cambridge">Cambridge</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {formData.board === "other" && (
                                        <Input value={formData.boardOther} onChange={e => handleChange("boardOther", e.target.value)} className="h-12 mt-2 rounded-xl bg-slate-50 border-slate-200" placeholder="Specify Board" />
                                    )}
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Highest Qualification</Label>
                                    <Select value={formData.qualification} onValueChange={(val) => handleChange("qualification", val)}>
                                        <SelectTrigger className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 text-sm sm:text-lg"><SelectValue placeholder="Select Qualification" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="in_school">In School</SelectItem>
                                            <SelectItem value="10th">10th Grade</SelectItem>
                                            <SelectItem value="12th">12th Grade</SelectItem>
                                            <SelectItem value="diploma">Diploma</SelectItem>
                                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                                            <SelectItem value="masters">Masters Degree</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Admission Required In</Label>
                                    <Select value={formData.admissionRequiredIn} onValueChange={(val) => handleChange("admissionRequiredIn", val)}>
                                        <SelectTrigger className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 text-sm sm:text-lg"><SelectValue placeholder="Select Admission Type" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="school">School</SelectItem>
                                            <SelectItem value="college">College</SelectItem>
                                            <SelectItem value="university">University</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-up space-y-5">
                            <div className="text-center mb-6">
                                <h3 className="font-display font-bold text-2xl text-slate-800">Study Preferences</h3>
                                <p className="text-slate-500">Your future goals.</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-slate-600 font-medium">Preferred Study Country</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["India", "Canada", "USA", "Australia", "Europe", "Russia", "Caribbean", "Other"].map((c) => (
                                            <div key={c} onClick={() => handleCountryToggle(c)}
                                                className={`cursor-pointer rounded-xl h-12 flex items-center justify-center border transition-all text-sm font-medium ${formData.preferredCountries.includes(c) ? "bg-primary text-white border-primary shadow-md" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white"}`}
                                            >
                                                {c}
                                            </div>
                                        ))}
                                    </div>
                                    {formData.preferredCountries.includes("Other") && (
                                        <Input value={formData.preferredCountryOther} onChange={e => handleChange("preferredCountryOther", e.target.value)} className="h-12 mt-2 rounded-xl bg-slate-50 border-slate-200" placeholder="Specify Country" />
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Course Interested In</Label>
                                    <Select value={formData.courseInterest} onValueChange={(val) => handleChange("courseInterest", val)}>
                                        <SelectTrigger className="h-11 sm:h-14 rounded-xl bg-slate-50 border-slate-200 text-sm sm:text-lg"><SelectValue placeholder="Select Course/Field" /></SelectTrigger>
                                        <SelectContent className="max-h-60">
                                            <SelectGroup>
                                                <SelectLabel>Medical & Healthcare</SelectLabel>
                                                <SelectItem value="mbbs">MBBS</SelectItem>
                                                <SelectItem value="nursing">Nursing</SelectItem>
                                                <SelectItem value="gnm">GNM</SelectItem>
                                                <SelectItem value="medical_other">Other Medical Course</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Engineering</SelectLabel>
                                                <SelectItem value="engineering">Engineering (specify in note)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Commerce & Management</SelectLabel>
                                                <SelectItem value="commerce">Commerce</SelectItem>
                                                <SelectItem value="bba_mba">BBA / MBA</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Art & Applied Science</SelectLabel>
                                                <SelectItem value="arts">Art & Applied Science</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Law</SelectLabel>
                                                <SelectItem value="law">Law</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Hospitality & Media</SelectLabel>
                                                <SelectItem value="hotel_mgmt">Hotel Management</SelectItem>
                                                <SelectItem value="mass_media">Mass Media</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Technology</SelectLabel>
                                                <SelectItem value="digital_media">Digital Media</SelectItem>
                                                <SelectItem value="ai">Artificial Intelligence (AI)</SelectItem>
                                            </SelectGroup>
                                            <SelectGroup>
                                                <SelectLabel>Others</SelectLabel>
                                                <SelectItem value="merchant_navy">Merchant Navy</SelectItem>
                                                <SelectItem value="other">Other (Specify)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {formData.courseInterest === "other" && (
                                        <Input value={formData.courseOther} onChange={e => handleChange("courseOther", e.target.value)} className="h-12 mt-2 rounded-xl bg-slate-50 border-slate-200" placeholder="Specify Course" />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="animate-fade-up space-y-5">
                            <div className="text-center mb-6">
                                <h3 className="font-display font-bold text-2xl text-slate-800">Final Step</h3>
                                <p className="text-slate-500">Any specific requirements?</p>
                            </div>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-slate-600 font-medium">Specific Requirements / Questions</Label>
                                    <Textarea value={formData.additionalInfo} onChange={e => handleChange("additionalInfo", e.target.value)} className="rounded-xl bg-slate-50 border-slate-200 min-h-[150px] text-lg p-4" placeholder="Type your message here..." />
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Footer / Nav */}
            <div className="p-6 border-t border-slate-100 flex justify-between items-center bg-white">
                <Button
                    variant="ghost"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="h-12 rounded-full px-6 text-slate-500 hover:text-slate-800 disabled:opacity-0"
                >
                    <ChevronLeft className="w-4 h-4 mr-2" /> Back
                </Button>

                {step < 4 ? (
                    <Button onClick={nextStep} className="h-12 rounded-full px-8 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                        Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={isSubmitting} className="h-12 rounded-full px-10 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white shadow-xl transition-all w-48">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Inquiry"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;
