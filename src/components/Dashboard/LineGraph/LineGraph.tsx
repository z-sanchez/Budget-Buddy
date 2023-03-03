import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { GREY } from "../../../utils/constants";
import EllipsisIcon from "../../../../public/ellipsis-icon.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      grid: {
        display: false,
        tickWidth: 70,
      },
      ticks: {
        font: { family: "Arial", weight: "bolder" },
        color: "#000",
      },
    },
    y: {
      ticks: {
        font: { family: "Arial", weight: "bolder" },
        color: "#000",
      },
    },
  },
};

type LineGraphDataset = {
  label: string;
  data: number[];
  fill: boolean;
  borderColor: string;
  tension: number;
};

type LineGraphProps = {
  labels: string[];
  datasets: LineGraphDataset[];
};

const LineGraph = ({ data }: { data: LineGraphProps }) => {
  return (
    <div className="flex h-full w-full flex-col justify-start overflow-hidden px-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <p
            className="cursor-default text-xl font-light 2xl:text-2xl"
            style={{ color: GREY }}
          >
            Weekly Spend Habits
          </p>

          {data.datasets.map((dataset, index) => {
            return (
              <div className="ml-10 flex items-center" key={index}>
                <div
                  className="mx-3 h-4 w-4 rounded-3xl 2xl:h-5 2xl:w-5 2xl:rounded-2xl"
                  style={{ backgroundColor: dataset.borderColor }}
                ></div>
                <p
                  className="text-sm font-light 2xl:text-base"
                  style={{ color: GREY }}
                >
                  {dataset.label}
                </p>
              </div>
            );
          })}
        </div>

        <EllipsisIcon className="cursor-pointer"></EllipsisIcon>
      </div>
      <div className="my-auto h-[80%] w-10/12 self-center">
        {/* eslint-disable-next-line   */}
        {/*  @ts-ignore */}
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export { LineGraph };
