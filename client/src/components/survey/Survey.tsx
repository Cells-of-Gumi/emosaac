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
    // console.log("선택됨");
  };
  const onClickPrevButton = () => {
    setTypeCode(0);
  };
  const onClickSubmitButton = () => {
    // console.log("하하하하하");
    // alert("제출됨");
    // console.log(Array.from(selectedWebtoons), Array.from(selectedNovels));
    postSurvey({
      webtoonIds: Array.from(selectedWebtoons),
      novelIds: Array.from(selectedNovels),
    }).catch((error) => {
      console.log(error);
    });
    alert("제출되었습니다!");
    router.push("/");
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
            <h1 css={titleCSS}>선호하는 웹툰을 5개 선택해주세요</h1>
          )}
          {typeCode === 1 && (
            <h1 css={titleCSS}>선호하는 웹소설을 5개 선택해주세요</h1>
          )}
          <div style={{ marginTop: "10px" }}>
            이모작의 추천방식에 깜짝 놀라실걸요?
          </div>
        </div>
        <div>
          <div css={buttongridCSS(isTablet)}>
            {typeCode === 0 ? (
              <SmallWideButton text={"다음"} onClick={onClickNextButton} />
            ) : (
              <div css={buttongridCSS(isTablet)}>
                <div>
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
  align-items: flex-start;
  @media only screen and (max-width: 1024px) {
    align-items: flex-start;
  }
  @media only screen and (max-width: 768px) {
    justify-content: ${isTablet ? "space-between" : "space-around"};
    align-items: flex-start;
  }
`;

const titleCSS = css`
  white-space: nowrap;
  @media only screen and (max-width: 1024px) {
    text-align: left;
    white-space: normal;
    font-size: 33px;
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    text-align: left;
    white-space: normal;
    font-size: 28px;
    width: 100%;
  }
`;

const surveygridCSS = (isTablet: boolean, isMobile: boolean) => css`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
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
  @media only screen and (max-width: 1024px) {
    grid-template-columns: ${isTablet ? "repeat(5, 1fr)" : "repeat(3, 1fr)"};
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    margin: 30px 20px;
  }
`;

const buttongridCSS = (isTablet: boolean) => css`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  margin-top: ${isTablet ? "20px" : "20px"};

  @media only screen and (max-width: 768px) {
    justify-content: flex-end;
  }
  white-space: nowrap;
`;

const thumbnailCSS = css`
  width: 100%;
  height: 100%;
`;

const submitbuttonCSS = css`
  margin-left: 20px;
  @media only screen and (max-width: 768px) {
    width: 80%;
    height: auto;
  }
  white-space: nowrap;
`;
export default Survey;
