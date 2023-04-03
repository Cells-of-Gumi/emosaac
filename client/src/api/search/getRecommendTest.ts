import { defaultAxiosInstance } from "../instance";
import { searchBookType, returnSearchBooksType } from "@/types/search";

type getRecommendParamsType = {
  typeCode: number;
  token?: string | null;
};

export async function getRecommendTest({
  typeCode,
  token,
}: getRecommendParamsType): Promise<returnSearchBooksType[] | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: searchBookType } = await defaultAxiosInstance.get(
      `/recommend/md?typeCode=${typeCode}`,
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
