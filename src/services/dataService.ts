// Data Service for managing frontend-backend integration
// Using localStorage as a simple backend simulation
import { emailService } from './emailService';

export interface ContactForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface ApplyForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  course: string;
  destination: string;
  message: string;
  timestamp: string;
  status: 'new' | 'processing' | 'approved' | 'rejected';
}

export interface AdmissionForm {
  id: string;
  name: string;
  email: string;
  phone: string;
  education: string;
  course: string;
  destination: string;
  dob?: string;
  address?: string;
  message: string;
  timestamp: string;
  status: 'new' | 'reviewing' | 'accepted' | 'rejected';
  fatherName?: string;
  nationality?: string;
  schoolName?: string;
  board?: string;
  admissionRequiredIn?: string;
  preferredCountries?: string[];
  courseCategory?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  timestamp: string;
  isActive: boolean;
}

class DataService {
  private readonly STORAGE_KEYS = {
    CONTACT_FORMS: 'contact_forms',
    APPLY_FORMS: 'apply_forms',
    ADMISSION_FORMS: 'admission_forms',
    GALLERY_IMAGES: 'gallery_images',
    LEADS: 'leads'
  };

  private readonly EMAIL_RECIPIENTS = [
    'info@globalpasscareer.com',
    'amankk0007@gmail.com'
  ];

  // Contact Form Methods
  async saveContactForm(formData: Omit<ContactForm, 'id' | 'timestamp' | 'status'>): Promise<ContactForm> {
    const forms = this.getContactForms();
    const newForm: ContactForm = {
      ...formData,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    forms.push(newForm);
    localStorage.setItem(this.STORAGE_KEYS.CONTACT_FORMS, JSON.stringify(forms));

    // Send email notification using Resend API
    await emailService.sendFormSubmission(formData, 'contact');
    
    return newForm;
  }

  getContactForms(): ContactForm[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.CONTACT_FORMS);
    return data ? JSON.parse(data) : [];
  }

  updateContactFormStatus(id: string, status: ContactForm['status']): void {
    const forms = this.getContactForms();
    const index = forms.findIndex(form => form.id === id);
    if (index !== -1) {
      forms[index].status = status;
      localStorage.setItem(this.STORAGE_KEYS.CONTACT_FORMS, JSON.stringify(forms));
    }
  }

  deleteContactForm(id: string): void {
    const forms = this.getContactForms();
    const filtered = forms.filter(form => form.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.CONTACT_FORMS, JSON.stringify(filtered));
  }

  // Apply Form Methods
  async saveApplyForm(formData: Omit<ApplyForm, 'id' | 'timestamp' | 'status'>): Promise<ApplyForm> {
    const forms = this.getApplyForms();
    const newForm: ApplyForm = {
      ...formData,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    forms.push(newForm);
    localStorage.setItem(this.STORAGE_KEYS.APPLY_FORMS, JSON.stringify(forms));

    // Send email notification using Resend API
    await emailService.sendFormSubmission(formData, 'application');
    
    return newForm;
  }

  getApplyForms(): ApplyForm[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.APPLY_FORMS);
    return data ? JSON.parse(data) : [];
  }

  updateApplyFormStatus(id: string, status: ApplyForm['status']): void {
    const forms = this.getApplyForms();
    const index = forms.findIndex(form => form.id === id);
    if (index !== -1) {
      forms[index].status = status;
      localStorage.setItem(this.STORAGE_KEYS.APPLY_FORMS, JSON.stringify(forms));
    }
  }

  deleteApplyForm(id: string): void {
    const forms = this.getApplyForms();
    const filtered = forms.filter(form => form.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.APPLY_FORMS, JSON.stringify(filtered));
  }

  // Admission Form Methods
  async saveAdmissionForm(formData: Omit<AdmissionForm, 'id' | 'timestamp' | 'status'>): Promise<AdmissionForm> {
    const forms = this.getAdmissionForms();
    const newForm: AdmissionForm = {
      ...formData,
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      status: 'new'
    };
    forms.push(newForm);
    localStorage.setItem(this.STORAGE_KEYS.ADMISSION_FORMS, JSON.stringify(forms));

    // Send email notification using Resend API
    await emailService.sendFormSubmission(formData, 'admission');
    
    return newForm;
  }

