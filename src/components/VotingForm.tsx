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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-4xl font-bold text-center mb-2 text-indigo-900">Vote for Alan Daylee Yealu</h1>
          <p className="text-center text-gray-600 mb-8">African Presidential Election</p>

          {showSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <div className="text-green-600 text-6xl mb-4">✓</div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Vote Submitted Successfully!</h2>
              <p className="text-green-700 mb-6">Thank you for your vote. Your support matters!</p>
              <Button onClick={() => setShowSuccess(false)} className="bg-green-600 hover:bg-green-700">
                Submit Another Vote
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.voterPhone}
                    onChange={(e) => setFormData({ ...formData, voterPhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    required
                    value={formData.voterCountry}
                    onChange={(e) => setFormData({ ...formData, voterCountry: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select country</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">College/University *</label>
                  <input
                    type="text"
                    required
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your college name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Course *</label>
                  <input
                    type="text"
                    required
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your course"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Semester *</label>
                  <select
                    required
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study *</label>
                  <input
                    type="number"
                    required
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter year (e.g., 2024)"
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Select Candidate *</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.candidate === 'alan' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200'}`} onClick={() => setFormData({ ...formData, candidate: 'alan' })}>
                    <div className="flex items-center">
                      <input type="radio" name="candidate" value="alan" checked={formData.candidate === 'alan'} onChange={(e) => setFormData({ ...formData, candidate: e.target.value })} className="mr-3" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">Alan Daylee Yealu</h3>
                        <p className="text-sm text-gray-600">Visionary Leader</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Why do you support this candidate?</label>
                <textarea
                  value={formData.supportReason}
                  onChange={(e) => setFormData({ ...formData, supportReason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={4}
                  placeholder="Share your reason..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  I agree to the terms and conditions and confirm that the information provided is accurate.
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 text-lg rounded-xl"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Vote'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotingForm;
