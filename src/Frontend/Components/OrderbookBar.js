import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveBullet } from "@nivo/bullet";
import styled from "styled-components";
import { formatter } from "../Context/FormatterContext";

const OrderbookBar = ({ orderbookSumInfo, orderBookBarAnimationControl }) => {
  return (
    <Bar>
      {typeof orderbookSumInfo[1] === "number" && (
        <ResponsiveBar
          data={[
            {
              ask: orderbookSumInfo[1].toFixed(3),
              bid: orderbookSumInfo[2].toFixed(3),
            },
          ]}
          keys={["ask", "bid"]}
          indexBy={["ask", "bid"]} // indexBy prop 수정
          layout="horizontal"
          valueScale={{ type: "linear" }}
          axisTop={null}
          axisRight={null}
          enableLabel={false}
          enableGridY={false}
          enableGridX={false}
          labelTextColor="white"
          isInteractive={false}
          innerPadding={3}
          animate={false}
          colors={({ id }) => (id === "ask" ? "#E3F2FF" : "#FFEFF1")} // datum prop 사용
          borderRadius={5}
        />
      )}
      <AskBidContainer>
        <AskBidBox AlignStartOrEnd={"flex-start"}>
          <AskBidText fontColor={"#3c87e5"}>매도잔량</AskBidText>
          <AskBidText fontColor={"#3c87e5"}>
            {formatter(orderbookSumInfo[1])}
          </AskBidText>
        </AskBidBox>
        <AskBidBox AlignStartOrEnd={"flex-end"}>
          <AskBidText fontColor={"#cd614d"}>매수잔량</AskBidText>
          <AskBidText fontColor={"#cd614d"}>
            {formatter(orderbookSumInfo[2])}
          </AskBidText>
        </AskBidBox>
      </AskBidContainer>
    </Bar>
  );
};

const Bar = styled.div`
  height: 50px;
  width: 100%;
  position: relative;
`;

const AskBidContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  background: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const AskBidBox = styled.div`
  padding: 1px 13px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.AlignStartOrEnd};
  justify-content: center;
  height: 100%;
`;

const AskBidText = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.fontColor};
`;

export default OrderbookBar;
