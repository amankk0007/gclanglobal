# African Students Portal - Global Pass Career

A comprehensive landing page and CRM dashboard for African student registrations, built for Global Pass Career Consultancy Inc.

## Features

### Landing Page (`index.html`)
- **Hero Section**: Compelling introduction for African students
- **About Section**: Information about Global Pass Career services
- **Programs Section**: Popular study programs (MBBS, Engineering, MBA, IT)
- **Registration Form**: Comprehensive student information collection
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Professional design matching Global Pass Career brand

### CRM Dashboard (`crm.html`)
- **Student Management**: View, search, and filter student registrations
- **Data Analytics**: Charts showing program and country distribution
- **Statistics Cards**: Real-time metrics (total students, today's registrations, etc.)
- **Export Functionality**: Download student data as Excel/CSV
- **Student Details**: View complete information for each student
- **Contact Integration**: Direct email integration for student communication

## Form Fields Collected

### Personal Information
- Full Name
- Student Email
- Phone Number
- Country (African countries dropdown)

### Academic Information
- University/College Name
- Designation/Position in College
- Current Semester
- Degree Pursuing

### Program Interest
- Interested Program (MBBS, Engineering, MBA, IT, etc.)
- Additional Message (optional)

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5.3.0
- **Icons**: Font Awesome 6.4.0
- **Charts**: Chart.js
- **Data Storage**: LocalStorage (for demo purposes)
- **Responsive**: Mobile-first design approach

## File Structure

```
├── index.html              # Main landing page
├── crm.html               # CRM dashboard
├── style.css              # Landing page styles
├── crm-style.css          # CRM dashboard styles
├── script.js              # Landing page functionality
├── crm-script.js          # CRM dashboard functionality
└── README.md              # This file
```

## Setup Instructions

### 1. Local Development
Simply download all files to a folder and open `index.html` in a web browser.

### 2. Web Server Deployment
For production deployment, upload all files to your web server:

```bash
# Upload to your subdomain
ftp://your-subdomain.globalpasscareer.com/
```

### 3. Server Requirements
- Any standard web server (Apache, Nginx, etc.)
- No server-side requirements (pure frontend)
- HTTPS recommended for production

## Usage Guide

### For Students
1. Visit the landing page URL
2. Fill out the registration form
3. Submit the form
4. Receive confirmation message

### For Administrators
1. Access the CRM dashboard at `crm.html`
2. View student registrations in real-time
3. Use search and filters to find specific students
4. Export data to Excel for analysis
5. Contact students directly via email

## Data Management

### Local Storage
Currently, all data is stored in browser's LocalStorage for demo purposes.

### Production Considerations
For production use, consider:
- Backend database integration (MySQL, PostgreSQL)
- API endpoints for data management
- User authentication for CRM access
- Data backup and security measures

## Customization

### Brand Colors
Update CSS variables in `style.css`:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --success-color: #198754;
    /* Add your brand colors */
}
```

### Adding New Countries
Edit the country dropdown in `index.html`:
```html
<option value="NewCountry">New Country</option>
```

### New Programs
Update program options in the registration form and CRM analytics.

## Security Notes

- Current implementation uses LocalStorage (client-side only)
- For production, implement server-side validation
- Add CSRF protection for forms
- Implement rate limiting for form submissions
- Secure the CRM dashboard with authentication

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Support

For technical support or customization requests:
- Email: info@globalpasscareer.com
- Phone: +1-519-806-0052 | +91-86995-35001

## License

© 2024 Global Pass Career Consultancy Inc. All rights reserved.

---

**Note**: This is a frontend-only demonstration. For production use, integrate with your preferred backend technology stack.
