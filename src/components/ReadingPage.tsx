import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Book } from '@/types';

// Import all story page images
import page1 from '../Images/story_mobile/1.png';
import page2 from '../Images/story_mobile/2.png';
import page3 from '../Images/story_mobile/3.png';
import page4 from '../Images/story_mobile/4.png';
import page5 from '../Images/story_mobile/5.png';
import page6 from '../Images/story_mobile/6.png';
import page7 from '../Images/story_mobile/7.png';
import page8 from '../Images/story_mobile/8.png';
import page9 from '../Images/story_mobile/9.png';
import page10 from '../Images/story_mobile/10.png';
import page11 from '../Images/story_mobile/11.png';
import page12 from '../Images/story_mobile/12.png';
import page13 from '../Images/story_mobile/13.png';
import page14 from '../Images/story_mobile/14.png';
import page15 from '../Images/story_mobile/15.png';
import page16 from '../Images/story_mobile/16.png';
import page17 from '../Images/story_mobile/17.png';
import page18 from '../Images/story_mobile/18.png';
import page19 from '../Images/story_mobile/19.png';
import page20 from '../Images/story_mobile/20.png';
import page21 from '../Images/story_mobile/21.png';
import page22 from '../Images/story_mobile/22.png';
import page23 from '../Images/story_mobile/23.png';
import page24 from '../Images/story_mobile/24.png';
import page25 from '../Images/story_mobile/25.png';
import page26 from '../Images/story_mobile/26.png';
import page27 from '../Images/story_mobile/27.png';
import page28 from '../Images/story_mobile/28.png';

interface ReadingPageProps {
  book: Book;
}

const storyPages = [
  page1, page2, page3, page4, page5, page6, page7, page8,
  page9, page10, page11, page12, page13, page14, page15, page16,
  page17, page18, page19, page20, page21, page22, page23, page24,
  page25, page26, page27, page28
];

export default function ReadingPage({ book }: ReadingPageProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = storyPages.length;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev < totalPages - 1) {
        return prev + 1;
      }
      return prev;
    });
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev > 0) {
        return prev - 1;
      }
      return prev;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPreviousPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'Home') {
        setCurrentPage(0);
      } else if (e.key === 'End') {
        setCurrentPage(totalPages - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [totalPages, goToNextPage, goToPreviousPage]);

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages) {
      setCurrentPage(pageIndex);
    }
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Page Image */}
          <div 
            className="w-full max-w-md"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden border-4 border-yellow-200/50">
              <img
                src={storyPages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="w-full h-auto object-contain"
                draggable={false}
              />
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

