// Voting Form Handler
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Submit form to localStorage
    function submitForm(successModal) {
        const formData = new FormData(form);
        const voteData = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
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
            agreeTerms: formData.get('agreeTerms') || document.getElementById('agreeTerms').checked
        };
        
        // Save to localStorage
        saveVoteData(voteData);
        
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
    }
    
    // Save vote data to localStorage
    function saveVoteData(data) {
        let votes = JSON.parse(localStorage.getItem('alanVotes') || '[]');
        votes.push(data);
        localStorage.setItem('alanVotes', JSON.stringify(votes));
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
