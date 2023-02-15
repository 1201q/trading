import React, { useEffect, useRef, useState } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import styled from "styled-components";
import dayjs from "dayjs";

const BongChart = ({ candle, price, test }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [series, setSeries] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartObj = createChart(chartContainerRef.current, {
        height: 300,
      });
      const seriesObj = chartObj.addCandlestickSeries({
        upColor: "#E12343",
        downColor: "#1763B6",
        borderVisible: false,
        wickUpColor: "#E12343",
        wickDownColor: "#1763B6",

        priceFormat: {
          type: "price",
          precision: 1,
          minMove: 1,
        },
      });

      chartObj.applyOptions({
        rightPriceScale: {
          scaleMargins: {
            top: 0.05,
            bottom: 0.05,
          },
          borderVisible: true,
          borderColor: "#e5e9ea",
        },

        timeScale: {
          fixLeftEdge: true,
          borderColor: "#e5e9ea",
        },
      });

      setChart(chartObj);
      setSeries(seriesObj);
    }
  }, []);

  useEffect(() => {
    if (test && series) {
      series.setData(test);
    }
  }, [test]);

  useEffect(() => {
    if (series) {
      const lastData = test[test.length - 1];

      if (lastData.high < price) {
        lastData.high = price;
      } else if (lastData.low > price) {
        lastData.low = price;
      }

      series.update({
        open: lastData.open,
        high: lastData.high,
        low: lastData.low,
        close: price,
        time: lastData.time,
      });
    }
  }, [price]);

  return (
    <Center>
      <CoinInfoContainer>
        <div ref={chartContainerRef}> </div>
      </CoinInfoContainer>
    </Center>
  );
};

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CoinInfoContainer = styled.div`
  margin: 0px 0px;
  padding: 15px 0px 5px 15px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #eeeeee;
  width: 87%;
  max-width: 435px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export default BongChart;
