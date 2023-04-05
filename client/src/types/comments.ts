export type CommentType = {
  "commentId": number;
  "content": string;
  "writerInfo": {
      "userId": string;
      "nickname": string;
      "profileImg": string;
  },
  "parentWriterNickName": string | null;
  "depth": number;
  "createdDate": string;
  "modifiedDate": string;
  "isDelete": boolean;
  "isChild": boolean;
  "likeStatusSize": number;
  "likeState": boolean;
  "totalCount": number;
  }

export type returnCommentArrayType = CommentType[]

// export type returnCommentArrayType = {
//     "commentId": number;
//     "content": string;
//     "writerInfo": {
//       "userId": string;
//       "nickname": string;
//       "profileImg": string;
//     },
//     "parentWriterNickName": string | null;
//     "depth": number;
//     "createdDate": string;
//     "modifiedDate": string;
//     "isDelete": boolean;
//     "isChild": boolean;
//     "likeStatusSize": number;
//     "likeState": boolean;
//   }[]

  


export type likeCommentType = {
  "commentId": number;
  "likeState": boolean;
  "likeCount": number;
}