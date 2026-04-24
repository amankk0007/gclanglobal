import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import CashfreePayment from "../../components/CashfreePayment";
import { useToast } from "@/hooks/use-toast";
import { dataService } from "@/services/dataService";
import { CheckCircle, GraduationCap, Users, BookOpen, Award, Building2, CreditCard, Shield, Clock, FileText, ArrowRight, ChevronRight, User, Mail, Phone, Calendar, DollarSign, Lock } from "lucide-react";

const LamrinPage = () => {
    const { toast } = useToast();
    const [searchParams] = useSearchParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Personal Information
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        
        // Academic Information
        lastQualification: "",
        percentage: "",
        yearOfPassing: "",
        school: "",
        board: "",
        
        // Course Information
        selectedCourse: "",
        selectedSchool: "Lamrin Tech Skills University",
        programType: "",
        
        // Additional Information
        message: "",
        agreeTerms: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [paymentStep, setPaymentStep] = useState(false);

    // Handle payment success from URL parameters
    useEffect(() => {
        const paymentStatus = searchParams.get('payment');
        if (paymentStatus === 'success') {
            setCurrentStep(6); // Move to confirmation step
            toast({
                title: "Payment Successful!",
                description: "Your payment has been processed successfully.",
            });
            // Clean up URL
            window.history.replaceState({}, '', '/apply/lamrin');
        }
    }, [searchParams, toast]);

    const courses = [
        {
            school: "Lamrin Tech Skills University",
            programs: [
                "B.Tech Computer Science Engineering",
                "B.Tech Information Technology",
                "B.Tech Electronics & Communication",
                "B.Tech Mechanical Engineering",
                "B.Tech Civil Engineering",
                "B.Tech Electrical Engineering",
                "B.Tech Data Science & AI",
                "B.Tech Cyber Security",
                "M.Tech Computer Science",
                "M.Tech Electronics & Communication"
            ]
        }
    ];

    const applicationSteps = [
        { id: 1, title: "Personal Information", icon: User, description: "Enter your basic personal details" },
        { id: 2, title: "Academic Details", icon: BookOpen, description: "Provide your educational background" },
        { id: 3, title: "Course Selection", icon: GraduationCap, description: "Choose your desired program" },
        { id: 4, title: "Review & Submit", icon: FileText, description: "Review your application and submit" },
        { id: 5, title: "Payment", icon: CreditCard, description: "Complete payment to confirm admission" },
        { id: 6, title: "Confirmation", icon: CheckCircle, description: "Application submitted successfully" }
    ];

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : value 
        }));
    };

    const handleNext = () => {
        if (currentStep < 6) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // Save application data using dataService
            const applicationData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                education: formData.lastQualification,
                course: formData.selectedCourse,
                destination: formData.country,
                message: formData.message,
                subject: "New Application Submission - Lamrin Tech Skills University",
                formData: formData // Include full form data for reference
            };

            // Save as both apply form and contact form
            await Promise.all([
                dataService.saveApplyForm({
                    ...applicationData,
                    education: applicationData.education || "",
                    course: applicationData.course || "",
                    destination: applicationData.destination || "",
                    message: applicationData.message || ""
                }),
                dataService.saveContactForm({
                    name: applicationData.name,
                    email: applicationData.email,
                    phone: applicationData.phone,
                    subject: applicationData.subject || "New Application Submission - Lamrin Tech Skills University",
                    message: applicationData.message || "Application submitted via website"
                })
            ]);
            
            setCurrentStep(5); // Move to payment step
            
            toast({
                title: "Application Submitted!",
                description: "Your application has been received and will be reviewed shortly.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit application. Please try again.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePaymentSuccess = () => {
        setCurrentStep(6); // Move to confirmation
    };

    const handlePaymentFailure = (error: string) => {
        console.error('Payment failed:', error);
        // Handle payment failure (show message, etc.)
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return formData.firstName && formData.lastName && formData.email && formData.phone;
            case 2:
                return formData.lastQualification && formData.percentage && formData.yearOfPassing;
            case 3:
                return formData.selectedCourse && formData.selectedSchool;
            case 4:
                return formData.agreeTerms;
            default:
                return true;
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
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
                                <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Gender</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    placeholder="Enter your full address"
                                />
                            </div>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        placeholder="Enter your city"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        placeholder="Enter your state"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">PIN Code</label>
                                    <input
                                        type="text"
                                        name="pinCode"
                                        value={formData.pinCode}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                        placeholder="Enter PIN code"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Country</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select country</option>
                                    <option value="india">India</option>
                                    <option value="usa">United States</option>
                                    <option value="canada">Canada</option>
                                    <option value="uk">United Kingdom</option>
                                    <option value="australia">Australia</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Academic Details</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Last Qualification *</label>
                                <select
                                    name="lastQualification"
                                    value={formData.lastQualification}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select qualification</option>
                                    <option value="10th">10th</option>
                                    <option value="12th">12th</option>
                                    <option value="diploma">Diploma</option>
                                    <option value="bachelor">Bachelor's</option>
                                    <option value="master">Master's</option>
                                    <option value="phd">PhD</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Percentage *</label>
                                <input
                                    type="number"
                                    name="percentage"
                                    value={formData.percentage}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    placeholder="Enter percentage"
                                    min="0"
                                    max="100"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Year of Passing *</label>
                                <input
                                    type="number"
                                    name="yearOfPassing"
                                    value={formData.yearOfPassing}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    placeholder="Enter passing year"
                                    min="1950"
                                    max={new Date().getFullYear()}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">School/College *</label>
                                <input
                                    type="text"
                                    name="school"
                                    value={formData.school}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                    placeholder="Enter your school name"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Board</label>
                            <select
                                name="board"
                                value={formData.board}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                            >
                                <option value="">Select board</option>
                                <option value="cbse">CBSE</option>
                                <option value="state">State Board</option>
                                <option value="icse">ICSE</option>
                                <option value="ib">International Baccalaureate</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Course Selection</h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Select School *</label>
                                <select
                                    name="selectedSchool"
                                    value={formData.selectedSchool}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select a school</option>
                                    {courses.map((school, index) => (
                                        <option key={index} value={school.school}>
                                            {school.school}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Select Course *</label>
                                <select
                                    name="selectedCourse"
                                    value={formData.selectedCourse}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select a course</option>
                                    {courses.find(school => school.school === formData.selectedSchool)?.programs.map((program, index) => (
                                        <option key={index} value={program}>
                                            {program}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Program Type</label>
                                <select
                                    name="programType"
                                    value={formData.programType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                                >
                                    <option value="">Select program type</option>
                                    <option value="regular">Regular</option>
                                    <option value="distance">Distance Learning</option>
                                    <option value="online">Online</option>
                                    <option value="parttime">Part Time</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Review & Submit</h3>
                        <div className="bg-blue-50 rounded-2xl p-8 border border-blue-200">
                            <h4 className="font-bold text-lg text-slate-900 mb-4">Application Summary</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Name:</span>
                                    <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Email:</span>
                                    <span className="font-medium text-slate-900">{formData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Phone:</span>
                                    <span className="font-medium text-slate-900">{formData.phone}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Course:</span>
                                    <span className="font-medium text-slate-900">{formData.selectedCourse}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">School:</span>
                                    <span className="font-medium text-slate-900">{formData.selectedSchool}</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <label className="flex items-start gap-3 text-sm text-slate-700">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                        required
                                        className="mt-1 w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-2 focus:ring-blue-200"
                                    />
                                    <span className="ml-2">
                                        I agree to the <span className="font-medium">Terms & Conditions</span> and <span className="font-medium">Privacy Policy</span> *
                                    </span>
                                </label>
                            </div>
                            <div className="flex justify-between">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    className="border-2 border-slate-300 text-slate-600 hover:bg-slate-50"
                                >
                                    Previous
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isStepValid() || isSubmitting}
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
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-8">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <CreditCard className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-4">Complete Payment</h3>
                            <p className="text-lg text-slate-600 mb-8">
                                Please complete the payment to confirm your admission
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                                <h4 className="font-bold text-xl text-slate-900 mb-6">Application Fee</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Course:</span>
                                        <span className="font-medium text-slate-900">{formData.selectedCourse}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-600">Amount:</span>
                                        <span className="font-bold text-2xl text-blue-600">₹25,000</span>
                                    </div>
                                </div>
                                <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                                    <p className="text-sm text-slate-600 mb-2">
                                        <Lock className="w-4 h-4 inline mr-2 text-blue-600" />
                                        Secure Payment Gateway
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                id="card"
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <label htmlFor="card" className="flex items-center gap-3 text-slate-700">
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                <span>Credit/Debit Card</span>
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                id="upi"
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <label htmlFor="upi" className="flex items-center gap-3 text-slate-700">
                                                <DollarSign className="w-4 h-4 mr-2" />
                                                <span>UPI</span>
                                            </label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                id="netbanking"
                                                className="w-4 h-4 text-blue-600"
                                            />
                                            <label htmlFor="netbanking" className="flex items-center gap-3 text-slate-700">
                                                <Building2 className="w-4 h-4 mr-2" />
                                                <span>Net Banking</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                                <h4 className="font-bold text-xl text-slate-900 mb-6">Payment Details</h4>
                                <CashfreePayment
                                    formData={formData}
                                    onSuccess={handlePaymentSuccess}
                                    onFailure={handlePaymentFailure}
                                    amount={25000}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted Successfully!</h3>
                        <p className="text-xl text-slate-600 mb-8">
                            Thank you for applying to {formData.selectedSchool}. Your application has been received and is being processed.
                        </p>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto">
                            <h4 className="font-bold text-xl text-slate-900 mb-6">Application Details</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Application ID:</span>
                                    <span className="font-medium text-slate-900">LTSU2026{Math.floor(Math.random() * 10000)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Name:</span>
                                    <span className="font-medium text-slate-900">{formData.firstName} {formData.lastName}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Course:</span>
                                    <span className="font-medium text-slate-900">{formData.selectedCourse}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Email:</span>
                                    <span className="font-medium text-slate-900">{formData.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Phone:</span>
                                    <span className="font-medium text-slate-900">{formData.phone}</span>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-green-50 rounded-xl">
                                <p className="text-sm text-slate-600">
                                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-600" />
                                    You will receive a confirmation email shortly with next steps.
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => window.print()}
                                    className="flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-6 py-3 text-lg font-bold rounded-full transition-all duration-300"
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Print Application
                                </Button>
                                <Button
                                    onClick={() => window.location.href = '/apply/lamrin'}
                                    className="flex-1 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:from-slate-600 hover:via-slate-700 hover:to-slate-800 text-white shadow-2xl hover:shadow-slate-500/25 px-6 py-3 text-lg font-bold rounded-full transition-all duration-300"
                                >
                                    <GraduationCap className="w-5 h-5 mr-2" />
                                    New Application
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
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
                                <FileText className="w-4 h-4" />
                                <span>Complete Application Process</span>
                                <Award className="w-4 h-4" />
                            </div>
                            
                            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
                                Apply to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">
                                    Lamrin Tech Skills University
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                Complete your application in 6 simple steps and secure your admission
                            </p>
                        </div>
                    </div>
                </section>

                {/* Progress Steps */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 mb-6 leading-tight">
                                    Application <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700">Progress</span>
                                </h2>
                                <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                                    Track your application status in real-time
                                </p>
                            </div>

                            {/* Steps Progress */}
                         <div className="relative">
  {/* Desktop Progress Line */}
  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2"></div>

  {/* Mobile and Desktop Steps */}
  <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-2 relative">
    {applicationSteps.map((step, index) => (
      <div key={step.id} className="relative">
        <div
          className={`flex flex-col md:flex-row items-center text-center p-4 md:p-3 rounded-xl border-2 transition-all duration-300 ${
            currentStep === step.id
              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white border-blue-600 shadow-lg"
              : currentStep > step.id
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-white border-slate-200 text-slate-400"
          }`}
        >
          <div
            className={`w-12 h-12 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-3 flex-shrink-0 ${
              currentStep === step.id
                ? "bg-white text-blue-600"
                : currentStep > step.id
                ? "bg-green-600 text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            <step.icon className="w-6 h-6 md:w-5 md:h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-base md:text-sm mb-1 md:mb-0 truncate">{step.title}</h3>
            <p className="text-xs md:text-xs opacity-80 hidden md:block">{step.description}</p>
          </div>

          {currentStep > step.id && (
            <CheckCircle className="w-5 h-5 md:w-4 md:h-4 text-green-600 absolute -top-2 -right-2 md:-top-1 md:-right-1" />
          )}
        </div>
        
        {/* Mobile Progress Line */}
        {index < applicationSteps.length - 1 && (
          <div className="md:hidden absolute top-8 left-1/2 w-0.5 h-8 bg-slate-200 -translate-x-1/2"></div>
        )}
      </div>
    ))}
  </div>
</div>

{/* Step Content */}
<div className="mt-8">{renderStepContent()}</div>

                            {/* Navigation */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                    className="w-full sm:w-auto border-2 border-slate-300 text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </Button>
                                
                                {/* Progress Indicators - Hidden on mobile to save space */}
                                <div className="hidden sm:flex gap-2">
                                    {Array.from({ length: currentStep - 1 }, (_, index) => (
                                        <div key={index} className="w-2 h-2 bg-blue-200 rounded-full"></div>
                                    ))}
                                    <div className={`w-2 h-2 bg-blue-600 rounded-full transition-all duration-300 ${
                                        currentStep === 6 ? 'bg-green-600' : ''
                                    }`}></div>
                                    {Array.from({ length: 6 - currentStep }, (_, index) => (
                                        <div key={index} className="w-2 h-2 bg-slate-200 rounded-full"></div>
                                    ))}
                                </div>
                                
                                <Button
                                    type="button"
                                    onClick={currentStep === 6 ? undefined : handleNext}
                                    disabled={!isStepValid() || isSubmitting}
                                    className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white shadow-2xl hover:shadow-blue-500/25 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                                            {currentStep === 5 ? 'Processing...' : 'Saving...'}
                                        </>
                                    ) : currentStep === 5 ? (
                                        <>
                                            <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            Complete Payment
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </>
                                    ) : currentStep === 6 ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                                            Finish
                                        </>
                                    ) : (
                                        <>
                                            Next Step
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default LamrinPage;
