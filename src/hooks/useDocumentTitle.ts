import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    
    // Cleanup function to restore the previous title if component unmounts
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};