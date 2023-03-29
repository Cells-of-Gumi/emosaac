/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartProps = {};

const Chart = (props: ChartProps) => {
  // 각자의 양
  const series: number[] = [10, 10, 10, 10];

  const options: ApexOptions = {
    chart: {
      width: 500,
      type: "pie",
    },
    labels: ["무협", "현판", "로맨스", "미스테리"],
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
