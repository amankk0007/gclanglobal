import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";
import { CheckCircle, GraduationCap, Users, BookOpen, Award, Building2, CreditCard, Shield, Clock } from "lucide-react";

const AdmissionPage = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        education: "",
        message: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const courses = [
        {
            school: "University School of Engineering & Technology",
            programs: [
                "B.Tech Computer Science Engineering",
                "B.Tech Information Technology",
                "B.Tech Electronics & Communication",
                "B.Tech Mechanical Engineering",
                "B.Tech Civil Engineering",
                "B.Tech Electrical Engineering",
                "M.Tech Computer Science",
                "M.Tech Electronics & Communication"
            ]
        },
        {
            school: "University School of Commerce and Management",
            programs: [
                "B.Com (Honors)",
                "B.Com (Professional)",
                "BBA",
                "MBA",
                "M.Com",
                "B.Com Integrated with CA"
            ]
        },
        {
            school: "Rayat Institute of Pharmacy",
            programs: [
                "B.Pharmacy",
                "D.Pharmacy",
                "B.Pharmacy (Practice)",
                "M.Pharmacy",
                "Pharm.D"
            ]
        },
        {
            school: "University School of Polytechnic",
            programs: [
                "Diploma in Computer Engineering",
                "Diploma in Mechanical Engineering",
                "Diploma in Civil Engineering",
                "Diploma in Electrical Engineering",
                "Diploma in Electronics Engineering"
            ]
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Save admission data using dataService
            const admissionData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                education: formData.education,
                course: formData.course,
                destination: "Lamrin Tech Skills University",
                message: formData.message,
                subject: "New Admission Form Submission"
            };

            // Save as both admission form and contact form
            await Promise.all([
                dataService.saveAdmissionForm(admissionData),
                dataService.saveContactForm(admissionData)
            ]);
            
            setIsSubmitted(true);
            
            toast({
                title: "Admission Form Submitted!",
                description: "Your admission request has been received and will be reviewed shortly.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit admission form. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
            <Header />
            
            <main>
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full blur-3xl opacity-30"></div>
                        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl opacity-30"></div>
                    </div>
                    
                    <div className="relative z-10 container mx-auto px-4 text-center">
                        <div className="max-w-4xl mx-auto">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider mb-8">
                                <GraduationCap className="w-4 h-4" />
                                <span>Admissions Open 2026</span>
                                <Award className="w-4 h-4" />
                            </div>
                            
                            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                                Shape Your Future at <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                                    Lamrin Tech Skills University
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Join our prestigious institution and embark on a journey of academic excellence and career success
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105"
                                >
                                    Apply Now
                                    <GraduationCap className="w-5 h-5 ml-2" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-bold rounded-full transition-all duration-300"
                                >
                                    Download Brochure
                                    <BookOpen className="w-5 h-5 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Courses Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                <BookOpen className="w-4 h-4" />
                                <span>Academic Programs</span>
                                <BookOpen className="w-4 h-4" />
                            </div>
                            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Diverse Courses</span>
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                Choose from our comprehensive range of programs designed to build your career
                            </p>
                        </div>

                        <div className="space-y-12">
                            {courses.map((school, index) => (
                                <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 shadow-lg border border-blue-100">
                                    <h3 className="font-bold text-2xl text-slate-900 mb-6 flex items-center gap-3">
                                        <Building2 className="w-6 h-6 text-blue-600" />
                                        {school.school}
                                    </h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {school.programs.map((program, programIndex) => (
                                            <div key={programIndex} className="bg-white rounded-xl p-4 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                                                <div className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                                    <span className="text-slate-700 font-medium">{program}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Admission Form Section */}
                <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                    <Users className="w-4 h-4" />
                                    <span>Application Form</span>
                                    <Users className="w-4 h-4" />
                                </div>
                                <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                    Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Admission Journey</span>
                                </h2>
                                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                    Fill out the form below and our admission team will contact you within 24 hours
                                </p>
                            </div>

                            {!isSubmitted ? (
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-12 text-center text-white">
                                    <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="font-display font-bold text-3xl text-white mb-4">
                                        Application Submitted!
                                    </h3>
                                    <p className="text-xl text-blue-100 mb-8">
                                        Our admission counselor will contact you within 24 hours.
                                    </p>
                                    <Button
                                        onClick={() => setIsSubmitted(false)}
                                        variant="outline"
                                        className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 rounded-xl"
                                    >
                                        Submit Another Application
                                    </Button>
                                </div>
                            ) : (
                                <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                    placeholder="Enter your first name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                    placeholder="Enter your last name"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                    placeholder="your.email@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Phone Number *
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                    placeholder="+91 98765 43210"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Select Course *
                                                </label>
                                                <select
                                                    name="course"
                                                    value={formData.course}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                >
                                                    <option value="">Select a course</option>
                                                    {courses.map((school, schoolIndex) => (
                                                        <optgroup key={schoolIndex} label={school.school}>
                                                            {school.programs.map((program, programIndex) => (
                                                                <option key={programIndex} value={program}>
                                                                    {program}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                                    Last Qualification *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="education"
                                                    value={formData.education}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                    placeholder="e.g., 12th, B.Com, Diploma"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                                Additional Message
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={4}
                                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                                placeholder="Tell us about your academic goals..."
                                            ></textarea>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <Shield className="w-4 h-4 text-blue-600" />
                                                <span>Your information is secure and encrypted</span>
                                            </div>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-8 py-4 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Clock className="w-5 h-5 mr-2 animate-spin" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Application
                                                        <GraduationCap className="w-5 h-5 ml-2" />
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Payment & Process Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 text-blue-900 font-bold text-xs uppercase tracking-wider mb-8">
                                <CreditCard className="w-4 h-4" />
                                <span>Payment & Process</span>
                                <CreditCard className="w-4 h-4" />
                            </div>
                            <h2 className="font-display font-bold text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                                Simple & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Secure Process</span>
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                Complete your admission with our easy payment options and transparent process
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Shield className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-4">Secure Payment</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Multiple payment options including credit/debit cards, UPI, and bank transfers with 256-bit encryption
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Clock className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-4">Quick Processing</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Application review within 24 hours and instant confirmation upon successful payment
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 text-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900 mb-4">Expert Guidance</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Dedicated admission counselors to guide you through the entire process
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AdmissionPage;
