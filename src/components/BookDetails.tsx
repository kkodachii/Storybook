import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, BookOpen, CheckCircle, FileText, BookText, Globe, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Book } from '@/types';
import frontCover from '../Images/story_essentials/front_cover.png';

interface BookDetailsProps {
  book: Book;
}

const getReadStatusKey = (bookId: string) => `book_read_${bookId}`;

export default function BookDetails({ book }: BookDetailsProps) {
  const navigate = useNavigate();
  const [isSinopsisOpen, setIsSinopsisOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isMarkedAsRead, setIsMarkedAsRead] = useState(false);

  // Load read status from localStorage on mount
  useEffect(() => {
    const readStatus = localStorage.getItem(getReadStatusKey(book.id));
    setIsMarkedAsRead(readStatus === 'true');
  }, [book.id]);

  const handleMarkAsRead = () => {
    const newStatus = !isMarkedAsRead;
    setIsMarkedAsRead(newStatus);
    localStorage.setItem(getReadStatusKey(book.id), String(newStatus));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-yellow-50/30 w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-12">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/home')}
          className="mb-4 sm:mb-6 lg:mb-10 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Book Cover */}
            <div className="flex justify-center lg:justify-start">
              <Card className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[350px] lg:max-w-[460px] shadow-xl border-2 border-yellow-200/50 overflow-hidden hover:shadow-2xl hover:border-yellow-300/50 transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-0">
                  <img
                    src={frontCover}
                    alt={book.title}
                    className="w-full h-auto"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Synopsis */}
            <Card className="bg-gradient-to-br from-white to-yellow-50/20 border-2 border-yellow-100 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <button
                  onClick={() => setIsSinopsisOpen(!isSinopsisOpen)}
                  className="w-full flex items-center justify-between gap-2 sm:gap-3 mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <BookText className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 text-left">Sinopsis</h2>
                  </div>
                  {isSinopsisOpen ? (
                    <ChevronUp className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  )}
                </button>
                {isSinopsisOpen && (
                  <div className="mt-3 transition-all duration-200 ease-in-out">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {book.synopsis}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Title */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 lg:mb-6 leading-tight pl-3 sm:pl-4">
                {book.title}
              </h1>
            </div>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
              {book.genre.split(',').map((genre, index) => (
                <span
                  key={index}
                  className="px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs sm:text-sm font-medium rounded-full shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 cursor-default"
                >
                  {genre.trim()}
                </span>
              ))}
            </div>

            {/* Book Stats */}
            <Card className="bg-gradient-to-br from-yellow-50/50 to-white border-2 border-yellow-100 shadow-md">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                    <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium leading-tight">Age Range</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{book.readingLevel ?? 6}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                    <BookText className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium leading-tight">Pages</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{book.pages ?? 26}</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                    <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 mx-auto mb-1 sm:mb-2" />
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-1 font-medium leading-tight">Word Count</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">{book.availableLanguages ?? 1}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3">
              <Button
                onClick={() => navigate('/read')}
                className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 text-sm sm:text-base"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Read
              </Button>
              <Button
                onClick={handleMarkAsRead}
                variant={isMarkedAsRead ? "default" : "outline"}
                className={`w-full sm:w-auto border-2 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 text-sm sm:text-base ${
                  isMarkedAsRead
                    ? "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white border-yellow-500"
                    : "border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:border-yellow-400 hover:text-yellow-700"
                }`}
              >
                <CheckCircle className={`mr-2 h-4 w-4 ${isMarkedAsRead ? "fill-white" : ""}`} />
                {isMarkedAsRead ? "Marked as Read" : "Mark as Read"}
              </Button>
            </div>

            {/* Credits Section */}
            <Card className="shadow-lg border-2 border-yellow-100 bg-gradient-to-br from-white to-yellow-50/30 mt-4 sm:mt-6 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <button
                  onClick={() => setIsCreditsOpen(!isCreditsOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
                    <span className="text-base sm:text-lg font-bold text-gray-900 text-left">Malikhaing Gawa ng Ika-Limang Grupo</span>
                  </div>
                  {isCreditsOpen ? (
                    <ChevronUp className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  )}
                </button>
                {isCreditsOpen && (
                  <div className="mt-3 sm:mt-4 transition-all duration-200 ease-in-out space-y-3 sm:space-y-4 text-xs sm:text-sm">
                    <div className="p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                      <p className="font-semibold text-gray-800 mb-1">Punong Patnugot</p>
                      <p className="text-gray-700 leading-relaxed">Jehiel Sta. Ana</p>
                    </div>
                    
                    <div className="p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                      <p className="font-semibold text-gray-800 mb-1">Ideya nina:</p>
                      <p className="text-gray-700 leading-relaxed">Francheska Sabroso at Chricia Medrano</p>
                    </div>

                    <div className="p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                      <p className="font-semibold text-gray-800 mb-1">Isinaayos nina:</p>
                      <p className="text-gray-700 leading-relaxed">Gwen Bruzola, Angelica Ledres, at Chricia Medrano</p>
                    </div>

                    <div className="p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                      <p className="font-semibold text-gray-800 mb-1">Isinulat nina:</p>
                      <p className="text-gray-700 leading-relaxed">Jehiel Sta. Ana, Yeisha Lorenzo, at Lesly Ann Boco</p>
                    </div>

                    <div className="p-2 sm:p-3 rounded-lg bg-white/60 hover:bg-white/80 transition-colors">
                      <p className="font-semibold text-gray-800 mb-1">Iginuhit nina:</p>
                      <p className="text-gray-700 leading-relaxed">Francheska Sabroso at Juliana De Pano</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* References Section */}
            <Card className="shadow-lg border-2 border-yellow-100 bg-gradient-to-br from-white to-yellow-50/30 mt-4 sm:mt-6 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-4 sm:p-6">
                <button
                  onClick={() => setIsReferencesOpen(!isReferencesOpen)}
                  className="w-full flex items-center justify-between gap-2 mb-0 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-gray-900 text-left">Mga Sanggunian</span>
                  </div>
                  {isReferencesOpen ? (
                    <ChevronUp className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  )}
                </button>
                {isReferencesOpen && (
                  <div className="mt-3 sm:mt-4 transition-all duration-200 ease-in-out">
                    <div className="space-y-3 text-gray-700 leading-relaxed text-xs sm:text-sm">
                      <p>iStock. (n.d.). Castle with majestic palace architecture and fairytale-like forest scenery [Vector illustration]. iStock. <a href="https://www.istockphoto.com/vector/castle-with-majestic-palace-architecture-and-fairytale-like-forest-scenery-in-gm1384444679-443752310" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://www.istockphoto.com/vector/castle-with-majestic-palace-architecture-and-fairytale-like-forest-scenery-in-gm1384444679-443752310</a></p>
                      
                      <p>Mahindru, A., Patil, P., & Agrawal, V. (2023). Role of Physical Activity on Mental Health and Well-Being: A review. Cureus, 15(1), e33475. <a href="https://doi.org/10.7759/cureus.33475" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline">https://doi.org/10.7759/cureus.33475</a></p>
                      
                      <p>Mph, C. M. R. (2024, July 9). Signs of puberty: What happens to your body? Verywell Health. <a href="https://www.verywellhealth.com/puberty-8658933" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://www.verywellhealth.com/puberty-8658933</a></p>
                      
                      <p>Norris, S. A., Frongillo, E. A., Black, M. M., Dong, Y., Fall, C., Lampl, M., Liese, A. D., Naguib, M., Prentice, A., Rochat, T., Stephensen, C. B., Tinago, C. B., Ward, K. A., Wrottesley, S. V., & Patton, G. C. (2021). Nutrition in adolescent growth and development. The Lancet, 399(10320), 172–184. <a href="https://doi.org/10.1016/s0140-6736(21)01590-7" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline">https://doi.org/10.1016/s0140-6736(21)01590-7</a></p>
                      
                      <p>Parajuli, J., & Prangthip, P. (2025). Adolescent Nutrition and Health: a Critical Period for Nutritional Intervention to Prevent Long Term Health Consequences. Current Nutrition Reports, 14(1), 116. <a href="https://doi.org/10.1007/s13668-025-00706-4" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline">https://doi.org/10.1007/s13668-025-00706-4</a></p>
                      
                      <p>Physical changes in puberty. (2024, May 22). Raising Children Network. <a href="https://raisingchildren.net.au/pre-teens/development/puberty-sexual-development/physical-changes-in-puberty" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://raisingchildren.net.au/pre-teens/development/puberty-sexual-development/physical-changes-in-puberty</a></p>
                      
                      <p>PNGTree. (n.d.). Classic decorative outdoor fountain [Image]. PNGTree. <a href="https://pngtree.com/freepng/classic-decorative-outdoor-fountain_19967214.html" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://pngtree.com/freepng/classic-decorative-outdoor-fountain_19967214.html</a></p>
                      
                      <p>PNGTree. (n.d.). Royal castle cartoon colored clipart illustration [Vector graphic]. PNGTree. <a href="https://pngtree.com/freepng/royal-castle-cartoon-colored-clipart-illustration-colored-flag-architecture-vector_12594531.html" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://pngtree.com/freepng/royal-castle-cartoon-colored-clipart-illustration-colored-flag-architecture-vector_12594531.html</a></p>
                      
                      <p>Saxon, S. (2025, August 13). Do Women Have Adam's Apples? Saxon MD Facial Plastic Surgery. <a href="https://saxonmd.com/blog/do-women-have-an-adams-apple/" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://saxonmd.com/blog/do-women-have-an-adams-apple/</a></p>
                      
                      <p>Vecteezy. (n.d.). Gift box outline [Vector graphic]. Vecteezy. <a href="https://www.vecteezy.com/free-vector/gift-box-outline" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline break-all">https://www.vecteezy.com/free-vector/gift-box-outline</a></p>
                      
                      <p>Viner, R. M., Allen, N. B., & Patton, G. C. (2017). Puberty, developmental processes, and health interventions. In The World Bank eBooks (pp. 107–118). <a href="https://doi.org/10.1596/978-1-4648-0423-6_ch9" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline">https://doi.org/10.1596/978-1-4648-0423-6_ch9</a></p>
                      
                      <p>Warren, M. P., & Brooks-Gunn, J. (1989). Mood and Behavior at Adolescence: Evidence for hormonal factors*. The Journal of Clinical Endocrinology & Metabolism, 69(1), 77–83. <a href="https://doi.org/10.1210/jcem-69-1-77" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700 underline">https://doi.org/10.1210/jcem-69-1-77</a></p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
