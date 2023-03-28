import { defaultAxiosFormDataInstance } from "../instance";

interface PutMyInfoProps {
  file: File | null;
  gender?: number | undefined;
  age?: number | undefined;
  nickName: string;
}

function createFormData(myInfo: PutMyInfoProps): FormData {
  const formdata = new FormData();
  formdata.append("nickName", myInfo.nickName);
  if (myInfo.gender !== undefined) {
    formdata.append("gender", myInfo.gender.toString());
  }
  if (myInfo.age !== undefined) {
    formdata.append("age", myInfo.age.toString());
  }
  if (myInfo.file !== null) {
    formdata.append("file", myInfo.file);
  }
  return formdata;
}

export async function putMyInfo(myInfo: PutMyInfoProps): Promise<any> {
  try {
    const formdata = createFormData(myInfo);
    const response = await defaultAxiosFormDataInstance.put(`/users`, formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
}
