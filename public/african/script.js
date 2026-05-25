// Voting Form Handler
document.addEventListener('DOMContentLoaded', function() {
    // JSONBin Configuration - REPLACE WITH YOUR CREDENTIALS
    const JSONBIN_CONFIG = {
        apiKey: 'YOUR_JSONBIN_API_KEY',
        binId: 'YOUR_BIN_ID'
    };

    // JSONBin API functions
    const JSONBinAPI = {
        getVotes: async function() {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}/latest`, {
                    headers: {
                        'X-Master-Key': JSONBIN_CONFIG.apiKey,
                        'X-Bin-Meta': 'false'
                    }
                });
                
                if (!response.ok) {
                    console.error('Error fetching from JSONBin:', response.status);
                    return [];
                }
                
                const data = await response.json();
                return data.votes || [];
            } catch (error) {
                console.error('Error fetching votes:', error);
                return [];
            }
        },
        
        saveVotes: async function(votes) {
            try {
                const response = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_CONFIG.binId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': JSONBIN_CONFIG.apiKey
                    },
                    body: JSON.stringify({ votes: votes })
                });
                
                if (!response.ok) {
                    throw new Error('Failed to save votes');
                }
                
                return await response.json();
            } catch (error) {
                console.error('Error saving votes:', error);
                throw error;
            }
        },
        
        addVote: async function(vote) {
            const currentVotes = await this.getVotes();
            vote.id = Date.now();
            vote.timestamp = new Date().toISOString();
            currentVotes.push(vote);
            await this.saveVotes(currentVotes);
            return vote;
        }
    };

    // Initialize form
    const form = document.getElementById('voteForm');
    const successModalElement = document.getElementById('successModal');
    
    let successModal = null;
    if (successModalElement) {
        successModal = new bootstrap.Modal(successModalElement);
    }
    
    // Form validation and submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (validateForm()) {
                submitForm(successModal);
            }
        });
    }
    
    // Form validation function
    function validateForm() {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        // Clear previous errors
        clearErrors();
        
        // Validate each required field
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            } else {
                // Specific validations
                if (field.type === 'email' && !validateEmail(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    isValid = false;
                }
                
                if (field.type === 'tel' && !validatePhone(field.value)) {
                    showError(field, 'Please enter a valid phone number (minimum 10 digits)');
                    isValid = false;
                }
            }
        });
        
        // Check terms checkbox
        const termsCheckbox = document.getElementById('agreeTerms');
        if (termsCheckbox && !termsCheckbox.checked) {
            showError(termsCheckbox, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation
    function validatePhone(phone) {
        if (!phone) return false;
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    }
    
    // Show error message
    function showError(field, message) {
        field.classList.add('is-invalid');
        
        // Remove existing error message if any
        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    // Clear all errors
    function clearErrors() {
        const invalidFields = form.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => {
            field.classList.remove('is-invalid');
        });
        
        const errorMessages = form.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(error => {
            error.remove();
        });
    }
    
    // Submit form to JSONBin
    function submitForm(successModal) {
        const formData = new FormData(form);
        const voteData = {
            voterName: formData.get('voterName') || document.getElementById('voterName').value,
            voterEmail: formData.get('voterEmail') || document.getElementById('voterEmail').value,
            voterPhone: formData.get('voterPhone') || document.getElementById('voterPhone').value,
            voterContactNumber: formData.get('voterContactNumber') || document.getElementById('voterContactNumber').value,
            voterCountry: formData.get('voterCountry') || document.getElementById('voterCountry').value,
            collegeName: formData.get('collegeName') || document.getElementById('collegeName').value,
            courseName: formData.get('courseName') || document.getElementById('courseName').value,
            semester: formData.get('semester') || document.getElementById('semester').value,
            yearOfStudy: formData.get('yearOfStudy') || document.getElementById('yearOfStudy').value,
            candidate: formData.get('candidate') || document.querySelector('input[name="candidate"]:checked').value,
            supportReason: formData.get('supportReason') || document.getElementById('supportReason').value,
            agreeTerms: formData.get('agreeTerms') || document.getElementById('agreeTerms').checked ? 'on' : 'off'
        };
        
        // Save to JSONBin
        JSONBinAPI.addVote(voteData)
            .then(() => {
                console.log('Vote saved successfully');
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
                
                // Show success modal
                if (successModal) {
                    successModal.show();
                } else {
                    alert('Vote submitted successfully!');
                }
            })
            .catch((error) => {
                console.error('Error adding vote:', error);
                alert('Error submitting vote. Please try again.');
            });
    }
    
    // Show success message
    function showSuccessMessage() {
        console.log('Form submitted successfully!');
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Real-time validation
    const requiredInputs = form.querySelectorAll('input[required], select[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
                const errorDiv = this.parentNode.querySelector('.invalid-feedback');
                if (errorDiv) {
                    errorDiv.remove();
                }
            }
        });
    });
});

// Utility functions
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function exportToExcel(data, filename) {
    // Create CSV content
    const headers = ['ID', 'Timestamp', 'Voter Name', 'Email', 'Phone', 'Contact Number (WhatsApp)', 'Country', 'College/University', 'Course', 'Semester', 'Year of Study', 'Candidate', 'Support Reason'];
    const csvContent = [
        headers.join(','),
        ...data.map(vote => [
            vote.id,
            vote.timestamp,
            `"${vote.voterName}"`,
            `"${vote.voterEmail}"`,
            `"${vote.voterPhone}"`,
            `"${vote.voterContactNumber}"`,
            `"${vote.voterCountry}"`,
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
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
