import { defaultAxiosInstanceForTest } from "../instance";
import { searchBookType, returnSearchBooksType } from "@/types/search";

type searchBooksParamsType = {
  type: string;
  content: string;
  prevId: number;
  prevScore: number;
  size: number;
};

export async function getListByContent({
  type,
  content,
  prevId,
  prevScore,
  size,
}: searchBooksParamsType): Promise<returnSearchBooksType[] | null> {
  try {
    const { data }: { data: searchBookType } =
      await defaultAxiosInstanceForTest.get(
        `/search/title/${type}/${content}?prevId=${prevId}&prevScore=${prevScore}&size=${size}`
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
