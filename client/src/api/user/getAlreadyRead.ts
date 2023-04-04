// import { defaultAxiosInstance } from "./../instance";
// type dataReturnType = {
//   bookId: number;
//   platform: string;
//   thumbnail: string;
//   title: string;
//   author: string;
//   href: string;
//   tag: string;
//   avgScore: number;
//   hit: number;
//   regist: string;
//   genreId: number;
//   genreName: string;
//   typeCd: number;
//   modifiedDate: string;
// };
// type returnType = {
//   status: number;
//   message: string;
//   data: {
//     content: dataReturnType[];
//     page: number;
//     size: number;
//     first: boolean;
//     last: boolean;
//     hasNext: boolean;
//   };
// };
// async function getAlreadyRead(
//   prevId: number,
//   prevTime: string,
//   size: number,
//   typeCode: number
// ): Promise<returnType["data"] | null> {
//   try {
//     const { data }: { data: returnType } = await defaultAxiosInstance.get(
//       `/books/read-book?prevId=${prevId}&prevTime=${prevTime}&size=${size}&typeCode=${typeCode}`
//     );
//     if (data.status === 200) {
//       return data.data;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     throw error;
//   }
// }
// export default getAlreadyRead;
import { defaultAxiosInstance } from "../instance";
import { bookContentType, returnBookContentType } from "@/types/books";

type paramsType = {
  prevId?: number;
  prevTime?: string;
  size?: number;
  token?: string | null;
  typeCode: number;
};

type returnType = returnBookContentType;

type responseType = {
  status: number;
  message: string;
  data: returnType;
};

export async function getAlreadyRead({
  typeCode,
  prevId,
  prevTime,
  size,
  token,
}: paramsType): Promise<returnType | null> {
  try {
    const headers: any = {};
    if (token) {
      headers.Authorization = token;
    }

    const query1 = prevId !== undefined ? `&prevId=${prevId}` : "";
    const query2 = prevTime !== undefined ? `&prevTime=${prevTime}` : "";
    const query3 = size !== undefined ? `&size=${size}` : "";

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/books/read-book?typeCode=${typeCode}${query1}${query2}${query3}`,
      {
        headers,
      }
    );
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
