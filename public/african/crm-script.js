// CRM Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!checkAuth()) {
        window.location.href = 'admin-login.html';
        return;
    }
    
    initializeDashboard();
    loadVoteData();
    initializeEventListeners();
    initializeCharts();
    
    // Add logout functionality
    addLogoutButton();
});

// Check authentication
function checkAuth() {
    const auth = localStorage.getItem('adminAuth');
    return auth === 'true';
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminLoginTime');
        window.location.href = 'admin-login.html';
    }
}

// Add logout button to navbar
function addLogoutButton() {
    const navbar = document.querySelector('.navbar .container-fluid .navbar-nav');
    if (navbar) {
        const logoutLi = document.createElement('li');
        logoutLi.className = 'nav-item';
        logoutLi.innerHTML = `
            <a class="nav-link" href="#" onclick="logout()" style="cursor: pointer;">
                <i class="fas fa-sign-out-alt me-1"></i>Logout
            </a>
        `;
        navbar.appendChild(logoutLi);
    }
}

// Global variables
let votesData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 10;

// Initialize dashboard
function initializeDashboard() {
    updateStatistics();
    populateCountryFilter();
}

// Load vote data from Vercel serverless API
function loadVoteData() {
    console.log('Loading vote data from Vercel API...');
    
    fetch('/api/votes')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched votes data:', data);
            votesData = data || [];
            filteredData = [...votesData];
            displayVotes();
            updateStatistics();
            
            // Update charts with error handling
            try {
                updateCharts();
            } catch (error) {
                console.error('Error updating charts:', error);
            }
        })
        .catch(error => {
            console.error('Error loading votes:', error);
            showEmptyState();
        });
}

// Initialize event listeners
function initializeEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        filterVotes(searchTerm, document.getElementById('filterCountry').value);
    });

    // Country filter
    document.getElementById('filterCountry').addEventListener('change', function(e) {
        const country = e.target.value;
        filterVotes(document.getElementById('searchInput').value.toLowerCase(), country);
    });
}

// Filter votes
function filterVotes(searchTerm, country) {
    filteredData = votesData.filter(vote => {
        const matchesSearch = !searchTerm || 
            vote.voterName.toLowerCase().includes(searchTerm) ||
            vote.voterEmail.toLowerCase().includes(searchTerm) ||
            vote.collegeName.toLowerCase().includes(searchTerm) ||
            vote.voterPhone.includes(searchTerm);
        
        const matchesCountry = !country || vote.voterCountry === country;
        
        return matchesSearch && matchesCountry;
    });
    
    currentPage = 1;
    displayVotes();
}

