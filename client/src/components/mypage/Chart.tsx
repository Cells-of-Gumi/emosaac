/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import getMyStatic from "@/api/mypage/getMyStatic";
import { returnMyLikeProps } from "@/api/mypage/getMyStatic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartProps = {
  typeCode: number;
};

const Chart = (props: ChartProps) => {
  const [genreData, setGenreData] = useState<returnMyLikeProps>([]);
  const router = useRouter();
  useEffect(() => {
    getMyStatic(props.typeCode).then((res) => {
      const data = res;
      if (data !== null) {
        // console.log(data);
        setGenreData(data); // 데이터를 상태에 저장
      }
    });
  }, [props.typeCode]);
  // 각자의 양
  const series: number[] = genreData.map((item) => item.count);
  // console.log(series);
  const label: string[] = genreData.map((item) => item.genreName);
  const options: ApexOptions = {
    chart: {
      width: 500,
      type: "pie",
    },
    labels: label,
    legend: {
      position: "right",
      labels: {
        colors: "var(--text-color)",
      },
    },
    responsive: [
      {
        // 반응형 기준되는 viewport 너비
        breakpoint: 600,
        options: {
          // breakpoint에서 차트 크기
          chart: {
            width: 400,
          },
        },
      },
    ],
  };

  return (
    <div id="chart" css={chartCSS}>
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={400}
      />
    </div>
  );
};
const chartCSS = css`
  & > div > div > div {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    /* background-color: yellow !important; */
  }
`;

export default Chart;
