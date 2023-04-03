/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@/api/instance";
import { getEmopickList } from "@/api/emopick/getEmopickList";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import EmopickListView from "@/components/emopick/EmopickListView";
import { RiPlayCircleFill, RiPlayCircleLine } from "react-icons/ri";

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
        <EmopickListView {...data} />
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
  column-gap: ${!isMobile ? "20px" : "20px"};
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
    /* padding: ${!isMobile ? "10px 0" : "10px 0"}; */
    /* display: flex;
    flex-direction: column;
    justify-content: space-between; */
    // 글 정보
    & > div:nth-of-type(1) {
      & > div:nth-of-type(1) {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        line-height: 50px;
        font-weight: bold;
        & > div {
          margin-left: 4px;
        }
      }
      & > div:nth-of-type(2) {
        color: var(--text-color-3);
        font-size: 14px;
      }
    }
    // 작성자 정보
    & > div:nth-of-type(2) {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 10px 0;
      & > div:nth-of-type(1) {
        width: 30px;
        height: 30px;
        border-radius: 50px;
        overflow: hidden;
        background-color: var(--back-color-3);
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      & > div:nth-of-type(2) {
        margin-left: 10px;
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
