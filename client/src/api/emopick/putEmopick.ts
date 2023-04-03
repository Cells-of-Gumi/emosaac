import { defaultAxiosInstance } from "../instance";

type putEmopickParamsType = {
  emopickId: number;
  request: {
    content: string;
    novelList: object[];
    title: string;
    webtoonList: object[];
  };
  token?: string | null;
};

type emopickType = {
  status: number;
  message: string;
  data: number;
};

export async function postEmopick({
  emopickId,
  request,
  token,
}: putEmopickParamsType): Promise<number | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.put(
      `/emopicks/${emopickId}`,
      { request, headers }
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
