import { defaultAxiosInstance } from "../instance";
import { emopickContentType } from "@/types/emopick";


type paramsType = {
  prevId: number;
  size: number;
  token?: string | null;
  
}

type returnType = emopickContentType[]


type responseType = {
  status: number;
  message: string;
  data: returnType;
}

// bookId = 0 -> 사용자가 최근 읽은 작품과 유사한 작품 추천

export async function getLikedEmopick({prevId, size, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }


    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      
      `/emopicks/me/like?prevId=${prevId}&size=${size}`,
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
