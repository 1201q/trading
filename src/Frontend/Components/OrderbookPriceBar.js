import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

const OrderbookPriceBar = ({ hoga, color, max, reverse }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveBar
        data={[{ price: (hoga / max) * 100 }]}
        layout="horizontal"
        keys={["price"]}
        colors={[color]}
        colorBy="id"
        isInteractive={false}
        enableGridY={false}
        enableLabel={false}
        borderRadius={4}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}
        reverse={reverse}
        animate={true}
        minValue={0}
        maxValue={100}
        valueScale={{ type: "symlog" }}
      />
    </div>
  );
};

export default OrderbookPriceBar;
