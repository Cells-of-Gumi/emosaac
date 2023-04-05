import { defaultAxiosInstance } from "../instance";

type returnUserArrayType = {
  userId: number;
  nickname: string;
  email: string;
  username: string;
  imageUrl: string;
  gender: number | null;
  age: number;
  webtoonGerne: string | null;
  novelGerne: string | null;
};

type getUserType = {
  status: string;
  message: string;
  data: returnUserArrayType;
};

async function getMyInfo(): Promise<returnUserArrayType | null> {
  try {
    const { data, status }: { data: getUserType; status: number } =
      await defaultAxiosInstance.get(`/users/me`);
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    throw error;
  }
  return null;
}
export default getMyInfo;
