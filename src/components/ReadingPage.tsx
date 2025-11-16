import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';
import { Book } from '@/types';

// Import mobile story page images
import mobilePage1 from '../Images/story_mobile/1.png';
import mobilePage2 from '../Images/story_mobile/2.png';
import mobilePage3 from '../Images/story_mobile/3.png';
import mobilePage4 from '../Images/story_mobile/4.png';
import mobilePage5 from '../Images/story_mobile/5.png';
import mobilePage6 from '../Images/story_mobile/6.png';
import mobilePage7 from '../Images/story_mobile/7.png';
import mobilePage8 from '../Images/story_mobile/8.png';
import mobilePage9 from '../Images/story_mobile/9.png';
import mobilePage10 from '../Images/story_mobile/10.png';
import mobilePage11 from '../Images/story_mobile/11.png';
import mobilePage12 from '../Images/story_mobile/12.png';
import mobilePage13 from '../Images/story_mobile/13.png';
import mobilePage14 from '../Images/story_mobile/14.png';
import mobilePage15 from '../Images/story_mobile/15.png';
import mobilePage16 from '../Images/story_mobile/16.png';
import mobilePage17 from '../Images/story_mobile/17.png';
import mobilePage18 from '../Images/story_mobile/18.png';
import mobilePage19 from '../Images/story_mobile/19.png';
import mobilePage20 from '../Images/story_mobile/20.png';
import mobilePage21 from '../Images/story_mobile/21.png';
import mobilePage22 from '../Images/story_mobile/22.png';
import mobilePage23 from '../Images/story_mobile/23.png';
import mobilePage24 from '../Images/story_mobile/24.png';
import mobilePage25 from '../Images/story_mobile/25.png';
import mobilePage26 from '../Images/story_mobile/26.png';
import mobilePage27 from '../Images/story_mobile/27.png';
import mobilePage28 from '../Images/story_mobile/28.png';

// Import web story page images (landscape, combined pages)
import webPage1 from '../Images/story_web/1.png';
import webPage2 from '../Images/story_web/2.png';
import webPage3 from '../Images/story_web/3.png';
import webPage4 from '../Images/story_web/4.png';
import webPage5 from '../Images/story_web/5.png';
import webPage6 from '../Images/story_web/6.png';
import webPage7 from '../Images/story_web/7.png';
import webPage8 from '../Images/story_web/8.png';
import webPage9 from '../Images/story_web/9.png';
import webPage10 from '../Images/story_web/10.png';
import webPage11 from '../Images/story_web/11.png';
import webPage12 from '../Images/story_web/12.png';
import webPage13 from '../Images/story_web/13.png';

interface ReadingPageProps {
  book: Book;
}

const mobilePages = [
  mobilePage1, mobilePage2, mobilePage3, mobilePage4, mobilePage5, mobilePage6, mobilePage7, mobilePage8,
  mobilePage9, mobilePage10, mobilePage11, mobilePage12, mobilePage13, mobilePage14, mobilePage15, mobilePage16,
  mobilePage17, mobilePage18, mobilePage19, mobilePage20, mobilePage21, mobilePage22, mobilePage23, mobilePage24,
  mobilePage25, mobilePage26, mobilePage27, mobilePage28
];

const webPages = [
  mobilePage1, // First page from mobile
  webPage1, webPage2, webPage3, webPage4, webPage5, webPage6, webPage7, webPage8,
  webPage9, webPage10, webPage11, webPage12, webPage13,
  mobilePage28 // Last page from mobile
];

export default function ReadingPage({ book }: ReadingPageProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Detect if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use appropriate pages based on screen size
  const storyPages = isMobile ? mobilePages : webPages;
  const totalPages = storyPages.length;

  // Reset page when switching between mobile/web views
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(0);
    }
  }, [isMobile, totalPages, currentPage]);

  // Preload all images for faster loading and caching
  useEffect(() => {
    const preloadImages = (imageArray: string[]) => {
      imageArray.forEach((src) => {
        const img = new Image();
        img.src = src;
        // Store in browser cache by loading the image
        img.onload = () => {
          // Image loaded and cached in browser's HTTP cache
        };
        img.onerror = () => {
          // Handle error silently
        };
      });
    };

    // Preload all images in the background
    // This will cache them in the browser's HTTP cache for faster subsequent loads
    // The browser will automatically use cached versions on next visit
    preloadImages(mobilePages);
    preloadImages(webPages);
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      const pages = isMobile ? mobilePages : webPages;
      if (prev < pages.length - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [isMobile]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    if (!imageContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await imageContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Exit fullscreen with ESC key
      if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        goToPreviousPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'Home') {
        setCurrentPage(0);
      } else if (e.key === 'End') {
        const pages = isMobile ? mobilePages : webPages;
        setCurrentPage(pages.length - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isMobile, goToNextPage, goToPreviousPage, isFullscreen, toggleFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNextPage();
    }
    if (isRightSwipe) {
      goToPreviousPage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 w-full">
      {/* Header with Navigation */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-yellow-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            <Button
              onClick={() => navigate('/details')}
              variant="ghost"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            {/* Book Title */}
            <div className="flex-1 text-center">
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                {book.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Reading Area */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Page Image */}
          <div 
            ref={imageContainerRef}
            className={`w-full ${
              isMobile 
                ? 'max-w-full' 
                : (currentPage === 0 || currentPage === webPages.length - 1)
                  ? 'max-w-sm' 
                  : 'max-w-3xl'
            } ${isFullscreen ? 'bg-black flex items-center justify-center p-4' : ''}`}
            style={isFullscreen ? { width: '100vw', height: '100vh' } : {}}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className={`relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-yellow-200/50 ${isFullscreen ? 'w-full h-full flex items-center justify-center' : ''}`}>
              <img
                src={storyPages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className={`${isFullscreen ? 'max-w-full max-h-full object-contain' : 'w-full h-auto object-contain'}`}
                draggable={false}
              />
              {/* Fullscreen Toggle Button */}
              {!isMobile && (
                <Button
                  onClick={toggleFullscreen}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0 rounded-full p-2 h-10 w-10 z-10"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize className="h-5 w-5" />
                  ) : (
                    <Maximize className="h-5 w-5" />
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Page Indicator */}
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-md border border-yellow-100">
              <span className="text-sm sm:text-base font-medium text-gray-700 min-w-[80px] text-center">
                {currentPage + 1} / {totalPages}
              </span>
            </div>
          </div>

          {/* Navigation Controls - Hidden on mobile */}
          <div className="hidden sm:flex items-center justify-center gap-4 w-full max-w-4xl">
            {/* Previous Button */}
            <Button
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              Previous
            </Button>

            {/* Next Button */}
            <Button
              onClick={goToNextPage}
              disabled={currentPage === totalPages - 1}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Swipe Instruction */}
          <div className="sm:hidden text-xs text-gray-500 text-center mt-2 px-4">
            <p>Swipe left or right to navigate</p>
          </div>

          {/* Desktop Keyboard Shortcuts Hint */}
          <div className="hidden sm:block text-xs sm:text-sm text-gray-500 text-center mt-2">
            <p>Use ← → arrow keys to navigate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

