import { useState, useEffect } from 'react';
import './crm.css';

interface Vote {
  id: string;
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
  timestamp: string;
}

const VotingCRM = () => {
  const [votes, setVotes] = useState<Vote[]>([]);
  const [filteredVotes, setFilteredVotes] = useState<Vote[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedVote, setSelectedVote] = useState<Vote | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadVotes();
    // Auto-refresh every 5 seconds
    const interval = setInterval(loadVotes, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadVotes = async () => {
    try {
      const response = await fetch('/api/votes');
      if (response.ok) {
        const data = await response.json();
        setVotes(data || []);
        setFilteredVotes(data || []);
      }
    } catch (error) {
      console.error('Error loading votes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = votes;

    if (searchTerm) {
      filtered = filtered.filter(vote =>
        vote.voterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.voterEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vote.voterPhone.includes(searchTerm)
      );
    }

    if (countryFilter) {
      filtered = filtered.filter(vote => vote.voterCountry === countryFilter);
    }

    setFilteredVotes(filtered);
    setCurrentPage(1);
  }, [searchTerm, countryFilter, votes]);

  const handleDelete = async (voteId: string) => {
    if (confirm('Are you sure you want to delete this vote?')) {
      try {
        const response = await fetch('/api/votes', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: voteId })
        });

        if (response.ok) {
          setVotes(votes.filter(v => v.id !== voteId));
          alert('Vote deleted successfully');
        }
      } catch (error) {
        console.error('Error deleting vote:', error);
        alert('Error deleting vote');
      }
    }
  };

  const handleViewDetails = (vote: Vote) => {
    setSelectedVote(vote);
    setShowModal(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Phone', 'WhatsApp', 'Country', 'College', 'Course', 'Semester', 'Year', 'Date'],
      ...filteredVotes.map(v => [
        v.id,
        v.voterName,
        v.voterEmail,
        v.voterPhone,
        v.voterContactNumber,
        v.voterCountry,
        v.collegeName,
        v.courseName,
        v.semester,
        v.yearOfStudy,
        new Date(v.timestamp).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'votes.csv';
    a.click();
  };

  const countries = [...new Set(votes.map(v => v.voterCountry))];
  const totalVotes = votes.length;
  const todayVotes = votes.filter(v => new Date(v.timestamp).toDateString() === new Date().toDateString()).length;
  const countryCounts = votes.reduce((acc, vote) => {
    acc[vote.voterCountry] = (acc[vote.voterCountry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topCountry = Object.entries(countryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

  // Pagination
  const totalPages = Math.ceil(filteredVotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVotes = filteredVotes.slice(startIndex, endIndex);

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
      
      <div
        className="crm-dashboard"
        style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: '#f8f9fa', minHeight: '100vh', margin: 0, padding: 0 }}
      >
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid px-4">
            <a className="navbar-brand fw-bold" href="/">
              <i className="fas fa-graduation-cap me-2"></i>Global Pass Career CRM
            </a>
            <span className="navbar-text text-white">
              <i className="fas fa-user-shield me-2"></i>Admin Dashboard
            </span>
          </div>
        </nav>

        <div style={{ paddingTop: '30px' }}>
          {/* Header */}
          <div className="d-flex justify-content-between flex-wrap align-items-center mb-4 px-4">
            <h1 className="h2">Liberian Presidential Election CRM</h1>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={loadVotes}>
                <i className="fas fa-sync-alt me-1"></i>Refresh
              </button>
              <button type="button" className="btn btn-sm btn-primary" onClick={handleExport}>
                <i className="fas fa-file-excel me-1"></i>Export
              </button>
            </div>
          </div>

              {/* Live Vote Counter */}
          <div className="row mb-4 mx-0">
            <div className="col-12 px-4">
              <div className="card bg-gradient-primary text-white shadow-lg">
                <div className="card-body text-center py-4">
                  <h4 className="mb-2">
                    <i className="fas fa-vote-yea me-2"></i>Live Vote Count
                  </h4>
                  <div className="display-1 fw-bold mb-2">{totalVotes}</div>
                  <p className="mb-0">Total Votes for Alan Daylee Yealu</p>
                  <div className="mt-3">
                    <span className="badge bg-light text-dark">
                      <i className="fas fa-clock me-1"></i>Auto-refreshing every 5 seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row mb-4 mx-0 px-4">
            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-primary shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                        Total Votes
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{totalVotes}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-vote-yea fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-success shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                        Today's Votes
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{todayVotes}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-calendar-day fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-info shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                        Countries Represented
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{countries.length}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-globe-africa fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 mb-4">
              <div className="card border-left-warning shadow h-100 py-2">
                <div className="card-body">
                  <div className="row no-gutters align-items-center">
                    <div className="col mr-2">
                      <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                        Top Country
                      </div>
                      <div className="h5 mb-0 font-weight-bold text-gray-800">{topCountry}</div>
                    </div>
                    <div className="col-auto">
                      <i className="fas fa-trophy fa-2x text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Votes Table */}
          <div className="px-4">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex justify-content-between align-items-center">
                <h6 className="m-0 font-weight-bold text-primary">
                  <i className="fas fa-vote-yea me-2"></i>Voter Registrations
                </h6>
                <div className="d-flex gap-2">
                  <input
                    type="text"
                    placeholder="Search voters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control form-control-sm"
                    id="searchInput"
                    style={{ width: '200px' }}
                  />
                  <select
                    value={countryFilter}
                    onChange={(e) => setCountryFilter(e.target.value)}
                    className="form-select form-select-sm"
                    id="filterCountry"
                    style={{ width: '150px' }}
                  >
                    <option value="">All Countries</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-bordered" id="votesTable" width="100%" cellSpacing="0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>WhatsApp</th>
                        <th>Country</th>
                        <th>College</th>
                        <th>Course</th>
                        <th>Semester</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody id="votesTableBody">
                      {isLoading ? (
                        <tr>
                          <td colSpan={11} className="text-center py-12 text-gray-500">
                            Loading votes...
                          </td>
                        </tr>
                      ) : currentVotes.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="text-center py-12 text-gray-500">
                            No votes found
                          </td>
                        </tr>
                      ) : (
                        currentVotes.map((vote) => (
                          <tr key={vote.id}>
                            <td>{vote.id.slice(-6)}</td>
                            <td>{vote.voterName}</td>
                            <td>{vote.voterEmail}</td>
                            <td>{vote.voterPhone}</td>
                            <td>{vote.voterContactNumber}</td>
                            <td>{vote.voterCountry}</td>
                            <td>{vote.collegeName}</td>
                            <td>{vote.courseName}</td>
                            <td>{vote.semester}</td>
                            <td>{new Date(vote.timestamp).toLocaleDateString()}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary me-2 action-btn"
                                onClick={() => handleViewDetails(vote)}
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger action-btn"
                                onClick={() => handleDelete(vote.id)}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav aria-label="Page navigation" className="mt-3">
                    <ul className="pagination justify-content-center" id="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages)].map((_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>

          {/* Analytics Section */}
          <div className="row px-4">
            <div className="col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-chart-pie me-2"></i>Program Distribution
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center text-gray-500">
                    Chart will be rendered here
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    <i className="fas fa-chart-bar me-2"></i>Country Distribution
                  </h6>
                </div>
                <div className="card-body">
                  <div className="text-center text-gray-500">
                    Chart will be rendered here
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Details Modal */}
        {showModal && selectedVote && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-user-graduate me-2"></i>Student Details
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body" id="studentDetails">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>Name:</strong> {selectedVote.voterName}</p>
                      <p><strong>Email:</strong> {selectedVote.voterEmail}</p>
                      <p><strong>Phone:</strong> {selectedVote.voterPhone}</p>
                      <p><strong>WhatsApp:</strong> {selectedVote.voterContactNumber}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Country:</strong> {selectedVote.voterCountry}</p>
                      <p><strong>College:</strong> {selectedVote.collegeName}</p>
                      <p><strong>Course:</strong> {selectedVote.courseName}</p>
                      <p><strong>Semester:</strong> {selectedVote.semester}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p><strong>Support Reason:</strong> {selectedVote.supportReason || 'Not provided'}</p>
                    <p><strong>Voted On:</strong> {new Date(selectedVote.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => window.location.href = `mailto:${selectedVote.voterEmail}`}>
                    <i className="fas fa-envelope me-2"></i>Contact Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VotingCRM;
