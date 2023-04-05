import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";


type paramsType = {
  day: string;
  typeCode: number;
  genreCode?: number;
  prevId?: number;
  prevScore?: number;
  size?: number;
  token?: string | null;
}

type returnType = returnBookContentType
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
}

export async function getBooksByDay({day, typeCode, genreCode, prevId, prevScore, size, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/books/day/${day}?typeCode=${typeCode}${genreCode !== undefined ? `&genreCode=${genreCode}` : ''}${prevId !== undefined ? `&prevId=${prevId}` : ''}${prevScore !== undefined ? `&prevScore=${prevScore}` : ''}${size !== undefined ? `&size=${size}` : ''}`,
      {
        headers,
      }
    );
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
