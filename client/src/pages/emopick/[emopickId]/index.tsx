/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { getToken } from "@/api/instance";
import { getEmopickDetail } from "@/api/emopick/getEmopickDetail";

const index = ({ data }: any) => {
  console.log(data);
  return (
    <div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  const emopickId = await context.params;
  console.log(emopickId);
  // 토큰 가져오기
  const token = getToken(context.req);
  // console.log(token);

  // 토큰을 getBookDetail 함수에 전달
  const data = await getEmopickDetail({ emopickId, token })
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log("pages/books/[emopickId].tsx => ", err);
    });

  return await {
    props: {
      data,
    },
  };
};

export default index;