  getAdmissionForms(): AdmissionForm[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.ADMISSION_FORMS);
    return data ? JSON.parse(data) : [];
  }

  updateAdmissionFormStatus(id: string, status: AdmissionForm['status']): void {
    const forms = this.getAdmissionForms();
    const index = forms.findIndex(form => form.id === id);
    if (index !== -1) {
      forms[index].status = status;
      localStorage.setItem(this.STORAGE_KEYS.ADMISSION_FORMS, JSON.stringify(forms));
    }
  }

  deleteAdmissionForm(id: string): void {
    const forms = this.getAdmissionForms();
    const filtered = forms.filter(form => form.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.ADMISSION_FORMS, JSON.stringify(filtered));
  }

  // Gallery Methods
  saveGalleryImage(imageData: Omit<GalleryImage, 'id' | 'timestamp'>): GalleryImage {
    const images = this.getGalleryImages();
    const newImage: GalleryImage = {
      ...imageData,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    images.push(newImage);
    localStorage.setItem(this.STORAGE_KEYS.GALLERY_IMAGES, JSON.stringify(images));
    // Dispatch storage event for real-time sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: this.STORAGE_KEYS.GALLERY_IMAGES,
      newValue: JSON.stringify(images)
    }));
    return newImage;
  }

  getGalleryImages(): GalleryImage[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.GALLERY_IMAGES);
    if (!data) {
      // Only initialize with default images once, then preserve user changes
      const initKey = this.STORAGE_KEYS.GALLERY_IMAGES + '_initialized';
      const wasInitialized = localStorage.getItem(initKey);
      
      if (!wasInitialized) {
        // First time initialization - create default images
        const defaultImages: GalleryImage[] = [
        {
          id: this.generateId(),
          title: "Bharat Vikas Parishad Award",
          description: "Bharat Vikas Parishad Award ceremony for excellence in education",
          category: "events",
          imageUrl: "/gallery/gl-newspaper.jpg",
          timestamp: new Date("2024-03-31").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Rayat-Bahra University Partnership",
          description: "Partnership ceremony with Rayat-Bahra University",
          category: "events",
          imageUrl: "/gallery/gl-rayat-bahra.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Evergreen College Global Tie-up",
          description: "Global partnership with Evergreen College",
          category: "events",
          imageUrl: "/gallery/gl-evergreen.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Student Success: Key Handover",
          description: "Student receiving success key for international admission",
          category: "students",
          imageUrl: "/gallery/gl-key-handover.jpg",
          timestamp: new Date("2023-12-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Toronto Cup 2023 Celebration",
          description: "Celebrating Toronto Cup 2023 victory",
          category: "events",
          imageUrl: "/gallery/gl-toronto-cup-group.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Social Recognition Coverage",
          description: "Media coverage of social recognition",
          category: "events",
          imageUrl: "/gallery/gl-newspaper-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with Premier Doug Ford",
          description: "Meeting with Ontario Premier Doug Ford",
          category: "events",
          imageUrl: "/gallery/gl-doug-ford.jpg",
          timestamp: new Date("2023-06-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Award Ceremony",
          description: "Community award ceremony for educational excellence",
          category: "events",
          imageUrl: "/gallery/gl-gazebo-award.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with Mayor Patrick Brown",
          description: "Meeting with Brampton Mayor Patrick Brown and Councillor Rod Power",
          category: "events",
          imageUrl: "/gallery/gl-three-men.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Excellence in Service Award",
          description: "Award for excellence in educational services",
          category: "events",
          imageUrl: "/gallery/gl-woman-award.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Singh Grafix Community Event",
          description: "Community event with Singh Grafix team",
          category: "events",
          imageUrl: "/gallery/gl-singh-grafix.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Press Conference on Indo-Pacific Strategy",
          description: "Press conference with MP George Chahal in Amritsar",
          category: "events",
          imageUrl: "/gallery/gl-press-conf.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "MOU with SG Encon Private Limited",
          description: "Memorandum of Understanding signing with SG Encon",
          category: "events",
          imageUrl: "/gallery/gl-business-meeting.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Visit to Golden Temple",
          description: "Blessed visit to Golden Temple Amritsar",
          category: "events",
          imageUrl: "/gallery/gl-golden-temple.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with Graham McGregor MPP",
          description: "Meeting with Brampton MPP Graham McGregor",
          category: "events",
          imageUrl: "/gallery/gl-outdoor-duo.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Annual Gala Event",
          description: "Annual gala event celebration in Toronto",
          category: "events",
          imageUrl: "/gallery/gl-gala-event.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with PM Justin Trudeau",
          description: "Meeting with Canadian Prime Minister Justin Trudeau",
          category: "events",
          imageUrl: "/gallery/gl-trudeau.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Guest at Adesh Hospital and College",
          description: "Guest visit at Adesh Hospital and College",
          category: "events",
          imageUrl: "/gallery/gl-adesh-hospital.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Gala Evening",
          description: "Community gala evening celebration",
          category: "events",
          imageUrl: "/gallery/gl-gala-trio-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Educational Seminar",
          description: "Educational seminar for students",
          category: "events",
          imageUrl: "/gallery/gl-seminar-group.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with Canada's Former Defence Minister",
          description: "Meeting with former Canadian Defence Minister",
          category: "events",
          imageUrl: "/gallery/gl-event-duo.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Meeting with Amarjot Sandhu MPP",
          description: "Meeting with Brampton MPP Amarjot Sandhu",
          category: "events",
          imageUrl: "/gallery/gl-future-depot.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Education Seminar",
          description: "Community education seminar event",
          category: "events",
          imageUrl: "/gallery/gl-seminar-group-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Outreach Event",
          description: "Community outreach program event",
          category: "events",
          imageUrl: "/gallery/gl-future-depot-2.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Christmas Dinner in Ottawa",
          description: "Christmas dinner with MP Randeep Sarai in Ottawa",
          category: "events",
          imageUrl: "/gallery/gl-gala-trio-4.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Networking Event",
          description: "Professional networking event in Toronto",
          category: "events",
          imageUrl: "/gallery/gl-event-couple.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Mississauga-Malton Community Event",
          description: "Community event in Mississauga-Malton",
          category: "events",
          imageUrl: "/gallery/gl-mississauga-malton.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Event with Premier Ford",
          description: "Community event with Premier Doug Ford",
          category: "events",
          imageUrl: "/gallery/gl-doug-ford-2.jpg",
          timestamp: new Date("2023-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "King Realty Excellence Award",
          description: "King Realty Excellence Award ceremony",
          category: "events",
          imageUrl: "/gallery/gl-king-realty-award.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Student Departure - Study Abroad",
          description: "Student departure for international studies",
          category: "students",
          imageUrl: "/gallery/gl-airport-student.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Welcoming Student at Toronto Airport",
          description: "Welcoming international student at Toronto Pearson Airport",
          category: "students",
          imageUrl: "/gallery/gl-airport-family-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Team Celebration Dinner",
          description: "Team celebration dinner event",
          category: "events",
          imageUrl: "/gallery/gl-restaurant-group.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Picnic Celebration",
          description: "Community picnic celebration event",
          category: "events",
          imageUrl: "/gallery/gl-picnic-celebration.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Signature Moment with Garry Sir",
          description: "Autograph session with Garry Sir",
          category: "events",
          imageUrl: "/gallery/gl-garry-sir-signature.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Outdoor Community Picnic",
          description: "Outdoor community picnic celebration",
          category: "events",
          imageUrl: "/gallery/gl-picnic-celebration-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Garry Sir Autograph Session",
          description: "Autograph session with Garry Sir",
          category: "events",
          imageUrl: "/gallery/gl-garry-sir-signature-2.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Formal Evening Reception",
          description: "Formal evening reception event",
          category: "events",
          imageUrl: "/gallery/gl-formal-quartet.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Community Advocacy Rally",
          description: "Community advocacy rally event",
          category: "events",
          imageUrl: "/gallery/gl-community-rally.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Group Key Handover",
          description: "Group key handover ceremony",
          category: "students",
          imageUrl: "/gallery/group-key.jpg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "MoU Signed with IET Bhaddal College",
          description: "Memorandum of Understanding with IET Bhaddal College",
          category: "events",
          imageUrl: "/gallery/MoU signed with IET Bhaddal College.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Congratulations to Winning Football Team",
          description: "Congratulations to winning football team",
          category: "events",
          imageUrl: "/gallery/Congratulations to the Winning Football Team.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Delegate from Australia",
          description: "Delegate meeting from Australia",
          category: "events",
          imageUrl: "/gallery/Delegate from Australia.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Placement Drive at SVIET",
          description: "Placement drive organized at SVIET College",
          category: "students",
          imageUrl: "/gallery/Placement drive at sviet.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Job Placement Drive for International Students",
          description: "Job placement drive for international students in US-based IT company",
          category: "students",
          imageUrl: "/gallery/Job placement drive organized by Global Pass for international students in a US-based IT company.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Industrial Visit at US Base Company Ambtel",
          description: "Industrial visit at US-based company Ambtel",
          category: "events",
          imageUrl: "/gallery/Industrial Visit at US base company Ambtel .jpeg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Guest of Honour at Football Tournament",
          description: "Guest of Honour at 63rd Principal Harbhajan Singh Football Tournament",
          category: "events",
          imageUrl: "/gallery/Guest of Honour at the 63rd Principal Harbhajan Singh Football Tournament, Garhshankar.jpeg",
          timestamp: new Date("2024-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Tie up with Amity University Mohali",
          description: "Partnership with Amity University Mohali",
          category: "events",
          imageUrl: "/gallery/amity-university.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Tie-up with Root Country School",
          description: "Partnership with Root Country School, Baghi (Himachal Pradesh)",
          category: "events",
          imageUrl: "/gallery/roots-country.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Government Official from Africa",
          description: "Government official from Africa strengthening global partnerships",
          category: "events",
          imageUrl: "/gallery/Africa-Person.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Thrive Future Summit 2026",
          description: "Thrive Future Summit 2026 with global leaders",
          category: "events",
          imageUrl: "/gallery/Future-Summit.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Young Entrepreneur Mr. Yong",
          description: "Meeting with young entrepreneur Mr. Yong",
          category: "events",
          imageUrl: "/gallery/Mr-Yong.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "Universal Event Highlight",
          description: "Universal event highlight celebration",
          category: "events",
          imageUrl: "/gallery/universal.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        },
        {
          id: this.generateId(),
          title: "News Coverage",
          description: "Media coverage of Global Pass activities",
          category: "events",
          imageUrl: "/gallery/news.jpeg",
          timestamp: new Date("2026-01-01").toISOString(),
          isActive: true
        }
      ];
        localStorage.setItem(this.STORAGE_KEYS.GALLERY_IMAGES, JSON.stringify(defaultImages));
        localStorage.setItem(initKey, 'true'); // Mark as initialized
        return defaultImages;
      } else {
        // Already initialized once but data is missing, return empty array
        return [];
      }
    }
    return JSON.parse(data);
  }

  updateGalleryImage(id: string, imageData: Partial<GalleryImage>): void {
    const images = this.getGalleryImages();
    const index = images.findIndex(img => img.id === id);
    if (index !== -1) {
      images[index] = { ...images[index], ...imageData };
      localStorage.setItem(this.STORAGE_KEYS.GALLERY_IMAGES, JSON.stringify(images));
      // Dispatch storage event for real-time sync
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'gallery_images',
        newValue: JSON.stringify(images)
      }));
    }
  }

  deleteGalleryImage(id: string): void {
    const images = this.getGalleryImages();
    const filtered = images.filter(img => img.id !== id);
    localStorage.setItem(this.STORAGE_KEYS.GALLERY_IMAGES, JSON.stringify(filtered));
    // Dispatch storage event for real-time sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: this.STORAGE_KEYS.GALLERY_IMAGES,
      newValue: JSON.stringify(filtered)
    }));
  }

  // Lead Management (for existing leads)
  async saveLead(leadData: any): Promise<any> {
    const leads = this.getLeads();
    const newLead = {
      ...leadData,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    leads.push(newLead);
    localStorage.setItem(this.STORAGE_KEYS.LEADS, JSON.stringify(leads));

    // Send email notification using Resend API
    await emailService.sendFormSubmission(leadData, 'lead');
    
    return newLead;
  }

  getLeads(): any[] {
    const data = localStorage.getItem(this.STORAGE_KEYS.LEADS);
    return data ? JSON.parse(data) : [];
  }

  
  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Export data for admin
  exportData(type: 'contact' | 'apply' | 'admission' | 'gallery' | 'leads'): string {
    let data: any[] = [];
    switch (type) {
      case 'contact':
        data = this.getContactForms();
        break;
      case 'apply':
        data = this.getApplyForms();
        break;
      case 'admission':
        data = this.getAdmissionForms();
        break;
      case 'gallery':
        data = this.getGalleryImages();
        break;
      case 'leads':
        data = this.getLeads();
        break;
    }
    return JSON.stringify(data, null, 2);
  }

  // Reset gallery to default images
  resetGalleryToDefault(): void {
    const initKey = this.STORAGE_KEYS.GALLERY_IMAGES + '_initialized';
    localStorage.removeItem(this.STORAGE_KEYS.GALLERY_IMAGES);
    localStorage.removeItem(initKey);
    // This will trigger re-initialization on next getGalleryImages() call
  }

  // Get statistics
  getStats() {
    return {
      contactForms: this.getContactForms().length,
      applyForms: this.getApplyForms().length,
      admissionForms: this.getAdmissionForms().length,
      galleryImages: this.getGalleryImages().length,
      leads: this.getLeads().length,
      newContactForms: this.getContactForms().filter(f => f.status === 'new').length,
      newApplyForms: this.getApplyForms().filter(f => f.status === 'new').length,
      newAdmissionForms: this.getAdmissionForms().filter(f => f.status === 'new').length
    };
  }
}

export const dataService = new DataService();