// Display votes in table
function displayVotes() {
    console.log('Displaying votes...');
    const tbody = document.getElementById('votesTableBody');
    console.log('Table body element:', tbody);
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    
    console.log('Filtered data length:', filteredData.length);
    console.log('Page data length:', pageData.length);

    if (pageData.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="text-center py-4">
                    <div class="empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No votes found</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = pageData.map(vote => `
        <tr>
            <td>${vote.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-circle bg-primary text-white rounded-circle me-2" style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
                        ${vote.voterName.charAt(0).toUpperCase()}
                    </div>
                    ${vote.voterName}
                </div>
            </td>
            <td>${vote.voterEmail}</td>
            <td>${vote.voterPhone}</td>
            <td>${vote.voterContactNumber}</td>
            <td>
                <span class="badge bg-info">${vote.voterCountry}</span>
            </td>
            <td>${vote.collegeName}</td>
            <td>
                <span class="badge bg-secondary">${vote.courseName}</span>
            </td>
            <td>
                <span class="badge bg-primary">${vote.semester}</span>
            </td>
            <td>${formatDate(vote.timestamp)}</td>
            <td>
                <button class="btn btn-sm btn-info action-btn" onclick="viewVoteDetails(${vote.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-success action-btn" onclick="contactVoter('${vote.voterEmail}')" title="Contact">
                    <i class="fas fa-envelope"></i>
                </button>
                <button class="btn btn-sm btn-danger action-btn" onclick="deleteVote(${vote.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    console.log('Table HTML updated');

    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';
    
    // Previous button
    paginationHTML += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHTML += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHTML += `
                <li class="page-item disabled">
                    <a class="page-link" href="#">...</a>
                </li>
            `;
        }
    }
    
    // Next button
    paginationHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>
    `;
    
    pagination.innerHTML = paginationHTML;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        displayVotes();
    }
    return false;
}

// Update statistics
function updateStatistics() {
    console.log('Updating statistics...');
    const totalVotes = votesData.length;
    console.log('Total votes:', totalVotes);
    
    const today = new Date().toDateString();
    const todayVotes = votesData.filter(vote => 
        new Date(vote.timestamp).toDateString() === today
    ).length;
    
    const countries = [...new Set(votesData.map(vote => vote.voterCountry))];
    const totalCountries = countries.length;
    
    // Get top country
    const countryCounts = {};
    votesData.forEach(vote => {
        countryCounts[vote.voterCountry] = (countryCounts[vote.voterCountry] || 0) + 1;
    });
    
    const topCountry = Object.keys(countryCounts).length > 0 
        ? Object.keys(countryCounts).reduce((a, b) => countryCounts[a] > countryCounts[b] ? a : b)
        : '-';
    
    // Update DOM - set all values directly without animation
    console.log('Updating statistics elements...');
    const liveVoteCountElement = document.getElementById('liveVoteCount');
    if (liveVoteCountElement) {
        liveVoteCountElement.textContent = totalVotes;
        console.log('Live vote count set to:', totalVotes);
    }
    
    document.getElementById('totalVotes').textContent = totalVotes;
    document.getElementById('todayVotes').textContent = todayVotes;
    document.getElementById('totalCountries').textContent = totalCountries;
    document.getElementById('topCountry').textContent = topCountry;
    
    console.log('Statistics updated');
}

// Animate number counting
function animateNumber(elementId, targetValue) {
    const element = document.getElementById(elementId);
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const increment = (targetValue - startValue) / (duration / 16);
    let currentValue = startValue;
    
    const timer = setInterval(() => {
        currentValue += increment;
        if ((increment > 0 && currentValue >= targetValue) || (increment < 0 && currentValue <= targetValue)) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentValue);
        }
    }, 16);
}

// Populate country filter
function populateCountryFilter() {
    const countries = [...new Set(votesData.map(vote => vote.voterCountry))];
    const filterSelect = document.getElementById('filterCountry');
    
    // Clear existing options except the first one
    while (filterSelect.children.length > 1) {
        filterSelect.removeChild(filterSelect.lastChild);
    }
    
    countries.forEach(country => {
        if (country) {
            const option = document.createElement('option');
            option.value = country;
            option.textContent = country;
            filterSelect.appendChild(option);
        }
    });
}

// View vote details
function viewVoteDetails(voteId) {
    const vote = votesData.find(v => v.id === voteId);
    if (!vote) return;
    
    const modal = new bootstrap.Modal(document.getElementById('studentModal'));
    const detailsContainer = document.getElementById('studentDetails');
    
    detailsContainer.innerHTML = `
        <div class="row">
            <div class="col-md-6">
                <h6 class="text-primary">Personal Information</h6>
                <p><strong>Name:</strong> ${vote.voterName}</p>
                <p><strong>Email:</strong> ${vote.voterEmail}</p>
                <p><strong>Phone:</strong> ${vote.voterPhone}</p>
                <p><strong>WhatsApp:</strong> ${vote.voterContactNumber}</p>
                <p><strong>Country:</strong> ${vote.voterCountry}</p>
            </div>
            <div class="col-md-6">
                <h6 class="text-primary">Education Information</h6>
                <p><strong>College/University:</strong> ${vote.collegeName}</p>
                <p><strong>Course:</strong> ${vote.courseName}</p>
                <p><strong>Semester:</strong> ${vote.semester}</p>
                <p><strong>Year of Study:</strong> ${vote.yearOfStudy}</p>
            </div>
            <div class="col-12 mt-3">
                <h6 class="text-primary">Vote Information</h6>
                <p><strong>Candidate:</strong> ${vote.candidate}</p>
                ${vote.supportReason ? `<p><strong>Support Reason:</strong> ${vote.supportReason}</p>` : ''}
            </div>
            <div class="col-12 mt-3">
                <h6 class="text-primary">Vote Details</h6>
                <p><strong>Vote Date:</strong> ${formatDate(vote.timestamp)}</p>
                <p><strong>Vote ID:</strong> ${vote.id}</p>
            </div>
        </div>
    `;
    
    modal.show();
}

// Contact voter
function contactVoter(email) {
    window.location.href = `mailto:${email}?subject=Liberian Presidential Election - Thank You for Voting&body=Thank you for voting for Alan Daylee Yealu. Your vote has been recorded successfully.`;
}

// Delete vote
function deleteVote(voteId) {
    if (confirm('Are you sure you want to delete this vote record? This action cannot be undone.')) {
        fetch('/api/votes', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: voteId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                votesData = votesData.filter(v => v.id !== voteId);
                filteredData = filteredData.filter(v => v.id !== voteId);
                
                displayVotes();
                updateStatistics();
                updateCharts();
                populateCountryFilter();
                
                // Show success message
                showNotification('Vote record deleted successfully', 'success');
            } else {
                showNotification('Error deleting vote: ' + (data.error || 'Unknown error'), 'error');
            }
        })
        .catch(error => {
            console.error('Error deleting vote:', error);
            showNotification('Error deleting vote. Please try again.', 'error');
        });
    }
}

// Show empty state
function showEmptyState() {
    const tbody = document.getElementById('votesTableBody');
    tbody.innerHTML = `
        <tr>
            <td colspan="11" class="text-center py-5">
                <div class="empty-state">
                    <i class="fas fa-vote-yea fa-4x text-muted mb-3"></i>
                    <h5 class="text-muted">No Votes Yet</h5>
                    <p class="text-muted">Votes will appear here once voters submit the form.</p>
                    <a href="index.html" class="btn btn-primary mt-3">
                        <i class="fas fa-arrow-left me-2"></i>Go to Voting Form
                    </a>
                </div>
            </td>
        </tr>
    `;
}

// Refresh data
function refreshData() {
    loadVoteData();
    showNotification('Data refreshed successfully', 'success');
}

// Export to Excel
function exportToExcel() {
    if (votesData.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }
    
    const headers = ['ID', 'Timestamp', 'Voter Name', 'Email', 'Phone', 'Contact Number', 'Country', 'College', 'Course', 'Semester', 'Year', 'Candidate', 'Support Reason'];
    const csvContent = [
        headers.join(','),
        ...votesData.map(vote => [
            vote.id,
            vote.timestamp,
            `"${vote.voterName}"`,
            vote.voterEmail,
            vote.voterPhone,
            vote.voterContactNumber,
            vote.voterCountry,
            `"${vote.collegeName}"`,
            vote.courseName,
            vote.semester,
            vote.yearOfStudy,
            vote.candidate,
            `"${vote.supportReason || ''}"`
        ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const filename = `alan_votes_${new Date().toISOString().split('T')[0]}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Data exported successfully', 'success');
}

