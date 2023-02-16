import React, { useEffect, useRef, useState } from "react";
import { createChart, PriceScaleMode } from "lightweight-charts";
import styled from "styled-components";
import dayjs from "dayjs";

const BongChart = ({ price, test, volume }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [candleStickSeries, setCandleStickSeries] = useState(null);
  const [volumeSeries, setVolumeSeries] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartObj = createChart(chartContainerRef.current, {
        height: 250,
      });

      const candleStickSeriesObj = chartObj.addCandlestickSeries({
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

      const volumeSeriesObj = chartObj.addHistogramSeries({
        priceFormat: {
          type: "volume",
        },
        priceScaleId: "",
      });

      volumeSeriesObj.priceScale().applyOptions({
        scaleMargins: {
          top: 0.8,
          bottom: 0,
        },
      });

      chartObj.applyOptions({
        layout: {
          fontSize: 10,
        },
        rightPriceScale: {
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
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
      setVolumeSeries(volumeSeriesObj);
      setCandleStickSeries(candleStickSeriesObj);
    }
  }, []);

  useEffect(() => {
    if (test && volume && candleStickSeries && volumeSeries) {
      candleStickSeries.setData(test);
      volumeSeries.setData(volume);
    }
  }, [test, volume]);

  useEffect(() => {
    if (candleStickSeries) {
      const lastData = test[test.length - 1];

      if (lastData.high < price) {
        lastData.high = price;
      } else if (lastData.low > price) {
        lastData.low = price;
      }

      candleStickSeries.update({
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
        <Chart ref={chartContainerRef}></Chart>
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
  margin: 0px 0px 0px 0px;
  padding: 15px 15px 5px 15px;
  margin-top: 10px;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #eeeeee;
  width: 87%;
  max-width: 420px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Chart = styled.div`
  margin-right: -10px;
`;

export default BongChart;
