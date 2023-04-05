import dummyData from "./DummyData.json";

const data = dummyData;
export const recvBooks = async (startIdx: number, recvRange: number) => {
  const promise = await new Promise((resolve) => {
    resolve(data.slice(startIdx, recvRange));
  });

  return promise;
};
