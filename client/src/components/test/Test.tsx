import { useEffect, useState } from "react";
import getGenreByTypeCode from "../../api/genre";
import getMyInfo from "@/api/user/getMyInfo";
export default function test() {
  //   const [webToonGenre, setWebToonGenre] = useState([]);
  useEffect(() => {
    const webtoon: number = 0;
    // const webnovel: number = 1;
    getGenreByTypeCode(webtoon).then((res) => {
      const data = res;
      // console.log(data);
    });
  }, []);
  useEffect(() => {
    getMyInfo().then((res) => {
      const data = res;
      // console.log(data);
    });
  }, []);
  return <></>;
}
