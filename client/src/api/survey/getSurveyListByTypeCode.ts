import { returnSurveyArrayType } from "@/types/survey";
import { defaultAxiosInstance } from "../instance";

type SurveyType = {
  status: number;
  message: string;
  data: returnSurveyArrayType[];
};

async function getSurveyListByTypeCode(
  typeCode: number
): Promise<returnSurveyArrayType[] | null> {
  try {
    const { data }: { data: SurveyType } = await defaultAxiosInstance.get(
      `/genres/research?typeCode=${typeCode}`
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
export default getSurveyListByTypeCode;
