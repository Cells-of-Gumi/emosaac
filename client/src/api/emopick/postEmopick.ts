import { defaultAxiosInstance } from "../instance";

type postEmopickParamsType = {
  request: {
    content: string;
    novelList: object;
    title: string;
    webtoonList: object;
  };
  token?: string | null;
};

type emopickType = {
  status: number;
  message: string;
  data: number;
};

export async function postEmopickList({
  request,
  token,
}: postEmopickParamsType): Promise<number | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.post(
      `/emopicks`,
      request,
      headers
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
