import { defaultAxiosInstance } from "../instance";


type paramsType = {
  bookId: number;
  content: string;
  parentId: number | null;
  token?: string | null;
}

type returnType = number

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function postComment({bookId, content, parentId, token}: paramsType
): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: responseType } = await defaultAxiosInstance.post(
      `/book/comments/${bookId}`, { content, parentId, headers }
    );
    return data.data
  } catch (error) {
    throw error
  }
}


