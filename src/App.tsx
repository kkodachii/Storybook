import { useState } from 'react';
import LandingPage from './components/LandingPage';
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
  printCount: '1,000',
  date: 'Oktubre 26, 2004',
  synopsis: `Si Usisa ay isang prinsesa sa kaharian ng Kaalam. Siya ay kilala ng karamihan sa likas niyang pagiging matanong. Sa araw ng ika-sampung kaarawan niya, niregaluhan siya ng kanyang mga nakatatandang kapatid ng isang kakaibang aklat na anila'y makakatulong sumagot sa kanyang mga katanungan. Ngunit lingid sa kanyang kaalaman, ang libro ay may taglay na hiwaga.`,
};

function App() {
  const [book] = useState<Book>(defaultBook);

  const handleReadStory = () => {
    // Navigate to read story page or open modal
    alert('Opening story reader...');
  };

  const handleBuyNow = () => {
    // Navigate to purchase page or open purchase modal
    alert('Redirecting to purchase page...');
  };

  return (
    <LandingPage
      book={book}
      onReadStory={handleReadStory}
      onBuyNow={handleBuyNow}
    />
  );
}

export default App;
