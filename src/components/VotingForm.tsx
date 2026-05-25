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
      
      <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f8f9fa' }}>
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="fas fa-graduation-cap me-2"></i>Global Pass Career
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#vision">Vision</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#vote">Vote</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="container">
            <div className="row align-items-center" style={{ minHeight: '85vh', paddingTop: '60px' }}>
              <div className="col-lg-6">
                <div className="hero-content">
                  <h1 className="display-3 fw-bold text-white mb-4 fade-in">
                    Vote for Alan Daylee Yealu
                  </h1>
                  <h2 className="h2 text-warning mb-4 slide-up">
                    <i className="fas fa-star me-2"></i>For Liberian President
                  </h2>
                  <p className="lead text-white mb-4">
                    A Liberian youth leader, education advocate, and organizational strategist dedicated to empowering young people across Africa through leadership, innovation, and access to opportunities.
                  </p>
                  <div className="d-flex gap-3">
                    <a href="#vote" className="btn btn-warning btn-lg">
                      <i className="fas fa-vote-yea me-2"></i>Vote Now
                    </a>
                    <a href="#about" className="btn btn-outline-light btn-lg">
                      Learn More
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="hero-image text-center">
                  <div className="candidate-profile rounded-circle overflow-hidden shadow-lg mx-auto" style={{ width: '400px', height: '400px', border: '8px solid #d4af37' }}>
                    <img 
                      src="/african/alan-yealu.jpg" 
                      alt="Alan Daylee Yealu - African Presidential Candidate" 
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.parentElement!.innerHTML = '<div class="w-100 h-100 bg-gradient-to-br from-purple-600 to-blue-600 d-flex align-items-center justify-content-center"><i class="fas fa-user-tie text-white" style="font-size: 150px"></i></div>';
                      }}
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="fw-bold text-white">Alan Daylee Yealu</h3>
                    <p className="text-warning">African Presidential Candidate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-3">
                <h2 className="display-5 fw-bold">About Alan Daylee Yealu</h2>
                <p className="lead text-muted mb-2">A Leader for Africa's Future</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-graduation-cap fa-3x text-primary"></i>
                    </div>
                    <h4 className="fw-bold text-primary mb-3">Education Advocate</h4>
                    <p className="text-muted">Passionate about transforming education systems across Africa to ensure every child has access to quality learning opportunities.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-heartbeat fa-3x text-success"></i>
                    </div>
                    <h4 className="fw-bold text-success mb-3">Co-Founder, VitalCare Initiative</h4>
                    <p className="text-muted">An organization established to contribute to the development and improvement of Liberia's health sector, ensuring better healthcare access for all citizens.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-globe-africa fa-3x text-warning"></i>
                    </div>
                    <h4 className="fw-bold text-warning mb-3">Director for African Affairs</h4>
                    <p className="text-muted">At Global Pass Career Consultancy, supporting and guiding African students seeking international educational and career opportunities.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-12">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="fw-bold text-primary mb-3">Leadership Experience</h4>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i>Vice President, Liberian International Students Alliance (LISA)</li>
                      <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i>Technical Advisor, The Changers Liberia (since 2019)</li>
                      <li className="list-group-item"><i className="fas fa-check-circle text-success me-2"></i>Speaker on women empowerment, financial security, and youth advancement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section id="vision" className="py-3">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center mb-3">
                <h2 className="display-5 fw-bold">Our Vision for Africa</h2>
                <p className="lead text-muted mb-2">Building a Brighter Future Together</p>
              </div>
            </div>
            <div className="row g-4">
              <div className="col-lg-3">
                <div className="card h-100 shadow-sm program-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-graduation-cap fa-3x text-primary"></i>
                    </div>
                    <h4 className="fw-bold text-primary mb-3">Education for All</h4>
                    <p className="text-muted">Ensuring every African child has access to quality education and opportunities for growth.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card h-100 shadow-sm program-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-lightbulb fa-3x text-warning"></i>
                    </div>
                    <h4 className="fw-bold text-warning mb-3">Innovation</h4>
                    <p className="text-muted">Promoting technological innovation and entrepreneurship across the continent.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card h-100 shadow-sm program-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-crown fa-3x text-success"></i>
                    </div>
                    <h4 className="fw-bold text-success mb-3">Leadership</h4>
                    <p className="text-muted">Developing the next generation of African leaders who will drive positive change.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="card h-100 shadow-sm program-card">
                  <div className="card-body text-center p-4">
                    <div className="mb-3">
                      <i className="fas fa-hand-holding-heart fa-3x text-danger"></i>
                    </div>
                    <h4 className="fw-bold text-danger mb-3">Healthcare</h4>
                    <p className="text-muted">Improving healthcare systems and access to medical services for all Africans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Voting Form */}
        <section id="vote" className="py-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-lg">
                  <div className="card-body p-4">
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
