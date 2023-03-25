import { defaultAxiosInstance } from "../instance";

import { AxiosResponse } from "axios";

type paramsType = {
  bookId: number;
  score: number;
}

type returnType = number

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function putBookRating({bookId, score}: paramsType
  ): Promise<returnType | null> {
    try {
      const { data }: { data: responseType } = await defaultAxiosInstance.put(
        `/books/score/${bookId}?score=${score}`
      );
      return data.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  