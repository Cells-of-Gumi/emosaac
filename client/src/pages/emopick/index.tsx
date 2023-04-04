/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@/api/instance";
import { getEmopickList } from "@/api/emopick/getEmopickList";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import EmopickListView from "@/components/emopick/EmopickListView";
import EmopickFloatingButton from "@/components/emopick/EmopickFloatingButton";
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
  likeCnt: number;
  bookCnt: number;
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

  console.log(emopickList);
  return (
    <div>
      <EmopickFloatingButton />
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
      font-size: ${!isMobile ? "18px" : "14px"};
      color: #000;
      line-height: 30px;
    }
  }
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
