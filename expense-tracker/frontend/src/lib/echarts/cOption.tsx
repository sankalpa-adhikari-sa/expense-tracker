"use client";
import { Card } from "@/components/ui/card";
import Echarts from "@/lib/echarts/echarts";

type CoptionsType = {
  data: any;
  category_type: string;
};
type optionType = echarts.EChartsOption;
function Coptions(props: CoptionsType) {
  const option: optionType = {
    dataset: [
      {
        id: `${props.category_type}`,
        dimensions: ["category", "amount"],
        source: props.data,
      },
    ],

    legend: {
      left: "center",
      top: "top",
    },

    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },

    series: [
      {
        name: `${props.category_type}`,
        type: "bar",
        label: {
          show: true,
          position: "top",
        },
        emphasis: {
          focus: "series",
        },
        encode: {
          x: "category",
          y: "amount",
        },
      },
    ],
    yAxis: [
      {
        name: `${props.category_type}`,
        type: "value",
      },
    ],
    xAxis: [
      {
        name: "Category",
        type: "category",
      },
    ],
  };
  return (
    <Card className="w-full  h-[540px]">
      {props.data.length > 0 ? (
        <>
          {/* @ts-ignore */}
          <Echarts option={option} />
        </>
      ) : (
        <p>No Records Available</p>
      )}
    </Card>
  );
}

export default Coptions;
