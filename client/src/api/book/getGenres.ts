import { defaultAxiosInstance } from "../instance";
import { returnGenresType } from "@/types/books";


type paramsType = {
  typeCode: number;
}

type returnType = returnGenresType
// type returnType = {
//     "content": bookContentType[];
//     "page": number;
//     "size": number;
//     "first": boolean;
//     "last": boolean;
//     "hasNext": boolean;
// }

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

export async function getGenres({typeCode}: paramsType
): Promise<returnType | null> {
  try {
    const { data }: { data: responseType } = await defaultAxiosInstance.get(
      `/genres?typeCode=${typeCode}`
    );
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
