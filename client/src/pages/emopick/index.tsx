/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@/api/instance";
import { getEmopickList } from "@/api/emopick/getEmopickList";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { isReadable } from "stream";

type emopickInfoType = {
  writerInfo: {
    userId: number;
    nickname: string;
    profileImg: string;
  };
  emopickId: number;
  title: string;
  thumbnails: string;
  createdDate: string;
  modifiedDate: string;
};

type Props = {
  data: {
    content: emopickInfoType[];
    page: number;
    size: number;
    first: boolean;
    last: boolean;
    hasNext: boolean;
  };
};

const index = (data: Props) => {
  const isEmoLimit = !useMediaQuery({
    query: "(min-width: 1250px) or (max-width: 1023px)",
  });
  const router = useRouter();
  const [emopickList, setEmopickList] = useState<Props>(data);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  function onClickBox(emopickId: number) {
    router.push(`/emopick/${emopickId}`);
  }
  useEffect(() => {
    setEmopickList(data);
  }, []);
  // useEffect(() => {
  //   console.log(emopickList.content);
  // }, []);
  console.log(emopickList);
  return (
    <div>
      <div css={pageTitleCSS({ isDeskTop, isTablet, isMobile })}>
        <div>
          <h2>
            <span>emo</span>PICK!
          </h2>
          <div>이모작 유저들의 추천 리스트를 만나보세요</div>
        </div>
        <div></div>
      </div>
      <div css={innerCSS({ isDeskTop, isTablet, isMobile })}>
        <div css={listWrapCSS({ isDeskTop, isTablet, isMobile }, isEmoLimit)}>
          {emopickList &&
            emopickList?.data?.content.map((emo, idx) => (
              <div
                key={idx}
                onClick={() => onClickBox(emo.emopickId)}
                css={pickWrapCSS({ isDeskTop, isTablet, isMobile })}
              >
                {/* 썸네일 */}
                <div
                  css={pickThumbnailWrapCSS({ isDeskTop, isTablet, isMobile })}
                >
                  <div>
                    {emo.thumbnails
                      .split(" ")
                      .slice(0, 4)
                      .map((thumb, idx) => (
                        <div key={idx}>
                          <img src={thumb} alt={emo.title} />
                        </div>
                      ))}
                    <div></div>
                  </div>
                </div>
                <div
                  css={pickContentWrapCSS({ isDeskTop, isTablet, isMobile })}
                >
                  {/* 글 정보 */}
                  <div>
                    <div>{emo.title}</div>
                    {/* <div>{emo.createdDate}</div> */}
                    <div>1시간 전</div>
                  </div>
                  {/* 사용자 정보 */}
                  <div>
                    <div>writer.</div>
                    <div>{emo.writerInfo.nickname}</div>
                    <div>
                      <img src={emo.writerInfo.profileImg} alt="profile" />
                      {/* <img src="/assets/bazzi.jpg" alt="profile" /> */}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* <div css={serviceCSS}>서비스 준비중입니다.</div> */}
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

const innerCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => {
  return css`
    padding: ${isDeskTop ? "20px 105px" : isTablet ? "20px 50px" : "20px 20px"};
  `;
};

const pageTitleCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  margin: ${isDeskTop ? "20px 105px" : isTablet ? "20px 50px" : "20px 20px"};
  padding: ${isDeskTop ? "20px 50px" : isTablet ? "20px 50px" : "20px 20px"};
  background: linear-gradient(-210deg, #f6ba44, #f0a503, #f1a100);
  color: #000;
  height: ${isDeskTop ? "250px" : isTablet ? "200px" : "150px"};
  display: grid;
  grid-template-columns: 2fr 1fr;
  border-radius: ${!isMobile ? "20px" : "10px"};
  margin-top: ${!isMobile ? "30px" : "20px"};
  & > div:nth-of-type(1) {
    margin: auto 0;
    & > h2 {
      letter-spacing: 0px;
      font-weight: 900;
      font-size: ${!isMobile ? "40px" : "24px"};
      line-height: 50px;
      color: #000;
      & > span {
        font-size: ${!isMobile ? "50px" : "34px"};
      }
    }
    & > div {
      color: #000;
      line-height: 30px;
    }
  }
`;

const listWrapCSS = (
  { isDeskTop, isTablet, isMobile }: IsResponsive,
  isEmoLimit: boolean
) => css`
  display: grid;
  /* margin-top: 40px; */
  grid-template-columns: ${isDeskTop && !isEmoLimit ? "1fr 1fr" : "1fr"};
  column-gap: ${isMobile ? "10px" : "30px"};
  row-gap: ${isMobile ? "20px" : "40px"};
`;

const pickWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) => css`
  cursor: pointer;
  width: 100%;
  display: grid;
  grid-template-columns: ${!isMobile ? "230px 1fr" : "180px 1fr"};
  column-gap: 20px;
  transition: all 0.3s;
`;

const pickThumbnailWrapCSS = ({
  isDeskTop,
  isTablet,
  isMobile,
}: IsResponsive) =>
  css`
    & > div:nth-of-type(1) {
      // 썸네일 다발
      height: ${!isMobile ? "200px" : "160px"};
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      & > div {
        width: ${!isMobile ? "150px" : "100px"};
        height: 200px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(1) {
        left: 60px;
      }
      & > div:nth-of-type(2) {
        left: 40px;
      }
      & > div:nth-of-type(3) {
        left: 20px;
      }
      & > div:nth-of-type(4) {
        left: 0px;
      }
      & > div:nth-of-type(5) {
        width: 50%;
        border-radius: 0px 10px 10px 0px;
        right: 0px;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  `;

const pickContentWrapCSS = ({ isDeskTop, isTablet, isMobile }: IsResponsive) =>
  css`
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    // 글 정보
    & > div:nth-of-type(1) {
      & > div:nth-of-type(1) {
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
      }
      & > div:nth-of-type(2) {
        color: var(--text-color-3);
      }
    }
    // 작성자 정보
    & > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      & > div:nth-of-type(1) {
        font-weight: bold;
      }
      & > div:nth-of-type(2) {
      }
      & > div:nth-of-type(3) {
        width: 40px;
        height: 40px;
        border-radius: 50px;
        overflow: hidden;
        background-color: var(--back-color-3);
        margin-left: 10px;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  `;

const serviceCSS = css`
  height: 500px;
  line-height: 500px;
  text-align: center;
`;

export const getServerSideProps = async (context: any) => {
  const [prevId, size] = [0, 14];

  const token = getToken(context.req);
  const data = await getEmopickList({
    prevId,
    size,
    token,
  }).then((res) => {
    return res;
  });
  return await {
    props: {
      data,
    },
  };
};

export default index;
