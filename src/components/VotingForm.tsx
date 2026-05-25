import { useState } from 'react';
import './voting.css';

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
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      
      <div>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="/">
              <i className="fas fa-graduation-cap me-2"></i>Global Pass Career
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#vision">Vision</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section text-center py-5">
          <div className="container hero-content">
            <h1 className="display-3 fw-bold mb-3">Vote for Alan Daylee Yealu</h1>
            <h2 className="h3 mb-4">African Presidential Election</h2>
            <p className="lead text-white-50 mb-4">Empowering Africa Through Education, Healthcare & Leadership</p>
          </div>
        </section>

        {/* Voting Form */}
        <section className="py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-lg">
                  <div className="card-body p-5">
                    {showSuccess ? (
                      <div className="text-center py-5">
                        <div className="mb-4">
                          <i className="fas fa-check-circle text-success" style={{ fontSize: '5rem' }}></i>
                        </div>
                        <h2 className="fw-bold text-success mb-3">Vote Submitted Successfully!</h2>
                        <p className="mb-4">Thank you for your vote. Your support matters!</p>
                        <button className="btn btn-primary" onClick={() => setShowSuccess(false)}>
                          Submit Another Vote
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit}>
                        {/* Phase 1: Personal Information */}
                        <h5 className="text-primary mb-4 fw-bold">
                          <i className="fas fa-user me-2"></i>Phase 1: Personal Information
                        </h5>
                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <label htmlFor="voterName" className="form-label">Full Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="voterName"
                              required
                              value={formData.voterName}
                              onChange={(e) => setFormData({ ...formData, voterName: e.target.value })}
                              placeholder="Enter your full name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="voterEmail" className="form-label">Email Address *</label>
                            <input
                              type="email"
                              className="form-control"
                              id="voterEmail"
                              required
                              value={formData.voterEmail}
                              onChange={(e) => setFormData({ ...formData, voterEmail: e.target.value })}
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="voterPhone" className="form-label">Phone Number *</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="voterPhone"
                              required
                              value={formData.voterPhone}
                              onChange={(e) => setFormData({ ...formData, voterPhone: e.target.value })}
                              placeholder="+231 XXX XXX XXX"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="voterContactNumber" className="form-label">Contact Number (WhatsApp) *</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="voterContactNumber"
                              required
                              value={formData.voterContactNumber}
                              onChange={(e) => setFormData({ ...formData, voterContactNumber: e.target.value })}
                              placeholder="+231 XXX XXX XXX (WhatsApp)"
                            />
                          </div>
                          <div className="col-12">
                            <label htmlFor="voterCountry" className="form-label">Country (African Countries Only) *</label>
                            <select
                              className="form-select"
                              id="voterCountry"
                              required
                              value={formData.voterCountry}
                              onChange={(e) => setFormData({ ...formData, voterCountry: e.target.value })}
                            >
                              <option value="">Select your country</option>
                              {africanCountries.map(country => (
                                <option key={country} value={country}>{country}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Phase 2: Education Information */}
                        <h5 className="text-primary mb-4 mt-5 fw-bold">
                          <i className="fas fa-graduation-cap me-2"></i>Phase 2: Education Information
                        </h5>
                        <div className="row g-3 mb-4">
                          <div className="col-md-6">
                            <label htmlFor="collegeName" className="form-label">College/University Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              id="collegeName"
                              required
                              value={formData.collegeName}
                              onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                              placeholder="Enter your college/university name"
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="courseName" className="form-label">Course/Program *</label>
                            <select
                              className="form-select"
                              id="courseName"
                              required
                              value={formData.courseName}
                              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                            >
                              <option value="">Select your course</option>
                              {courses.map(course => (
                                <option key={course} value={course}>{course}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="semester" className="form-label">Current Semester *</label>
                            <select
                              className="form-select"
                              id="semester"
                              required
                              value={formData.semester}
                              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                            >
                              <option value="">Select semester</option>
                              {semesters.map(sem => (
                                <option key={sem} value={sem}>{sem}</option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="yearOfStudy" className="form-label">Year of Study *</label>
                            <select
                              className="form-select"
                              id="yearOfStudy"
                              required
                              value={formData.yearOfStudy}
                              onChange={(e) => setFormData({ ...formData, yearOfStudy: e.target.value })}
                            >
                              <option value="">Select year</option>
                              {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Candidate Selection */}
                        <h5 className="text-primary mb-4 fw-bold">
                          <i className="fas fa-vote-yea me-2"></i>Candidate Selection
                        </h5>
                        <div className="mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="candidate"
                              id="candidateAlan"
                              value="alan"
                              checked={formData.candidate === 'alan'}
                              onChange={(e) => setFormData({ ...formData, candidate: e.target.value })}
                              required
                            />
                            <label className="form-check-label" htmlFor="candidateAlan">
                              <strong>Alan Daylee Yealu</strong> - Liberian Presidential Candidate
                            </label>
                          </div>
                        </div>

                        {/* Support Reason */}
                        <div className="mb-4">
                          <label htmlFor="supportReason" className="form-label">Why do you support this candidate?</label>
                          <textarea
                            className="form-control"
                            id="supportReason"
                            rows="3"
                            value={formData.supportReason}
                            onChange={(e) => setFormData({ ...formData, supportReason: e.target.value })}
                            placeholder="Share your reason for supporting Alan Daylee Yealu"
                          ></textarea>
                        </div>

                        {/* Terms Agreement */}
                        <div className="mb-4">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="agreeTerms"
                              required
                              checked={formData.agreeTerms}
                              onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="agreeTerms">
                              I agree to the terms and conditions and confirm that this vote is genuine and the information provided is accurate.
                            </label>
                          </div>
                        </div>

                        <div className="text-center">
                          <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
                            {isSubmitting ? 'Submitting...' : <><i className="fas fa-vote-yea me-2"></i>Submit Vote</>}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h5 className="mb-3">Global Pass Career Consultancy</h5>
                <p className="mb-3">Empowering African Students for Global Success</p>
                <div className="mb-3">
                  <a href="#" className="text-white me-3"><i className="fab fa-facebook fa-2x"></i></a>
                  <a href="#" className="text-white me-3"><i className="fab fa-twitter fa-2x"></i></a>
                  <a href="#" className="text-white me-3"><i className="fab fa-instagram fa-2x"></i></a>
                  <a href="#" className="text-white"><i className="fab fa-linkedin fa-2x"></i></a>
                </div>
                <p className="small text-white-50">&copy; 2024 Global Pass Career Consultancy. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default VotingForm;
