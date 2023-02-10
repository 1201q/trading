import React, { useEffect, useState } from "react";
import { init, dispose } from "klinecharts";
import styled from "styled-components";

// https://klinecharts.com/guide/style

export default function Chart({ price, dayCandle }) {
  let options = {
    candle: {
      bar: {
        upColor: "#C84A31",
        downColor: "#1261C4",
      },
      tooltip: {
        showRule: "follow_cross",
        showType: "standard",
      },
    },
    indicator: {
      bars: [
        {
          upColor: "#E3A498",
          downColor: "#88B0E1",
          style: "fill",
        },
      ],
    },
  };

  useEffect(() => {
    console.log("리렌더");
    const chart = init("simple_chart");

    chart.createIndicator("MA", true, { id: "candle_pane" });
    // chart.createIndicator("VOL");
    chart.setStyles(options);
    chart.applyNewData(dayCandle);

    return () => {
      dispose("simple_chart");
    };
  }, [dayCandle]);

  return (
    <Center>
      <div
        id="simple_chart"
        style={{ height: 400, width: "100%", maxWidth: "450px" }}
      />
    </Center>
  );
}

const Center = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
