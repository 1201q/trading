import React, { useEffect, useRef, useState } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import styled from "styled-components";
import dayjs from "dayjs";

const LineChart = ({ candle, price }) => {
  const containerRef = useRef(null);
  const [lastindex, setLastIndex] = useState(0);
  useEffect(() => {
    let i = 0;
    candle.filter((data) => {
      if (!data.value) {
        i++;
      }
    });
    setLastIndex(144 - i);
  }, [price]);

  useEffect(() => {
    c();
    console.log(candle);
  }, [candle]);

  const c = () => {
    const chartOptions = {
      height: 100,
    };

    const chart = createChart(containerRef.current, chartOptions);
    const candlestickSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
      priceLineVisible: true,
    });

    candlestickSeries.update({ value: price, time: candle[lastindex] });

    // candlestickSeries.update({time:})

    chart.applyOptions({
      rightPriceScale: {
        visible: false,
      },

      timeScale: {
        visible: false,
        borderVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
        timeVisible: true,
        secondsVisible: false,
      },

      crosshair: {
        // vertLine: {
        //   visible: false,
        // },
        horzLine: {
          visible: false,
        },
      },

      grid: {
        vertLines: {
          visible: false,
        },
        horzLines: {
          visible: false,
        },
      },
    });

    chart.timeScale().fitContent();

    candlestickSeries.setData(candle);

    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;

    // Create and style the tooltip html element
    const toolTip = document.createElement("div");
    toolTip.style = `width: 100px; height: 70px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 12px; text-align: left; z-index: 1000; top: 12px; left: 12px; pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`;
    toolTip.style.background = "white";
    toolTip.style.color = "black";
    toolTip.style.borderColor = "rgba( 38, 166, 154, 1)";
    containerRef.current.appendChild(toolTip);

    // update tooltip
    chart.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > containerRef.clientWidth ||
        param.point.y < 0 ||
        param.point.y > containerRef.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        // time will be in the same format that we supplied to setData.
        // thus it will be YYYY-MM-DD
        const dateStr = param.time;
        toolTip.style.display = "block";
        const data = param.seriesData.get(candlestickSeries);
        const price = !data
          ? 0
          : `${String(Number(data.value).toLocaleString())}`;
        toolTip.innerHTML = `<div style="color: ${"rgba( 38, 166, 154, 1)"}">가격</div><div style="font-size: 15px; margin: 4px 0px; color: ${"black"}">
			${price}
			</div><div style="color: ${"black"}">
			${dayjs.unix(dateStr).add(-9, "h").format("M/D H:mm")}
			</div>`;

        const y = param.point.y;
        let left = param.point.x + toolTipMargin;
        if (left > containerRef.clientWidth - toolTipWidth) {
          left = param.point.x - toolTipMargin - toolTipWidth;
        }

        let top = y + toolTipMargin;
        if (top > containerRef.clientHeight - toolTipHeight) {
          top = y - toolTipHeight - toolTipMargin;
        }
        toolTip.style.left = left + "px";
        toolTip.style.top = top + "px";
      }
    });
  };

  return (
    <ChartContainer>
      <div ref={containerRef}></div>
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background: none;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  canvas {
    border-radius: 10px;
  }
`;

export default LineChart;
