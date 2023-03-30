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
      // chart.width는 차트의 전체적인 가로 크기를 지정하는 것이고,
      width: "100%",
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
        breakpoint: 1024,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart" css={chartCSS}>
      {/* <ReactApexChart>에 있는 width는 그려진 차트를 포함하는 부모 요소의 가로 크기에 맞게 조정할 때 사용됩니다. */}
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={"100%"}
        // height={"100%"}
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
  width: 100%;
  height: auto;
`;

export default Chart;
