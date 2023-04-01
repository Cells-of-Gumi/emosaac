import { defaultAxiosFormDataInstance } from "../instance";


type paramsType = {
    file: File;
    typeCode: 0 | 1;
    token?: string | null;
}

type returnType = boolean

type responseType = {
  status: number;
  message: string;
  data: returnType;
}

function createFormData(file: File): FormData {
  const formdata = new FormData();
  if (file !== null) {
    formdata.append("file", file);
  }
  return formdata;
}

export async function postOcr({file, typeCode}: paramsType
  ): Promise<returnType | null> {

    
    
    try {
      const formData = createFormData(file);
      const response = await defaultAxiosFormDataInstance.post(`/ocr?typeCode=${typeCode}`, formData);
      return response.data;
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  