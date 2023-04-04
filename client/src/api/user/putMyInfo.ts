import { defaultAxiosFormDataInstance } from "../instance";

interface PutMyInfoProps {
  file: File | string | null;
  gender?: number | null | undefined;
  age?: number | null | undefined;
  nickName: string;
}

function createFormData(myInfo: PutMyInfoProps): FormData {
  const formdata = new FormData();
  formdata.append("nickName", myInfo.nickName);
  if (myInfo.gender !== null && myInfo.gender !== undefined) {
    formdata.append("gender", myInfo.gender.toString());
  }
  if (myInfo.age !== null && myInfo.age !== undefined) {
    formdata.append("age", myInfo.age.toString());
  }
  if (myInfo.file !== null) {
    if (typeof myInfo.file === "string") {
      formdata.append("existingImageUrl", myInfo.file);
    } else {
      formdata.append("file", myInfo.file);
    }
  }
  return formdata;
}

export async function putMyInfo(
  myInfo: PutMyInfoProps
  // token: string | null
): Promise<any> {
  try {
    const formdata = createFormData(myInfo);
    const response = await defaultAxiosFormDataInstance.put(`/users`, formdata);
    return response.data;
  } catch (error) {
    throw error;
  }
}
