// Utility to clear gallery cache and reload with all images
import { dataService } from "@/services/dataService";

export const clearGalleryCache = () => {
  // Clear gallery images from localStorage
  localStorage.removeItem('globalpass_gallery_images');
  
  // Reload the page to refresh with new default images
  window.location.reload();
};

// Run this function in browser console to clear gallery cache:
// clearGalleryCache();
console.log('Gallery cache cleared! Run clearGalleryCache() in console to refresh images.');
