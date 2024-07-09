"use client";
import Echarts from "@/lib/echarts/echarts";

type PieChartOptionType = {
  data: any;
  cashflow_type: string;
  title: string;
};
type optionType = echarts.EChartsOption;
function PieChartOption(props: PieChartOptionType) {
  const option: optionType = {
    dataset: [
      {
        id: `${props.cashflow_type}`,
        dimensions: ["category", "amount"],
        source: props.data,
      },
    ],
    tooltip: {
      trigger: "item",
      formatter: function (props) {
        let tooltipContent =
          //@ts-ignore
          props.seriesName +
          "<br>" +
          //@ts-ignore
          props.marker +
          //@ts-ignore
          props.value["category"] +
          " : " +
          " Rs. " +
          //@ts-ignore
          props.value["amount"] +
          "<br> Allotment : " +
          //@ts-ignore
          props.percent +
          " %";
        return tooltipContent;
      },
    },
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
        name: `${props.cashflow_type}`,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },

        label: {
          formatter: function (props) {
            //@ts-ignore
            return props.name + " (Rs. " + props.value.amount + ") ";
          },
        },
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

export default PieChartOption;
