import { defaultAxiosInstance } from "../instance";
import { searchBookType, returnSearchBooksType } from "@/types/search";

type searchBooksParamsType = {
  type: string;
  content: string;
  prevId: number;
  prevScore: number;
  size: number;
  token?: string | null;
};

export async function getListByContent({
  type,
  content,
  prevId,
  prevScore,
  size,
  token,
}: searchBooksParamsType): Promise<returnSearchBooksType[] | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: searchBookType } = await defaultAxiosInstance.get(
      `/search/title/${type}/${content}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`,
      { headers }
    );
    if (data.status === 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
