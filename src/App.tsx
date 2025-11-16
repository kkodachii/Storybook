import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import BookDetails from './components/BookDetails';
import ReadingPage from './components/ReadingPage';
import { Book } from './types';

// Sample book data - in a real app, this would come from an API or state management
const defaultBook: Book = {
  id: '1',
  title: 'ANG MAUSISANG PRINSESA',
  tagline: 'Ang banat Paneng an duan an',
  author: 'Anglyoug Pangain',
  illustrator: 'Pangaan ng Designer/Ilustrator',
  genre: 'Pantasya, Pang-edukasyon',
  isbn: '123-456750',
  printCount: '1,00 0',
  date: 'Oktubre 26, 2004',
  synopsis: `Sa kaharian ng Kaalam, kilala si Prinsesa Usisa ng karamihan sa likas niyang pagiging matanong. Sa araw ng kanyang ika-sampung kaarawan, niregaluhan siya ng kanyang mga nakatatandang kapatid ng isang libro. Librong anila'y sasagot sa mga katanungan ng prinsesa. Lingid sa kanyang kaalaman, ang libro pala ay may taglay na hiwaga, dahilan upang siya ay mapadpad sa kakatwang mundo ng Lumina. Isang lugar na mayroong mahiwagang batis, kalito-litong panahon, buhay na mga larawan, at ginintuang mga dahon. Doon, si Prinsesa Usisa, kasama ang kanyang gabay na kwago ay naglakbay tungo sa pagtuklas ng pagbabago, pagpapabuti, at pagkilala sa sarili. 
`,
  readingLevel: '10+',
  pages: 26,
  availableLanguages: 2550,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/home"
          element={
            <LandingPage
              book={defaultBook}
            />
          }
        />
        <Route
          path="/details"
          element={
            <BookDetails
              book={defaultBook}
            />
          }
        />
        <Route
          path="/read"
          element={
            <ReadingPage
              book={defaultBook}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
