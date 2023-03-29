import { defaultAxiosInstance } from "../instance";

export type returnMyLikeProps = {
  genreId: number;
  genreName: string;
  amount: number;
  description: string;
}[];

type getMyLikeType = {
  status: number;
  message: string;
  data: returnMyLikeProps;
};

async function getMyStatic(
  typeCode: number
): Promise<returnMyLikeProps | null> {
  try {
    const { data }: { data: getMyLikeType } = await defaultAxiosInstance.get(
      `/genres/total/amounts?typeCode=${typeCode}`
    );
    if (data.status === 200) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
export default getMyStatic;
