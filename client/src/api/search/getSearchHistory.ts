import { defaultAxiosInstance } from "../instance";
import { returnSearchHistoryType, searchHistoryType } from "@/types/search";

type historyParamsType = {
  token?: string | null;
};

export async function getSearchHistory({
  token,
}: historyParamsType): Promise<returnSearchHistoryType[] | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: searchHistoryType } =
      await defaultAxiosInstance.get(`/search/latest-book`, { headers });
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
