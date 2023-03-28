import { defaultAxiosInstance } from "../instance";
import { returnCommentArrayType } from "@/types/comments";


type paramsType = {
  bookId: number;
  criteria?: 'date' | 'like';
  offset?: number;
  size?: number;
  token?: string | null;
}

type returnType = returnCommentArrayType
// type returnType = {
//   "commentId": number;
//   "content": string;
//   "writerInfo": {
//     "userId": string;
//     "nickname": string;
//     "profileImg": string;
//   },
//   "parentWriterNickName": string | null;
//   "depth": number;
//   "createdDate": string;
//   "modifiedDate": string;
//   "isDelete": boolean;
//   "isChild": boolean;
// }[]

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function getParentComments({bookId, criteria, offset, size, token }: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/book/comments/parent/${bookId}${criteria !== undefined ? `?criteria=${criteria}` : ''}${offset !== undefined ? `&offset=${offset}` : ''}${size !== undefined ? `&size=${size}` : ''}`,
      {
        headers,
      }
    );
    return data.data
  } catch (error) {
    throw error
  }
}


