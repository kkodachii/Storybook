export interface Story {
  id: string;
  author: string;
  designer: string;
  reference: string;
  story: string;
  createdAt: Date;
}

export interface Book {
  id: string;
  title: string;
  tagline: string;
  author: string;
  illustrator: string;
  genre: string;
  isbn: string;
  printCount?: string;
  date: string;
  synopsis: string;
  coverImage?: string;
}
