import { defaultAxiosInstance } from "../instance";

type getEmopickParamsType = {
  prevId: number;
  size: number;
  token?: string | null;
};

type emopickInfoType = {
  writerInfo: {
    userId: number;
    nickname: string;
    profileImg: string;
  };
  emopickId: number;
  title: string;
  thumbnails: string;
  likeCnt: number;
  bookCnt: number;
  createdDate: string;
  modifiedDate: string;
};

type returnEmopickType = {
  content: emopickInfoType[];
  page: number;
  size: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
};

type emopickType = {
  status: number;
  message: string;
  data: returnEmopickType;
};

export async function getEmopickList({
  prevId,
  size,
  token,
}: getEmopickParamsType): Promise<returnEmopickType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.get(
      `/emopicks`,
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
