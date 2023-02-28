import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import styled from "styled-components";

const BongChart = ({ price, candleData, volume }) => {
  const chartContainerRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [candleStickSeries, setCandleStickSeries] = useState(null);
  const [volumeSeries, setVolumeSeries] = useState(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chartObj = createChart(chartContainerRef.current, {
        height: 280,
      });

      const candleStickSeriesObj = chartObj.addCandlestickSeries({
        upColor: "#E12343",
        downColor: "#1763B6",
        borderVisible: false,
        wickUpColor: "#E12343",
        wickDownColor: "#1763B6",

        priceFormat: {
          type: "price",
          minMove: 0.0001,
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
    if (candleData && volume && candleStickSeries && volumeSeries) {
      candleStickSeries.setData(candleData);
      volumeSeries.setData(volume);
    }
  }, [candleData, volume]);

  useEffect(() => {
    if (candleData.length !== 0) {
      if (candleStickSeries) {
        const lastData = candleData[candleData.length - 1];

        if (lastData) {
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
      }
    }
  }, [price]);

  return (
    <CoinInfoContainer>
      <Chart ref={chartContainerRef}></Chart>
    </CoinInfoContainer>
  );
};

const CoinInfoContainer = styled.div`
  margin: 0px 20px 0px 20px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: white;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Chart = styled.div`
  margin-right: 0px;
`;

export default BongChart;
