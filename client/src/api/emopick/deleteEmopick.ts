import { defaultAxiosInstance } from "../instance";

type deleteEmopickParamsType = {
  emopickId: number;
  token?: string | null;
};

type emopickType = {
  status: number;
  message: string;
  data: number;
};

export async function deleteEmopick({
  emopickId,
  token,
}: deleteEmopickParamsType): Promise<number | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: emopickType } = await defaultAxiosInstance.delete(
      `/emopicks/${emopickId}`,
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
