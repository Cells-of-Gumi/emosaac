/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import MyPage from "@/components/mypage/MyPage";

export default function mypage({ myInfo }: any) {
  // console.log(myInfo);
  return (
    <div css={css`padding-bottom: 72px;`}>
      <MyPage myInfo={myInfo} />
    </div>
  );
}
