import { defaultAxiosInstanceForTest } from "../instance";
import { searchBookType, returnSearchBooksType } from "@/types/search";

type searchBooksParamsType = {
  type: string;
  tagName: string;
  prevId: number;
  prevScore: number;
  size: number;
};

export async function getListByTagName({
  type,
  tagName,
  prevId,
  prevScore,
  size,
}: searchBooksParamsType): Promise<returnSearchBooksType[] | null> {
  try {
    const { data }: { data: searchBookType } =
      await defaultAxiosInstanceForTest.get(
        `/search/tag/${type}/${tagName}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`
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
