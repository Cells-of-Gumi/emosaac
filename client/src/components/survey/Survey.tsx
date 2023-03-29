/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect } from "react";
import SmallWideButton from "../UI/Button/SmallWideButton";
import getSurveyListByTypeCode from "@/api/survey/getSurveyListByTypeCode";
import { returnSurveyArrayType } from "@/types/survey";
// import thumbnail from "../../assets/thumbnail.png";
import { useState } from "react";
import Thumbnail from "./Thumbnail";
import postSurvey from "./../../api/survey/postSurveyList";
import { useRouter } from "next/router";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

const Survey = () => {
  const router = useRouter();
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  const [typeCode, setTypeCode] = useState(0);
  const [webtoonList, setWebtoonList] = useState<returnSurveyArrayType[]>([]);
  const [selectedWebtoons, setSelectedWebtoons] = useState<Set<number>>(
    new Set()
  );
  const [selectedNovels, setSelectedNovels] = useState<Set<number>>(new Set());

  // const checkwebtoon;
  const onClickNextButton = () => {
    setTypeCode(1);
  };
  const onClickPrevButton = () => {
    setTypeCode(0);
  };
  const onClickSubmitButton = () => {
    // 5개씩 선택되었을 때만 post
    if (selectedWebtoons.size === 5 && selectedNovels.size === 5) {
      postSurvey({
        webtoonIds: Array.from(selectedWebtoons),
        novelIds: Array.from(selectedNovels),
      }).catch((error) => {
        console.log(error);
      });
      alert("제출되었습니다!");
      router.push("/");
    } else {
      alert("웹툰과 소설을 각각 5개씩 선택해주세요.");
    }
  };
  useEffect(() => {
    getSurveyListByTypeCode(typeCode).then(
      (res: returnSurveyArrayType[] | null) => {
        const data = res;
        // console.log(data);
        if (data !== null) {
          setWebtoonList(data);
        }
      }
    );
  }, [typeCode]);

  // 선택된 값을 넣는 함수
  const toggleSelectedItem = (itemId: number, type: "webtoon" | "novel") => {
    const setSelected =
      type === "webtoon" ? setSelectedWebtoons : setSelectedNovels;
    setSelected((prevSelectedItems) => {
      const newSelectedItems = new Set(prevSelectedItems);
      if (newSelectedItems.has(itemId)) {
        newSelectedItems.delete(itemId);
      } else {
        if (newSelectedItems.size >= 5) {
          alert("5개만 선택해주세요!");
          return prevSelectedItems;
        }
        newSelectedItems.add(itemId);
      }
      return newSelectedItems;
    });
  };

  return (
    <>
      <section css={infoCSS(isDeskTop, isTablet, isMobile)}>
        <div>
          {typeCode === 0 && (
            <h1 css={titleCSS(isTablet, isMobile)}>
              선호하는 웹툰을 5개 선택해주세요
            </h1>
          )}
          {typeCode === 1 && (
            <h1 css={titleCSS(isTablet, isMobile)}>
              선호하는 웹소설을 5개 선택해주세요
            </h1>
          )}
          <div style={{ marginTop: "10px" }}>
            이모작의 추천방식에 깜짝 놀라실걸요?
          </div>
        </div>
        <div>
          <div css={buttongridCSS(isDeskTop, isTablet, isMobile)}>
            {typeCode === 0 ? (
              <div css={nextButtonContainerCSS}>
                <SmallWideButton text={"다음"} onClick={onClickNextButton} />
              </div>
            ) : (
              <div css={buttongridCSS(isDeskTop, isTablet, isMobile)}>
                <div css={prevSubmitButtonContainerCSS}>
                  <SmallWideButton text={"이전"} onClick={onClickPrevButton} />
                </div>
                <div css={submitbuttonCSS}>
                  <SmallWideButton
                    text={"제출"}
                    onClick={onClickSubmitButton}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section css={surveygridCSS(isTablet, isMobile)}>
        {webtoonList.map((webtoon) => (
          <div key={webtoon.bookId}>
            <Thumbnail
              src={webtoon.thumbnail}
              alt="설문조사용 웹툰/웹소설 썸네일"
              isSelected={(typeCode === 0
                ? selectedWebtoons
                : selectedNovels
              ).has(webtoon.bookId)}
              onClick={() =>
                toggleSelectedItem(
                  webtoon.bookId,
                  typeCode === 0 ? "webtoon" : "novel"
                )
              }
            />
          </div>
        ))}
      </section>
    </>
  );
};
const infoCSS = (
  isDesktop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  margin-top: 50px;
  display: flex;
  flex-direction: ${isDesktop ? "row" : "column"};
  justify-content: space-around;
  padding: ${isMobile ? "10px 20px 50px" : null};
  ${isDesktop
    ? "space-around"
    : isTablet
    ? "space-between"
    : isMobile
    ? "space-around"
    : "space-around"}
  align-items : ${isDesktop
    ? "flex-start"
    : isTablet
    ? "flex-start"
    : isMobile
    ? "flex-start"
    : "flex-start"}
`;

const titleCSS = (isTablet: boolean, isMobile: boolean) => css`
  white-space: nowrap;
  text-align: ${isTablet ? "left" : isMobile ? "left" : "null"};
  font-size: ${isTablet ? "33px" : isMobile ? "27px" : "null"};
  width: ${isTablet ? "100%" : isMobile ? "100%" : null};
`;

const surveygridCSS = (isTablet: boolean, isMobile: boolean) => css`
  display: grid;

  grid-template-columns: ${isTablet
    ? "repeat(5,1fr)"
    : isMobile
    ? "repeat(3,1fr)"
    : "repeat(7,1fr)"};
  margin: 30px 105px;
  grid-gap: 10px;
  justify-content: center;
  & > div {
    width: 100%;
    height: 100%;
  }
  & > div > img {
    width: 100%;
    height: 100%;
  }
  padding: ${isMobile ? "10px 20px 100px" : "null"};
  margin: ${isMobile ? "0px" : "default"};
`;

const buttongridCSS = (
  isDeskTop: boolean,
  isTablet: boolean,
  isMobile: boolean
) => css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  height: ${isDeskTop ? "auto" : isTablet ? "auto" : "35px;"};
  margin-top: ${isDeskTop ? "20px" : isTablet ? "20px" : "20px"};
  white-space: nowrap;
`;

const nextButtonContainerCSS = css`
  margin-left: auto;
`;

const prevSubmitButtonContainerCSS = css`
  margin-left: auto;
  margin-right: 0;
`;

const submitbuttonCSS = css`
  margin-left: 10px;
  /* @media only screen and (max-width: 768px) {
    width: 80%;
    height: auto;
  } */
  white-space: nowrap;
`;
export default Survey;
