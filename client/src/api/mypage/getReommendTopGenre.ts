import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";

type paramsType = {
  typeCode: number;
  count?: number;
  isLike?: number;
  token?: string | null;
};

type returnType = bookContentType[];

type responseType = {
  status: number;
  message: string;
  data: returnType;
};

export async function getRecommendTopGenre({
  typeCode,
  count,
  isLike,
  token,
}: paramsType): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const query1 = count !== undefined ? `&count=${count}` : "";
    const query2 = isLike !== undefined ? `&isLike=${isLike}` : "";


    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/genres/total/one?typeCode=${typeCode}${query1}${query2}`,
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
