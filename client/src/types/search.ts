export type returnSearchHistoryType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
  hit: number;
  regist: string;
  genreId: number;
  genreName: string;
  typeCd: number;
};

export type searchHistoryType = {
  status: number;
  message: string;
  data: returnSearchHistoryType[];
};

export type searchBookType = {
  status: number;
  message: string;
  data: {
    bookId: number;
    platform: number;
    thumbnail: string;
    title: string;
    author: string;
    href: string;
    score: number;
  }[];
};

export type returnSearchBooksType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  score: number;
};
