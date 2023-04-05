import { defaultAxiosInstance } from "../instance";

import { AxiosResponse } from "axios";

type paramsType = {
  bookId: number;
  score: number;
  token?: string | null;
}

type returnType = number

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function putBookRating({bookId, score, token}: paramsType
  ): Promise<returnType | null> {
    try {
      const headers: any = {};
      if (token) {
        headers.Authorization = token;
      }
      
      const { data }: { data: responseType } = await defaultAxiosInstance.put(
        `/books/score/${bookId}?score=${score}`,
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
  