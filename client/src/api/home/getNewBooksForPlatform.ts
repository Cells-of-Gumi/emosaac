import { defaultAxiosInstance } from "../instance";
import { returnBookContentType } from "@/types/books";

type returnType = returnBookContentType[];

type responseType = {
  status: number;
  message: string;
  data: returnType;
};

export async function getNewBooksForPlatform(): Promise<returnType | null> {
  try {
    const headers: any = {};

    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/books/platform`,
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
