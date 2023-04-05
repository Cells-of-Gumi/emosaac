import { defaultAxiosInstance } from "./instance";

interface Genre {
  status: number;
  message: string;
  data: {
    genreId: number;
    name: string;
  }[];
}

async function getGenreByTypeCode(
  typeCode: number
): Promise<{ genreId: number; name: string }[] | null> {
  try {
    const { data }: { data: Genre } = await defaultAxiosInstance.get(
      `/genres?typeCode=${typeCode}`
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

export default getGenreByTypeCode;
