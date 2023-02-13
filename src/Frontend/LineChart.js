import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import styled from "styled-components";

const LineChart = ({ candle }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    c();
  }, [candle]);

  const c = () => {
    const chartOptions = {
      height: 200,
      borderVisible: false,
    };
    const chart = createChart(containerRef.current, chartOptions);
    const candlestickSeries = chart.addLineSeries({
      color: "#2962FF",
    });

    chart.timeScale().applyOptions({
      barSpacing: 6,
      borderVisible: false,
    });
    chart.timeScale().fitContent();

    candlestickSeries.setData(candle);
  };

  return (
    <ChartContainer>
      <div ref={containerRef}></div>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  margin-top: 20px;
  border-radius: 10px;
  background: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export default LineChart;
