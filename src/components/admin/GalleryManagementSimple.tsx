import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Upload,
  Search,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { dataService, GalleryImage } from "@/services/dataService";

const GalleryManagementSimple = () => {
  const { toast } = useToast();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "events",
    imageUrl: ""
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    loadImages();
  }, []);

  useEffect(() => {
    filterImages();
  }, [images, searchTerm, categoryFilter]);

  const loadImages = () => {
    const loadedImages = dataService.getGalleryImages();
    setImages(loadedImages);
  };

  const filterImages = () => {
    let filtered = images;
    
    if (searchTerm) {
      filtered = filtered.filter(img => 
        img.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        img.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== "all") {
      filtered = filtered.filter(img => img.category === categoryFilter);
    }
    
    setFilteredImages(filtered);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Create a temporary URL for the uploaded image
      const tempUrl = URL.createObjectURL(file);
      
      // Update form data with the file info
      setFormData(prev => ({
        ...prev,
        imageUrl: tempUrl,
        title: prev.title || file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let finalImageUrl = formData.imageUrl;
      
      // If a file was uploaded, convert it to a data URL or handle it
      if (selectedFile) {
        // For now, create a data URL (in production, this would upload to server)
        finalImageUrl = URL.createObjectURL(selectedFile);
      }
      
      if (editingImage) {
        dataService.updateGalleryImage(editingImage.id, {
          ...formData,
          imageUrl: finalImageUrl,
          isActive: editingImage.isActive
        });
        toast({
          title: "Image Updated",
          description: "Gallery image has been updated successfully",
        });
      } else {
        dataService.saveGalleryImage({
          ...formData,
          imageUrl: finalImageUrl,
          isActive: true
        });
        toast({
          title: "Image Added",
          description: "New gallery image has been added successfully",
        });
      }
      
      loadImages();
      resetForm();
      setIsAddDialogOpen(false);
      setEditingImage(null);
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      imageUrl: image.imageUrl
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        dataService.deleteGalleryImage(id);
        loadImages();
        toast({
          title: "Image Deleted",
          description: "Gallery image has been removed successfully",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete image. Please try again.",
          variant: "destructive"
        });
      }
    }
  };

  const toggleImageStatus = (id: string, isActive: boolean) => {
    try {
      dataService.updateGalleryImage(id, { isActive });
      loadImages();
      toast({
        title: "Status Updated",
        description: `Image ${isActive ? 'activated' : 'deactivated'} successfully`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update image status. Please try again.",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "events",
      imageUrl: ""
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "events":
        return "bg-orange-500";
      case "students":
        return "bg-green-500";
      case "campus":
        return "bg-blue-500";
      case "facilities":
        return "bg-purple-500";
      case "awards":
        return "bg-yellow-500";
      case "collaborations":
        return "bg-pink-500";
      case "student-success":
        return "bg-teal-500";
      case "sports-culture":
        return "bg-red-500";
      case "media":
        return "bg-indigo-500";
      case "government-relations":
        return "bg-cyan-500";
      case "cultural-events":
        return "bg-rose-500";
      case "community":
        return "bg-amber-500";
      case "special-moments":
        return "bg-lime-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="campus">Campus</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="awards">Awards</SelectItem>
                  <SelectItem value="collaborations">Collaborations</SelectItem>
                  <SelectItem value="student-success">Student Success</SelectItem>
                  <SelectItem value="sports-culture">Sports & Culture</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="government-relations">Government Relations</SelectItem>
                  <SelectItem value="cultural-events">Cultural Events</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="special-moments">Special Moments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Total Images</Label>
              <div className="flex items-center h-10 px-3 rounded-md border border-slate-200 bg-slate-50">
                <span className="text-sm font-medium">{filteredImages.length} images</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            localStorage.removeItem('globalpass_gallery_images');
            window.location.reload();
          }}>
            <Plus className="w-4 h-4 mr-2" />
            Refresh Images
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Image
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <div className="aspect-video bg-slate-100 relative">
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400x300?text=" + encodeURIComponent(image.title);
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge className={`${getCategoryColor(image.category)} text-white`}>
                  {image.category}
                </Badge>
              </div>
              <div className="absolute top-2 left-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white"
                  onClick={() => toggleImageStatus(image.id, !image.isActive)}
                >
                  {image.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{image.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-xs text-slate-500">
                  {new Date(image.timestamp).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(image)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-slate-300" />
          <h3 className="text-lg font-semibold mb-2">No images found</h3>
          <p className="text-sm mb-4">
            {searchTerm || categoryFilter !== "all" 
              ? "Try adjusting your filters" 
              : "Add your first image to get started"
            }
          </p>
          {!searchTerm && categoryFilter === "all" && (
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add First Image
            </Button>
          )}
        </div>
      )}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingImage ? 'Edit Image' : 'Add New Image'}</DialogTitle>
            <DialogDescription>
              {editingImage ? 'Update gallery image details' : 'Add a new image to gallery'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter image title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter image description"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="events">Events</SelectItem>
                  <SelectItem value="students">Students</SelectItem>
                  <SelectItem value="campus">Campus</SelectItem>
                  <SelectItem value="facilities">Facilities</SelectItem>
                  <SelectItem value="awards">Awards</SelectItem>
                  <SelectItem value="collaborations">Collaborations</SelectItem>
                  <SelectItem value="student-success">Student Success</SelectItem>
                  <SelectItem value="sports-culture">Sports & Culture</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="government-relations">Government Relations</SelectItem>
                  <SelectItem value="cultural-events">Cultural Events</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="special-moments">Special Moments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="Enter image URL or upload image below"
                disabled={!!selectedFile}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageFile">Upload Image</Label>
              <Input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {selectedFile && (
                <div className="mt-2 text-sm text-slate-600">
                  Selected: {selectedFile.name}
                </div>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingImage ? 'Update' : 'Add'} Image
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GalleryManagementSimple;
