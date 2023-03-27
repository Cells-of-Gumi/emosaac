import { defaultAxiosInstance } from "./instance";

interface Search {
  status: number;
  message: string;
  data: {
    bookId: number;
    platform: number;
    thumbnail: string;
    title: string;
    author: string;
    href: string;
    score: number;
  }[];
}

async function getListByContent(
  type: string,
  content: string,
  prevId: number,
  prevScore: number,
  size: number,
  token: string | null
): Promise<
  | {
      bookId: number;
      platform: number;
      thumbnail: string;
      title: string;
      author: string;
      href: string;
      score: number;
    }[]
  | null
> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const { data }: { data: Search } = await defaultAxiosInstance.get(
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

async function getListByTagName(
  type: string,
  tagName: string,
  prevId: number,
  prevScore: number,
  size: number
): Promise<
  | {
      bookId: number;
      platform: number;
      thumbnail: string;
      title: string;
      author: string;
      href: string;
      score: number;
    }[]
  | null
> {
  try {
    const { data }: { data: Search } = await defaultAxiosInstance.get(
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

export { getListByContent, getListByTagName };
