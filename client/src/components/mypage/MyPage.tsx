/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import MiddleWideButton from "../UI/Button/MiddleWideButton";
import { useState } from "react";
import Chart from "./Chart";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getMyStatic from "./../../api/mypage/getMyStatic";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import getRecommendGenre from "./../../api/mypage/ReommendTopGenre";
import { getToken } from "@/api/instance";

const MyPage = ({ myinfo }: any) => {
  const router = useRouter();
  const token = getToken();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [bookId, setBookId] = useState<number | null>(null);
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
  const onClickMoveDetail = () => {
    router.push(`books/${bookId}`);
  };
  const [topGenreWebtoonImage, setTopGenreWebtoonImage] = useState<string>("");
  const [worstGenreWebtoonImage, setWorstGenreWebtoonImage] =
    useState<string>("");
  const [topGenreNovelImage, setTopGenreNovelImage] = useState<string>("");
  const [worstGenreNovelImage, setWrostGenreNovelImage] = useState<string>("");
  useEffect(() => {
    if (typeCode === 0) {
      getRecommendGenre(0, typeCode, token).then((res) => {
        const data = res;
        // console.log(data);
        if (data !== null) {
          setTopGenreWebtoonImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
      getRecommendGenre(1, typeCode, token).then((res) => {
        const data = res;
        if (data !== null) {
          setWorstGenreWebtoonImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
    } else if (typeCode === 1) {
      getRecommendGenre(0, typeCode, token).then((res) => {
        const data = res;
        if (data !== null) {
          setTopGenreNovelImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
      getRecommendGenre(1, typeCode, token).then((res) => {
        const data = res;
        if (data !== null) {
          setWrostGenreNovelImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
    }
  }, [typeCode]);
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
          <div css={recommendborderCSS}>
            <h3 css={recommendexplainCSS}>가장 많이 본 장르의</h3>
            <h3 css={recommendexplainCSS}>
              {typeCode === 0 ? "웹툰" : "웹소설"}을 추천해줄게요
            </h3>
            <div css={contentCSS}>
              <div css={imagewrapperCSS}>
                {typeCode === 0 ? (
                  <img
                    css={imageCSS}
                    src={topGenreWebtoonImage}
                    alt="많이 본 웹툰 썸네일"
                    onClick={onClickMoveDetail}
                  />
                ) : (
                  <img
                    css={imageCSS}
                    src={topGenreNovelImage}
                    alt="많이 본 웹소설 썸네일"
                    onClick={onClickMoveDetail}
                  />
                )}
              </div>
              {/* <div css={contentwrapperCSS}>
                <h3>제목</h3>
                <div>줄거리 ...으로 줄이기</div>
                <div>자체평점</div>
              </div> */}
            </div>
          </div>
          <div css={recommendborderCSS}>
            <h3 css={recommendexplainCSS}>가장 적게 본 장르의 </h3>
            <h3 css={recommendexplainCSS}>
              {typeCode === 0 ? "웹툰" : "웹소설"}을 추천해줄게요
            </h3>

            <div css={contentCSS}>
              <div css={imagewrapperCSS}>
                {typeCode === 0 ? (
                  <img
                    css={imageCSS}
                    src={worstGenreWebtoonImage}
                    alt="적게 본 웹툰 썸네일"
                    onClick={onClickMoveDetail}
                  />
                ) : (
                  <img
                    css={imageCSS}
                    src={worstGenreNovelImage}
                    alt="적게 본 웹소설 썸네일"
                    onClick={onClickMoveDetail}
                  />
                )}
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
  grid-template-columns: 1fr 1.5fr;
  column-gap: 50px;
  width: 100%;
  height: 100%;
`;

const chartCSS = css`
  height: 350px;
  /* width: 400px; */
  margin-top: 90px;
  margin-left: 60px;
  left: 0px;
`;
const recommendCSS = css`
  margin-top: 45px;
  /* width: 100%; */
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  & > div {
    /* margin-right: 200px; */
    /* line-height: 200px; */
  }
`;
const recommendborderCSS = css`
  /* border: 1px solid white; */
  border-radius: 5px;
  padding: 10px;
  /* background-color: #fff; */
  /* width: 250px; */
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const recommendexplainCSS = css`
  font-weight: bold;
  /* width: 100%; */
  margin-top: 5px;
`;

const contentCSS = css`
  display: flex;
  /* width: 300px; */
  height: auto;
`;

const imagewrapperCSS = css`
  width: 100%;
  height: 250px;
  margin-top: 20px;
  overflow: hidden;
  /* min-width: 150px; */
`;
const imageCSS = css`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 5px;
  cursor: pointer;
`;
const contentwrapperCSS = css`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

// line-height
export default MyPage;
