// import { defaultAxiosInstance } from "../instance";

// import { AxiosResponse } from "axios";

// type bookDataType = {
//     "bookId": number,
//     "platform": number,
//     "thumbnail": string,
//     "title": string,
//     "author": string,
//     "href": string,
//     "story": string,
//     "tag": string,
//     "genre": string,
//     "regist": string,
//     "grade": string,
//     "avgScore": number,
//     "hit": number,
//     "day": string,
//     "bookmark": boolean,
//     "read": boolean,
//     "myScore": number
// }[]

// interface bookDataResponse {
//   status: number;
//   message: string;
//   data: bookDataType;
// }

// // export async function getBookDetail(
// //   bookId: number
// // ): Promise<bookDataType | null> {
// //   try {
// //     const { data }: { data: bookDataResponse } = await defaultAxiosInstance.get(
// //       `/books/${bookId}`
// //     );
// //     if (data.status === 200) {
// //       return data.data;
// //     } else {
// //       return null;
// //     }
// //   } catch (error) {
// //     console.log(error);
// //     throw error
// //   }
// // }

// import axios from "axios";

// export const getBookDetail = async (bookId: number): Promise<bookDataType> => {
//   return await axios({
//     method: "get",
//     url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/books/${bookId}`,
//     headers: {
//       Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwiaWF0IjoxNjc5MzU5MDQwLCJleHAiOjE2ODAyMjMwNDB9.5rJDelPFgBQRZclfOF5KE7teD-xIKTGyMkPEw7BQRJtETqM36wUqOaEnmNN12cIwz1drC9SOo03gLshlqGhuLw",
//     },
//   }).then((res: AxiosResponse<bookDataResponse>) => {
//     return res.data.data;
//   });
// };

import { defaultAxiosInstance } from "../instance";
import { bookDetailType } from "@/types/books";

type paramsType = {
  bookId: number;
};

type returnType = bookDetailType;
// type returnType = {
//     "content": bookContentType[];
//     "page": number;
//     "size": number;
//     "first": boolean;
//     "last": boolean;
//     "hasNext": boolean;
// }

type responseType = {
  status: number;
  message: string;
  data: returnType;
};

export async function getBookDetail({
  bookId,
  token,
}: {
  bookId: string;
  token?: string | null;
}): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/books/${bookId}`,
      {
        headers,
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function getBookDetail({bookId}: paramsType
// ): Promise<returnType | null> {
//   try {
//     const { data }: { data: responseType } = await defaultAxiosInstance.get(
//       `/books/${bookId}`
//     );
//     return data.data
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }
