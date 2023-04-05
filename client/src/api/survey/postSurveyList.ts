import { defaultAxiosInstance } from "../instance";

type paramsType = {
  webtoonIds: number[];
  novelIds: number[];
};

async function postSurvey({ webtoonIds, novelIds }: paramsType) {
  try {
    const { data } = await defaultAxiosInstance.post("/genres/research", {
      webtoonId: webtoonIds,
      novelId: novelIds,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
export default postSurvey;
