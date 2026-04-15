import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LeadManagement from "@/components/admin/LeadManagement";
import GalleryManagementSimple from "@/components/admin/GalleryManagementSimple";
import { dataService } from "@/services/dataService";
import { useRealtimeData } from "@/hooks/useRealtimeData";
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Phone, 
  Mail, 
  GraduationCap,
  LogOut,
  Settings,
  BarChart3,
  Calendar,
  Download,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockLeads = [
  {
    id: 1,
    name: "Rahul Sharma",
    email: "rahul.sharma@email.com",
    phone: "+91 9876543210",
    education: "12th",
    date: "2024-04-15",
    status: "new" as const,
    notes: "Interested in engineering courses",
    assignedTo: "John Doe",
    lastContact: "2024-04-15"
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya.patel@email.com",
    phone: "+91 8765432109",
    education: "Graduate",
    date: "2024-04-14",
    status: "contacted" as const,
    notes: "Looking for MBA programs",
    assignedTo: "Jane Smith",
    lastContact: "2024-04-14"
  },
  {
    id: 3,
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 7654321098",
    education: "Working Professional",
    date: "2024-04-13",
    status: "pending" as const,
    notes: "Interested in overseas education",
    assignedTo: "John Doe",
    lastContact: "2024-04-13"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@email.com",
    phone: "+91 6543210987",
    education: "Post Graduate",
    date: "2024-04-12",
    status: "converted" as const,
    notes: "Enrolled in MS program",
    assignedTo: "Jane Smith",
    lastContact: "2024-04-12"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 5432109876",
    education: "10th",
    date: "2024-04-11",
    status: "lost" as const,
    notes: "Not interested anymore",
    assignedTo: "John Doe",
    lastContact: "2024-04-11"
  }
];

const mockStats = {
  totalLeads: 156,
  newLeads: 23,
  contacted: 89,
  converted: 44,
  pending: 12,
  lost: 8,
  contactForms: 0,
  applyForms: 0,
  admissionForms: 0,
  galleryImages: 0
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [leads, setLeads] = useState(mockLeads);
  const [stats, setStats] = useState(mockStats);
  const { refreshData } = useRealtimeData();

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
    
    // Load real stats from data service
    const realStats = dataService.getStats();
    setStats(prev => ({
      ...prev,
      ...realStats
    }));
    
    // Set up real-time form submission listener
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalpass_contact_forms' || 
          e.key === 'globalpass_apply_forms' || 
          e.key === 'globalpass_admission_forms') {
        // Reload stats when new form is submitted
        const updatedStats = dataService.getStats();
        setStats(prev => ({
          ...prev,
          ...updatedStats
        }));
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminEmail");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/admin/login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-500";
      case "contacted":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleUpdateLead = (updatedLead: typeof mockLeads[0]) => {
    setLeads(leads.map(lead => 
      lead.id === updatedLead.id ? updatedLead : lead
    ));
    
    // Update stats
    const newStats = { ...stats };
    const oldLead = leads.find(l => l.id === updatedLead.id);
    if (oldLead) {
      if (oldLead.status !== updatedLead.status) {
        newStats[oldLead.status as keyof typeof stats]--;
        newStats[updatedLead.status as keyof typeof stats]++;
      }
    }
    setStats(newStats);
  };

  const handleDeleteLead = (id: number) => {
    const leadToDelete = leads.find(l => l.id === id);
    if (leadToDelete) {
      setLeads(leads.filter(lead => lead.id !== id));
      setStats({
        ...stats,
        totalLeads: stats.totalLeads - 1,
        [leadToDelete.status as keyof typeof stats]: stats[leadToDelete.status as keyof typeof stats] - 1
      });
    }
  };

  const exportData = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Education", "Date", "Status", "Notes", "Assigned To", "Last Contact"],
      ...leads.map(lead => [
        lead.name,
        lead.email,
        lead.phone,
        lead.education,
        lead.date,
        lead.status,
        lead.notes || "",
        lead.assignedTo || "",
        lead.lastContact || ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "Leads data has been downloaded successfully",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Global Pass Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalLeads}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.newLeads}</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contacted</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contacted}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Converted</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.converted}</div>
              <p className="text-xs text-muted-foreground">+15% conversion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="leads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="apply">Apply</TabsTrigger>
            <TabsTrigger value="admission">Admission</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="leads" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Lead Management</h2>
                <p className="text-slate-600">Manage and track student inquiries</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Lead
                </Button>
                <Button onClick={exportData}>
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
            <LeadManagement 
              leads={leads} 
              onUpdateLead={handleUpdateLead}
              onDeleteLead={handleDeleteLead}
            />
          </TabsContent>
          
          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
                <CardDescription>Manage contact form inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataService.getContactForms().slice(0, 5).map((form) => (
                    <div key={form.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{form.name}</h4>
                          <p className="text-sm text-slate-600">{form.email} • {form.phone}</p>
                        </div>
                        <Badge className={`${form.status === 'new' ? 'bg-green-500' : 'bg-blue-500'} text-white`}>
                          {form.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{form.message}</p>
                      <p className="text-xs text-slate-500">{new Date(form.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {dataService.getContactForms().length === 0 && (
                    <p className="text-center text-slate-500 py-8">No contact form submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apply" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Apply Form Submissions</CardTitle>
                <CardDescription>Manage course application inquiries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataService.getApplyForms().slice(0, 5).map((form) => (
                    <div key={form.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{form.name}</h4>
                          <p className="text-sm text-slate-600">{form.email} • {form.phone}</p>
                          <p className="text-sm text-slate-600">Course: {form.course} • Destination: {form.destination}</p>
                        </div>
                        <Badge className={`${form.status === 'new' ? 'bg-green-500' : form.status === 'processing' ? 'bg-yellow-500' : form.status === 'approved' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                          {form.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{form.message}</p>
                      <p className="text-xs text-slate-500">{new Date(form.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {dataService.getApplyForms().length === 0 && (
                    <p className="text-center text-slate-500 py-8">No apply form submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admission" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Admission Form Submissions</CardTitle>
                <CardDescription>Manage full admission applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataService.getAdmissionForms().slice(0, 5).map((form) => (
                    <div key={form.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-semibold">{form.name}</h4>
                          <p className="text-sm text-slate-600">{form.email} • {form.phone}</p>
                          <p className="text-sm text-slate-600">Education: {form.education} • Course: {form.course}</p>
                        </div>
                        <Badge className={`${form.status === 'new' ? 'bg-green-500' : form.status === 'reviewing' ? 'bg-yellow-500' : form.status === 'accepted' ? 'bg-blue-500' : 'bg-red-500'} text-white`}>
                          {form.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{form.message}</p>
                      <p className="text-xs text-slate-500">{new Date(form.timestamp).toLocaleDateString()}</p>
                    </div>
                  ))}
                  {dataService.getAdmissionForms().length === 0 && (
                    <p className="text-center text-slate-500 py-8">No admission form submissions yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-4">
            <GalleryManagementSimple />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Track your performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Analytics charts will be displayed here</p>
                    <p className="text-sm">Integration with charting library needed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage admin users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Users className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>User management interface</p>
                    <p className="text-sm">Add, edit, and remove admin users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Configure your admin panel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-slate-500">
                  <div className="text-center">
                    <Settings className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                    <p>Settings panel</p>
                    <p className="text-sm">Configure system preferences</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
