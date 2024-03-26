"use client";
import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import darkmode from "@/lib/echarts/dark-theme.json";
import { useTheme } from "@/components/theme-provider";

interface EchartsProps {
  option: echarts.EChartsOption;
}
export default function Echarts({ option }: EchartsProps) {
  const { theme } = useTheme();
  const chartRef = useRef<HTMLDivElement | null>(null); // Reference to the DOM element

  const [_, setChartInstance] = useState<echarts.ECharts | null>(null); // Reference to the ECharts instance

  useEffect(() => {
    // Initialize the ECharts instance when it's not available
    echarts.registerTheme("dark", darkmode);
    const chart = echarts.init(chartRef.current, theme);
    // Set the ECharts instance in the state
    setChartInstance(chart);
    // Set the chart option
    chart.setOption(option);
    // Add the resize event listener
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);
    // Cleanup the ECharts instance on unmount
    return () => {
      window.removeEventListener("resize", handleResize); // Remove the resize listener
      chart.dispose(); // Dispose of the ECharts instance
    };
  }, [option, theme]);

  return <div ref={chartRef} className="w-full h-full" />;
}
