/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getToken } from "@/api/instance";
import { getEmopickList } from "@/api/emopick/getEmopickList";
import { useIsResponsive } from "@/components/Responsive/useIsResponsive";

type emopickInfoType = {
  writerInfo: {
    userId: number;
    nickname: string;
    profileImg: string;
  };
  emopickId: number;
  title: string;
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
  return (
    <div>
      {/* <div css={innerCSS({ isDeskTop, isTablet, isMobile })}>
        <div>
          <h2>EMOPICK</h2>
          <div>이모작 유저들의 추천 리스트를 만나보세요</div>
        </div>
        <div>
          {emopickList &&
            emopickList.data.content.map((emo, idx) => (
              <div key={idx} onClick={() => onClickBox(emo.emopickId)}>
                <div>
                  <div>{emo.emopickId}</div>
                  <div>{emo.title}</div>
                  <div>{emo.createdDate}</div>
                  <div>{emo.modifiedDate}</div>
                </div>
                <div>
                  <div>{emo.writerInfo.nickname}</div>
                  <div>
                    <img src={emo.writerInfo.profileImg} alt="profile" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div> */}
      <div css={serviceCSS}>서비스 준비중입니다.</div>
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
    ${isDeskTop && "margin: 20px 105px"}
    ${isTablet && "margin: 20px 50px"}
    ${isMobile && "margin: 20px 20px"}
  `;
};

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
