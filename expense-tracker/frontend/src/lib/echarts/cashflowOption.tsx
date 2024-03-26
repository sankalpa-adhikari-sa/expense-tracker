"use client";
import Echarts from "@/lib/echarts/echarts";

type CashflowOptionsType = {
  data: any;
  category_type: string;
};
type optionType = echarts.EChartsOption;
function CashflowOptions(props: CashflowOptionsType) {
  const option: optionType = {
    dataset: [
      {
        id: `${props.category_type}`,
        dimensions: ["transaction_date", "amount"],
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
          x: "transaction_date",
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
        name: "Transaction Date",
        type: "time",
      },
    ],
  };
  return (
    <div className="w-full h-[540px]">
      {props.data.length > 0 ? (
        <>
          {/* @ts-ignore */}
          <Echarts option={option} />
        </>
      ) : (
        <p>No Records Available</p>
      )}
    </div>
  );
}

export default CashflowOptions;
