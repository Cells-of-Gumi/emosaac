/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { keyframes } from "@emotion/react";
import MiddleWideButton from "../UI/Button/MiddleWideButton";
import { useState } from "react";
import Chart from "./Chart";
import { useRouter } from "next/router";
import { useEffect } from "react";
import getMyStatic from "./../../api/mypage/getMyStatic";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import getRecommendGenre from "./../../api/mypage/ReommendTopGenre";
import { getToken } from "@/api/instance";
import getBookMark from "@/api/user/getBookMark";
import BookMark from "./BookMark";
import AlreadyReadList from "./AlreadyReadList";

const MyPage = ({ myinfo }: any) => {
  // console.log(myinfo);
  const router = useRouter();
  const token = getToken();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [bookId, setBookId] = useState<number | null>(null);
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<string>("웹툰");
  function onClickMoveEditPage() {
    router.push("/mypage/edit");
  }
  const [typeCode, setTypeCode] = useState<number>(0);
  const onClickWebToon = () => {
    setTypeCode(0);
    setSelectedRoute("웹툰");
  };
  const onClickWebNovel = () => {
    setTypeCode(1);
    setSelectedRoute("웹소설");
  };
  const onClickEmosaac = () => {
    setTypeCode(2);
    setSelectedRoute("이모작");
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
      getRecommendGenre(1, typeCode, token).then((res) => {
        const data = res;
        // console.log(data);
        if (data !== null) {
          setTopGenreWebtoonImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
      getRecommendGenre(0, typeCode, token).then((res) => {
        const data = res;
        if (data !== null) {
          setWorstGenreWebtoonImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
    } else if (typeCode === 1) {
      getRecommendGenre(1, typeCode, token).then((res) => {
        const data = res;
        if (data !== null) {
          setTopGenreNovelImage(data.thumbnail);
          setBookId(data.bookId);
        }
      });
      getRecommendGenre(0, typeCode, token).then((res) => {
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
      {typeCode === 2 ? (
        <div css={allwrapCSS}>
          <section css={userinfoCSS(isDeskTop, isTablet, isMobile)}>
            <div css={profileimagewrapperCSS(isDeskTop, isTablet, isMobile)}>
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
            <article
              onClick={onClickWebToon}
              css={selectRouteCSS("웹툰", selectedRoute)}
            >
              웹툰
            </article>
            <article
              onClick={onClickWebNovel}
              css={selectRouteCSS("웹소설", selectedRoute)}
            >
              웹소설
            </article>
            <article
              onClick={onClickEmosaac}
              css={selectRouteCSS("이모작", selectedRoute)}
            >
              이모작
            </article>
          </section>
          <div>EmoSaac</div>
        </div>
      ) : (
        <div css={allwrapCSS}>
          <section css={userinfoCSS(isDeskTop, isTablet, isMobile)}>
            <div css={profileimagewrapperCSS(isDeskTop, isTablet, isMobile)}>
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
            <article
              onClick={onClickWebToon}
              css={selectRouteCSS("웹툰", selectedRoute)}
            >
              웹툰
            </article>
            <article
              onClick={onClickWebNovel}
              css={selectRouteCSS("웹소설", selectedRoute)}
            >
              웹소설
            </article>
            <article
              onClick={onClickEmosaac}
              css={selectRouteCSS("이모작", selectedRoute)}
            >
              이모작
            </article>
          </section>

          <section css={chartwrapperCSS(isDeskTop, isTablet, isMobile)}>
            <article css={chartCSS(isDeskTop, isTablet, isMobile)}>
              <div>
                {localStorage.getItem("nickname")}님의 선호를 알려드려요
              </div>
              <Chart typeCode={typeCode} />
            </article>
            <article css={recommendCSS(isDeskTop, isTablet, isMobile)}>
              <div css={recommendborderCSS(isDeskTop, isTablet, isMobile)}>
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
                </div>
              </div>
              <div css={recommendborderCSS(isDeskTop, isTablet, isMobile)}>
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
                </div>
              </div>
            </article>
          </section>
          <section>
            <BookMark typeCode={typeCode} />
          </section>
          <section>
            <AlreadyReadList typeCode={typeCode} />
          </section>
        </div>
      )}
    </>
  );
};

const allwrapCSS = css`
  display: flex;
  flex-direction: column;
`;
const selectRouteCSS = (route: string, selectedRoute: string) => css`
  color: ${route === selectedRoute ? "var(--main-color)" : "var(--text-color)"};
  font-weight: bold;
`;
const userinfoCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  display: flex;
  align-items: ${isDeskTop ? "center" : isTablet ? "center" : "center"};
  margin-left: ${isDeskTop ? "105px" : isTablet ? "50px" : "20px"};
  width: 100%;
  height: ${isDeskTop ? "200px" : isTablet ? "200px" : "150px"};
  /* align-items: center; */
`;
const profileimagewrapperCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  border-radius: 100%;
  width: ${isDeskTop ? "150px" : isTablet ? "120px" : "100px"};
  height: ${isDeskTop ? "150px" : isTablet ? "120px" : "100px"};

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
// 라우터 아래 최상위
const chartwrapperCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  display: ${isDeskTop ? "grid" : isTablet ? "flex" : "flex"};
  flex-direction: column;
  grid-template-columns: 1fr 1.5fr;
  justify-content: ${isTablet ? "center" : "center"};
  align-items: ${isTablet ? "center" : "center"};
  column-gap: 50px;
  width: 100%;
  /* height: 400px; */
  min-height: 400px; // 변경된 부분입니다.
`;

const chartCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  height: ${isDeskTop ? "400px" : "300px"};
  width: ${isDeskTop ? "380px" : "100%"};
  margin-top: ${isDeskTop ? "80px" : isTablet ? "50px" : "50px"};
  margin-left: ${isDeskTop ? "60px" : "null"};
  left: 0px;
  & > div {
    font-size: 23px;
    margin-bottom: 30px;
    text-align: center;
    font-weight: bold;
  }
`;

// 추천 최상위
const recommendCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  margin-top: ${isDeskTop ? "45px" : isTablet ? "20px" : "20px"};
  width: 100%;
  /* height: 100%; */
  min-height: 100%;
  display: ${isDeskTop ? "grid" : isTablet ? "flex" : "flex"};
  align-content: ${isDeskTop ? "start" : "center"};
  justify-content: ${isDeskTop ? "start" : "center"};
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  margin-left: ${isTablet ? "20px" : isMobile ? "20px" : "null"};
  & > div {
    /* margin-right: 200px; */
    /* line-height: 200px; */
  }
`;

const recommendborderCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  /* border: 1px solid white; */
  border-radius: 5px;
  padding: 10px;
  /* background-color: #fff; */
  width: 210px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
  border-radius: 10px;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

export default MyPage;
