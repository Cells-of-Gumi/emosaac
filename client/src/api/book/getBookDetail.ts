

import { defaultAxiosInstance } from "../instance";
import { bookDetailType } from "@/types/books";

type paramsType = {
  bookId: number;
  token?: string | null;
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
}: paramsType): Promise<returnType | null> {
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
