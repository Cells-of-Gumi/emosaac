import { defaultAxiosInstance } from "./../instance";
type getIsNicknameType = {
  status: number;
  message: string;
  data: boolean;
};
async function getIsNickname(
  nickname: string,
  token: string | null
): Promise<boolean> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }
    const { data }: { data: getIsNicknameType } =
      await defaultAxiosInstance.get(`/users/nickname/${nickname}`, {
        headers,
      });
    return data.data;
  } catch (error) {
    throw error;
  }
}
export default getIsNickname;
