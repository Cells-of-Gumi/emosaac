/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";
import { useMediaQuery } from "react-responsive";
import { RiPlayCircleFill, RiPlayCircleLine } from "react-icons/ri";
import EmopickCard from "./EmopickCard";

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

const EmopickListView = (data: Props) => {
  const isEmoLimit = !useMediaQuery({
    query: "(min-width: 1250px) or (max-width: 1023px)",
  });
  const router = useRouter();
  const [emopickList, setEmopickList] = useState<Props>(data);
  const [isDeskTop, isTablet, isMobile] = useIsResponsive();
  useEffect(() => {
    setEmopickList(data);
  }, []);
  return (
    <div>
      <div css={listWrapCSS({ isDeskTop, isTablet, isMobile }, isEmoLimit)}>
        {emopickList &&
          emopickList?.data?.content.map((emopick) => (
            <EmopickCard emopick={emopick} />
          ))}
      </div>
    </div>
  );
};

interface IsResponsive {
  isDeskTop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

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

export default EmopickListView;
