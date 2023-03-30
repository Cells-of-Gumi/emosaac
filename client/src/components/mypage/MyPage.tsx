/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import MiddleWideButton from "../UI/Button/MiddleWideButton";
import { useState } from "react";
import Chart from "./Chart";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getMyStatic from "./../../api/mypage/getMyStatic";

const MyPage = ({ myinfo }: any) => {
  const router = useRouter();
  function onClickMoveEditPage() {
    router.push("/mypage/edit");
  }
  const [typeCode, setTypeCode] = useState<number>(0);
  const onClickWebToon = () => {
    setTypeCode(0);
  };
  const onClickWebNovel = () => {
    setTypeCode(1);
  };
  return (
    <>
      <section css={userinfoCSS}>
        <div css={profileimagewrapperCSS}>
          <img
            src={myinfo.imageUrl}
            alt="프로필 이미지"
            css={profileimageCSS}
          />
        </div>
        <div css={infowrapCSS}>
          <h2 css={nicknameCSS}>{myinfo.nickname}</h2>
          <div css={buttonCSS}>
            <MiddleWideButton
              text={"회원 정보 수정"}
              onClick={onClickMoveEditPage}
            />
          </div>
        </div>
      </section>
      <section css={routewrapCSS}>
        <article onClick={onClickWebToon}>웹툰</article>
        <article onClick={onClickWebNovel}>웹소설</article>
      </section>

      <section css={chartwrapperCSS}>
        <article css={chartCSS}>
          <Chart typeCode={typeCode} />
        </article>
        <article css={recommendCSS}>
          <div>
            <div>가장 많이 본 장르의 작품을 추천해줄게요</div>
            <div css={contentCSS}>
              <div css={imagewrapperCSS}>
                <img
                  css={imageCSS}
                  src={"/assets/thumbnail.png"}
                  alt="많이 본 장르 썸네일"
                />
              </div>
              {/* <div css={contentwrapperCSS}>
                <h3>제목</h3>
                <div>줄거리 ...으로 줄이기</div>
                <div>자체평점</div>
              </div> */}
            </div>
          </div>
          <div>
            <div>가장 적게 본 장르의 작품을 추천해줄게요</div>
            <div css={contentCSS}>
              <div css={imagewrapperCSS}>
                <img
                  css={imageCSS}
                  src={"/assets/thumbnail.png"}
                  alt="적게 본 장르 썸네일"
                />
              </div>
              {/* <div css={contentwrapperCSS}>
                <h3>제목</h3>
                <div>줄거리 ...으로 줄이기</div>
                <div>자체평점</div>
              </div> */}
            </div>
          </div>
        </article>
      </section>
    </>
  );
};
const userinfoCSS = css`
  display: flex;
  align-items: center;
  margin-left: 105px;
  margin-top: 50px;
`;
const profileimagewrapperCSS = css`
  border-radius: 100%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  margin-right: 40px;
`;

const profileimageCSS = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const infowrapCSS = css`
  display: grid;
`;

const nicknameCSS = css`
  margin-bottom: 10px;
`;

const buttonCSS = css`
  margin-top: 20px;
`;

const routewrapCSS = css`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin-top: 10px;
  padding: 5px;
  border-top: 0.5px solid var(--main-color);
  & > article {
    cursor: pointer;
  }
`;

const chartwrapperCSS = css`
  display: grid;
  grid-template-columns: 500px 1fr;
  column-gap: 50px;
`;

const chartCSS = css`
  height: 350px;
  margin-top: 80px;
  margin-left: 60px;
  left: 0px;
`;
const recommendCSS = css`
  margin-top: 80px;
  display: flex;
  & > div {
    margin-right: 105px;
    /* line-height: 200px; */
  }
`;
const contentCSS = css`
  display: flex;
`;

const imagewrapperCSS = css`
  width: 150px;
  height: 200px;
  margin-top: 20px;
  overflow: hidden;
`;
const contentwrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const imageCSS = css`
  height: calc(100% - 16px);
  width: 100%;
  object-fit: contain;
`;
// line-height
export default MyPage;
