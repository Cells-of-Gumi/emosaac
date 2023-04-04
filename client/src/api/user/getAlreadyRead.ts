import { defaultAxiosInstance } from "./../instance";
type dataReturnType = {
  bookId: number;
  platform: string;
  thumbnail: string;
  title: string;
  author: string;
  href: string;
  tag: string;
  avgScore: number;
  hit: number;
  regist: string;
  genreId: number;
  genreName: string;
  typeCd: number;
  modifiedDate: string;
};
type returnType = {
  status: number;
  message: string;
  data: {
    content: dataReturnType[];
    page: number;
    size: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
  };
};
async function getAlreadyReadProps(
  typeCode: number,
  prevId: number,
  size: number,
  prevTime: number
): Promise<returnType["data"] | null> {
  try {
    const { data }: { data: returnType } = await defaultAxiosInstance.get(
      `/books/read-book`
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
