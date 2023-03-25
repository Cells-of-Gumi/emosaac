import { defaultAxiosInstance } from "../instance";

import { AxiosResponse } from "axios";

type paramsType = {
  bookId: number;
}

type returnType = boolean

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function putHasBeenRead({bookId}: paramsType
  ): Promise<returnType | null> {
    try {
      const { data }: { data: responseType } = await defaultAxiosInstance.put(
        `/books/read-check/${bookId}`
      );
      return data.data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  