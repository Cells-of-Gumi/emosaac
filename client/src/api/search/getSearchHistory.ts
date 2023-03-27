import { defaultAxiosInstanceForTest } from "../instance";
import { returnSearchHistoryType, searchHistoryType } from "@/types/search";

export async function getSearchHistory(): Promise<
  returnSearchHistoryType[] | null
> {
  try {
    const { data }: { data: searchHistoryType } =
      await defaultAxiosInstanceForTest.get(`/search/latest-book`);
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
