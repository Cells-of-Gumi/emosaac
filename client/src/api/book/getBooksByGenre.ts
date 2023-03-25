import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";


type paramsType = {
  genreCode: number;
  typeCode: number;
  prevId?: number;
  prevScore?: number;
  size?: number;
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

export async function getBooksByGenre({genreCode, typeCode, prevId, prevScore, size}: paramsType
): Promise<returnType | null> {
  try {
    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/books/genre/${genreCode}?typeCode=${typeCode}${prevId !== undefined ? `&prevId=${prevId}` : ''}${prevScore !== undefined ? `&prevScore=${prevScore}` : ''}${size !== undefined ? `&size=${size}` : ''}`
    );
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
