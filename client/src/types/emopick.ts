
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