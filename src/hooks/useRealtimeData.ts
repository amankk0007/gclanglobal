import { useState, useEffect } from 'react';
import { dataService } from '@/services/dataService';

export const useRealtimeData = () => {
  const [, forceUpdate] = useState({});

  const refreshData = () => {
    forceUpdate({});
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalpass_contact_forms' || 
          e.key === 'globalpass_apply_forms' || 
          e.key === 'globalpass_admission_forms' ||
          e.key === 'globalpass_gallery_images') {
        refreshData();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { refreshData };
};
