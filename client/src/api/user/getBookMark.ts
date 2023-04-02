import { defaultAxiosInstance } from "./../instance";
type returnGetBookMarkProps = {
  bookId: number;
  thumbnail: string;
  modifiedDate: string;
};

type getBookMarkType = {
  status: number;
  message: string;
  data: {
    content: returnGetBookMarkProps[];
    first: boolean;
    hasNext: boolean;
    last: boolean;
    page: number;
    size: number;
  };
};

async function getBookMark(
  prevId: number,
  prevTime: string,
  size: number,
  typeCode: number
): Promise<returnGetBookMarkProps[] | null> {
  try {
    const { data }: { data: getBookMarkType } = await defaultAxiosInstance.get(
      `/books/bookmark?prevId=${prevId}&prevtime=${prevTime}&size=${size}&typeCode=${typeCode}`
    );
    if (data.status === 200) {
      return data.data.content;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
}
export default getBookMark;
