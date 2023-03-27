import { defaultAxiosInstance } from "../instance";

import { AxiosResponse } from "axios";

type paramsType = {
  bookId: number;
  token?: string | null;
}

type returnType = boolean

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function putBookmark({bookId, token}: paramsType
  ): Promise<returnType | null> {
    try {
      const headers: any = {};
      if (token) {
        headers.Authorization = token;
      }

      const { data }: { data: responseType } = await defaultAxiosInstance.put(
        `/books/bookmark/${bookId}`,
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
  