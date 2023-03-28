import { defaultAxiosInstance } from "../instance";

type getEmopickParamsType = {
  emopickId: number;
  token?: string | null;
};

type emopickType = {
  status: number;
  message: string;
  data: boolean;
};

export async function getEmopickDetail({
  emopickId,
  token,
}: getEmopickParamsType): Promise<boolean | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.put(
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
