import { defaultAxiosInstance } from "./../instance";
type getIsNicknameType = {
  status: number;
  message: string;
  data: boolean;
};
async function getIsNickname(nickname: string): Promise<boolean> {
  try {
    const { data }: { data: getIsNicknameType } =
      await defaultAxiosInstance.get(
        `/user/nickname/${encodeURIComponent(nickname)}`
      );
    return data.data;
  } catch (error) {
    throw error;
  }
}
export default getIsNickname;
