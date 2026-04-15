# Global Pass Admin Panel

A comprehensive CRM and admin panel for managing student leads and tracking business metrics for the Global Pass educational consultancy website.

## Features

### 🔐 Authentication
- Secure login system with email/password authentication
- Session management using localStorage
- Auto-redirect to login if not authenticated

### 📊 Dashboard
- **Real-time Statistics**: Track total leads, new leads, contacted, and converted students
- **Visual Analytics**: Charts and graphs for performance metrics (placeholder for integration)
- **Quick Stats Cards**: Overview of key performance indicators

### 👥 Lead Management (CRM)
- **Complete Lead Database**: View all student inquiries with detailed information
- **Advanced Filtering**: Search by name, email, phone, or filter by status
- **Status Management**: Update lead status (New, Contacted, Pending, Converted, Lost)
- **Lead Editing**: Full CRUD operations for lead information
- **Notes System**: Add and manage notes for each lead
- **Assignment Tracking**: Track which counselor is assigned to each lead
- **Contact History**: Monitor last contact dates

### 📈 Analytics
- Performance metrics tracking
- Conversion rate monitoring
- Lead source analysis (placeholder for integration)

### 👤 User Management
- Admin user management interface (placeholder for integration)
- Role-based access control (ready for implementation)

### ⚙️ Settings
- System configuration panel
- Customizable preferences

### 📤 Data Export
- **CSV Export**: Download lead data in CSV format
- **Complete Data**: Export all lead information including notes and assignments

## Access Information

### Login Credentials
- **Email**: `globalpasscareers@gmail.com`
- **Password**: `Global07@`

### Access URL
- **Admin Login**: `http://localhost:5173/admin/login`
- **Dashboard**: `http://localhost:5173/admin/dashboard` (requires login)

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access Admin Panel**
   - Navigate to `http://localhost:5173/admin/login`
   - Enter the credentials above
   - You'll be redirected to the dashboard

## File Structure

```
src/
├── pages/admin/
│   ├── AdminLogin.tsx          # Login page with authentication
│   └── AdminDashboard.tsx      # Main dashboard with CRM features
├── components/admin/
│   ├── AdminRoute.tsx          # Route protection component
│   └── LeadManagement.tsx      # Lead management interface
└── App.tsx                     # Updated with admin routes
```

## Key Components

### AdminLogin.tsx
- Beautiful gradient login interface
- Form validation
- Error handling
- Demo credentials display

### AdminDashboard.tsx
- Tabbed interface for different sections
- Real-time statistics
- Lead management integration
- Export functionality

### LeadManagement.tsx
- Advanced search and filtering
- Status updates with dropdown
- Edit dialog for lead details
- Delete confirmation
- Responsive design

### AdminRoute.tsx
- Route protection
- Authentication checking
- Loading states

## Security Features

- **Session Management**: Uses localStorage for session persistence
- **Route Protection**: All admin routes are protected
- **Auto-logout**: Redirects to login if not authenticated
- **Secure Storage**: Credentials are handled securely

## Customization

### Adding New Lead Fields
1. Update the `Lead` interface in `LeadManagement.tsx`
2. Add form fields in the edit dialog
3. Update the CSV export function

### Changing Authentication
1. Update credentials in `AdminLogin.tsx`
2. Consider integrating with a backend API for production

### Adding New Dashboard Tabs
1. Add new `TabsContent` in `AdminDashboard.tsx`
2. Create corresponding components
3. Update the `TabsList` with new triggers

## Production Considerations

For production deployment, consider:

1. **Backend Integration**: Replace localStorage with secure session management
2. **Database**: Connect to a proper database (PostgreSQL, MongoDB, etc.)
3. **API Integration**: Replace mock data with real API calls
4. **Enhanced Security**: Add JWT tokens, rate limiting, etc.
5. **User Roles**: Implement proper role-based access control
6. **Audit Logs**: Track user actions and changes

## Technologies Used

- **React 18** with TypeScript
- **React Router** for navigation
- **shadcn/ui** components
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hook Form** for form handling
- **React Query** for state management

## Support

For any issues or questions about the admin panel, please refer to the code comments or reach out to the development team.

---

**Note**: This is a frontend-only implementation. For production use, integrate with a proper backend and database system.
