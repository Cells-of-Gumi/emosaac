import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";


type paramsType = {
  order: number;
  typeCode: number;
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

export async function getTop3GenreBooks({order, typeCode, prevId, prevScore, size, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const query1 = prevId !== undefined ? `&prevId=${prevId}` : ''
    const query2 = prevScore !== undefined ? `&prevScore=${prevScore}` : ''
    const query3 = size !== undefined ? `&size=${size}` : ''


    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      
      `/genres/total/like?typeCode=${typeCode}&order=${order}${query1}${query2}${query3}`,
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
