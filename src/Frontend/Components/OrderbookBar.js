import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

const OrderbookBar = ({ orderbookSumInfo, orderBookBarAnimationControl }) => {
  return (
    <div style={{ width: "100%", height: "40px" }}>
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
          enableLabel={true}
          enableGridY={false}
          enableGridX={false}
          labelTextColor="white"
          isInteractive={false}
          innerPadding={3}
          animate={orderBookBarAnimationControl ? true : false}
          colors={({ id }) => (id === "ask" ? "#1763b6" : "#e12343")} // datum prop 사용
        />
      )}
    </div>
  );
};

export default OrderbookBar;