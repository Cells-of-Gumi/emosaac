import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";


type paramsType = {
  bookId: number;
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

// bookId = 0 -> 사용자가 최근 읽은 작품과 유사한 작품 추천

export async function getRelative({bookId, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }


    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      
      `/recommend/item?bookId=${bookId}`,
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