// Initialize charts
function initializeCharts() {
    // Program Distribution Chart
    const programCtx = document.getElementById('programChart').getContext('2d');
    window.programChart = new Chart(programCtx, {
        type: 'doughnut',
        data: {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#0d6efd',
                    '#198754',
                    '#ffc107',
                    '#dc3545',
                    '#0dcaf0',
                    '#6f42c1',
                    '#fd7e14',
                    '#20c997'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Country Distribution Chart
    const countryCtx = document.getElementById('countryChart').getContext('2d');
    window.countryChart = new Chart(countryCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Number of Students',
                data: [],
                backgroundColor: '#0d6efd',
                borderColor: '#0d6efd',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Update charts
function updateCharts() {
    // Update course chart
    const courseCounts = {};
    votesData.forEach(vote => {
        courseCounts[vote.courseName] = (courseCounts[vote.courseName] || 0) + 1;
    });
    
    if (window.programChart && window.programChart.data) {
        window.programChart.data.labels = Object.keys(courseCounts);
        window.programChart.data.datasets[0].data = Object.values(courseCounts);
        window.programChart.update();
    }
    
    // Update country chart
    const countryCounts = {};
    votesData.forEach(vote => {
        countryCounts[vote.voterCountry] = (countryCounts[vote.voterCountry] || 0) + 1;
    });
    
    if (window.countryChart && window.countryChart.data) {
        window.countryChart.data.labels = Object.keys(countryCounts);
        window.countryChart.data.datasets[0].data = Object.values(countryCounts);
        window.countryChart.update();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Utility function to format date
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Auto-refresh every 5 seconds for live vote counting
setInterval(() => {
    loadVoteData();
}, 5000);
