import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";

type paramsType = {
  typeCd: number;
  prevId?: number;
  prevRegist?: string;
  size?: number;
  token?: string | null;
};

type returnType = returnBookContentType;

type responseType = {
  status: number;
  message: string;
  data: returnType;
};

export async function getNewBooksForPlatform({
  prevId,
  prevRegist,
  size,
  typeCd,
  token,
}: paramsType): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/recommend/newbook?${
        prevId !== undefined ? `prevId=${prevId}` : "prevId=20000"
      }${prevRegist !== undefined ? `&prevRegist=${prevRegist}` : ""}${
        size !== undefined ? `&size=${size}` : ""
      }&typeCd=${typeCd}`,
      {
        headers,
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
