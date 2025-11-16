import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Info } from 'lucide-react';
import { Book } from '@/types';
import mainCover from '../Images/story_essentials/main_cover.png';

interface LandingPageProps {
  book: Book;
}

export default function LandingPage({ book }: LandingPageProps) {
  const navigate = useNavigate();
  const [currentBook, setCurrentBook] = useState<Book>(book);

  useEffect(() => {
    setCurrentBook(book);
  }, [book]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Main Hero Section */}
      <div className="relative h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${mainCover})`,
          }}
        >
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/30 to-transparent"></div>
        </div>

        {/* Content Overlay - Right Side Bottom */}
        <div className="relative z-10 w-full h-full flex items-end justify-end pr-6 lg:pr-12 xl:pr-20 pb-7">
          <div className="max-w-xl text-right">
            {/* Genre Badges */}
            <div className="flex items-center justify-end gap-2 mb-3 flex-wrap">
              {currentBook.genre.split(',').map((genre, index) => (
                <span
                  key={index}
                  className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 cursor-default"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Synopsis */}
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              {currentBook.synopsis.length > 120 
                ? `${currentBook.synopsis.substring(0, 120)}...` 
                : currentBook.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4">
              {/* Read Button */}
              <Button
                onClick={() => navigate('/read')}
                className="h-14 w-14 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/50 backdrop-blur-sm flex items-center justify-center p-0 transition-all hover:scale-110"
              >
                <BookOpen className="h-6 w-6 text-white fill-white" />
              </Button>

              {/* See More Button */}
              <Button
                onClick={() => navigate('/details')}
                variant="outline"
                className="h-12 px-6 bg-white/10 hover:bg-white/20 border-2 border-white/50 backdrop-blur-sm text-white hover:text-white font-semibold flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>See More</span>
                <div className="h-6 w-6 rounded-full border-2 border-white flex items-center justify-center">
                  <Info className="h-3 w-3" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
