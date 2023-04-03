import { defaultAxiosInstance } from "../instance";

type getEmopickParamsType = {
  emopickId: number;
  token?: string | null;
};

type emopickReviewType = {
  bookId: number;
  platform: number;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  genre: string;
  regist: string;
  grade: string;
  avgScore: number;
  reveiw: string;
};

type returnEmopickType = {
  writerInfo: {
    userId: number;
    nickname: string;
    profileImg: string;
  };
  emopickId: number;
  title: string;
  content: string;
  thumbnails: string;
  emoLike: boolean;
  likeCnt: number;
  bookCnt: number;
  createdDate: string;
  modifiedDate: string;
  webtoon: emopickReviewType[];
  novel: emopickReviewType[];
};

type emopickType = {
  status: number;
  message: string;
  data: returnEmopickType;
};

export async function getEmopickDetail({
  emopickId,
  token,
}: getEmopickParamsType): Promise<returnEmopickType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.get(
      `/emopicks/like/${emopickId}`,
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
