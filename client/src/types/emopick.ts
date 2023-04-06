
export type emopickContentType = {
    writerInfo: {
      userId: number;
      nickname: string;
      profileImg: string;
    };
    emopickId: number;
    title: string;
    thumbnails: string;
    likeCnt: number;
    bookCnt: number;
    createdDate: string;
    modifiedDate: string;
  };

//   export type emopickReturnType = {
//     writerInfo: {
//       userId: number;
//       nickname: string;
//       profileImg: string;
//     };
//     emopickId: number;
//     title: string;
//     thumbnails: string;
//     likeCnt: number;
//     bookCnt: number;
//     createdDate: string;
//     modifiedDate: string;
//   };


  export type returnEmopickType = {
    content: emopickContentType[];
    page: number;
    size: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
  };




  export type emopickDetailReviewType = {
    bookId: number;
    platform: number;
    thumbnail: string;
    title: string;
    author: string;
    href: string;
    genre: string;
    regist: string;
    grade: string;
    avgScore: number;
    review: string;
  };
  
  export type returnEmopickDetailType = {
    writerInfo: {
      userId: number;
      nickname: string;
      profileImg: string;
    };
    emopickId: number;
    title: string;
    content: string;
    thumbnails: string;
    emoLike: boolean;
    likeCnt: number;
    bookCnt: number;
    createdDate: string;
    modifiedDate: string;
    webtoon: emopickDetailReviewType[];
    novel: emopickDetailReviewType[];
  };