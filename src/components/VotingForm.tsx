import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface VoteData {
  voterName: string;
  voterEmail: string;
  voterPhone: string;
  voterContactNumber: string;
  voterCountry: string;
  collegeName: string;
  courseName: string;
  semester: string;
  yearOfStudy: string;
  candidate: string;
  supportReason: string;
  agreeTerms: boolean;
}

const africanCountries = [
  "Liberia", "Nigeria", "Ghana", "Kenya", "South Africa", "Ethiopia", "Egypt", "Tanzania",
  "DR Congo", "South Sudan", "Uganda", "Algeria", "Sudan", "Morocco", "Angola", "Mozambique",
  "Cameroon", "Ivory Coast", "Madagascar", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia",
  "Zimbabwe", "Senegal", "Chad", "Somalia", "Guinea", "Rwanda", "Benin", "Burundi", "Tunisia",
  "Sierra Leone", "Togo", "Libya", "Congo", "Central African Republic", "Mauritania", "Eritrea",
  "Namibia", "Gambia", "Botswana", "Gabon", "Lesotho", "Guinea-Bissau", "Equatorial Guinea",
  "Mauritius", "Eswatini", "Djibouti", "Comoros", "Cabo Verde", "Seychelles"
];

const courses = [
  "MBBS (Medicine)", "Engineering", "MBA", "BBA", "Computer Science / IT", "Nursing", "Pharmacy",
  "Dentistry", "Law", "Arts & Humanities", "Pure Science", "Commerce", "Agriculture", "Education", "Other"
];

const semesters = [
  "1st Semester", "2nd Semester", "3rd Semester", "4th Semester", "5th Semester", "6th Semester",
  "7th Semester", "8th Semester", "Final Year", "Completed"
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Final Year"];

const VotingForm = () => {
  const [formData, setFormData] = useState<VoteData>({
    voterName: '',
    voterEmail: '',
    voterPhone: '',
    voterContactNumber: '',
    voterCountry: '',
    collegeName: '',
    courseName: '',
    semester: '',
    yearOfStudy: '',
    candidate: 'alan',
    supportReason: '',
    agreeTerms: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          voterName: '',
          voterEmail: '',
          voterPhone: '',
          voterContactNumber: '',
          voterCountry: '',
          collegeName: '',
          courseName: '',
          semester: '',
          yearOfStudy: '',
          candidate: 'alan',
          supportReason: '',
          agreeTerms: false
        });
      } else {
        alert('Error submitting vote. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting vote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Vote for Alan Daylee Yealu</h1>
          <p className="text-2xl text-blue-200">Liberian Presidential Election</p>
          <p className="text-lg text-blue-300 mt-4">Empowering Africa Through Education, Healthcare & Leadership</p>
        </div>

        {/* About Candidate */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">🎓</div>
            <h3 className="text-xl font-bold mb-2">Education Advocate</h3>
            <p className="text-blue-200">Promoting access to quality education for all Africans</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2">Healthcare Champion</h3>
            <p className="text-blue-200">Co-Founder, VitalCare Initiative for better healthcare</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h3 className="text-xl font-bold mb-2">African Leadership</h3>
            <p className="text-blue-200">Director for African Affairs at Global Pass Career</p>
          </div>
        </div>

        {/* Voting Form */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-900">
            {showSuccess ? (
              <div className="text-center py-12">
                <div className="text-8xl mb-6">✅</div>
                <h2 className="text-4xl font-bold text-green-600 mb-4">Vote Submitted Successfully!</h2>
                <p className="text-xl text-gray-600 mb-8">Thank you for your vote. Your support matters!</p>
                <Button
                  onClick={() => setShowSuccess(false)}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 text-lg rounded-xl"
                >
                  Submit Another Vote
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Phase 1: Personal Information */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                    <span className="mr-2">👤</span> Phase 1: Personal Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.voterName}
                        onChange={(e) => setFormData({ ...formData, voterName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.voterEmail}
                        onChange={(e) => setFormData({ ...formData, voterEmail: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.voterPhone}
                        onChange={(e) => setFormData({ ...formData, voterPhone: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+231 XXX XXX XXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.voterContactNumber}
                        onChange={(e) => setFormData({ ...formData, voterContactNumber: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="+231 XXX XXX XXX (WhatsApp)"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Country (African Countries Only) *</label>
                      <select
                        required
                        value={formData.voterCountry}
                        onChange={(e) => setFormData({ ...formData, voterCountry: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select your country</option>
                        {africanCountries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Phase 2: Education Information */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                    <span className="mr-2">🎓</span> Phase 2: Education Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">College/University Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.collegeName}
                        onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter your college/university name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Course/Program *</label>
                      <select
                        required
                        value={formData.courseName}
                        onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select your course</option>
                        {courses.map(course => (
                          <option key={course} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Current Semester *</label>
                      <select
                        required
                        value={formData.semester}
                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select semester</option>
                        {semesters.map(sem => (
                          <option key={sem} value={sem}>{sem}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                      <select
                        required
                        value={formData.yearOfStudy}
                        onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="">Select year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Candidate Selection */}
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-4 flex items-center">
                    <span className="mr-2">🗳️</span> Candidate Selection
                  </h3>
                  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="candidate"
                        value="alan"
                        checked={formData.candidate === 'alan'}
                        onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                        className="w-5 h-5 text-indigo-600"
                      />
                      <div className="ml-4">
                        <h4 className="text-xl font-bold text-indigo-900">Alan Daylee Yealu</h4>
                        <p className="text-indigo-700">Liberian Presidential Candidate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why do you support this candidate?</label>
                  <textarea
                    value={formData.supportReason}
                    onChange={(e) => setFormData({ ...formData, supportReason: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="Share your reason for supporting Alan Daylee Yealu"
                  />
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 mt-1"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    I agree to the terms and conditions and confirm that this vote is genuine and the information provided is accurate.
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 text-lg rounded-xl"
                >
                  {isSubmitting ? 'Submitting...' : '🗳️ Submit Vote'}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-200">
          <h3 className="text-xl font-bold mb-2">Global Pass Career Consultancy</h3>
          <p className="mb-4">Empowering African Students for Global Success</p>
          <p className="text-sm">© 2024 Global Pass Career Consultancy. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default VotingForm;
