import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";


type paramsType = {
  typeCode: number;
  prevId?: number;
  prevRegist?: string;
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

export async function getReleased({typeCode, prevId, prevRegist, size, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const query1 = prevId !== undefined ? `&prevId=${prevId}` : ''
    const query2 = prevRegist !== undefined ? `&prevScore=${prevRegist}` : ''
    const query3 = size !== undefined ? `&size=${size}` : ''


    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      
      `/recommend/newbook?typeCd=${typeCode}${query1}${query2}${query3}`,
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
