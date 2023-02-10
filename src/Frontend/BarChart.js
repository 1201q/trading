import * as React from "react";
import { ResponsiveBar } from "@nivo/bar";

const Barchart = ({ hoga, color, max, reverse }) => {
  return (
    <div style={{ width: "100%", height: "90%" }}>
      <ResponsiveBar
        data={[{ price: (hoga / max) * 100 }]}
        layout="horizontal"
        keys={["price"]}
        colors={[color]}
        colorBy="id"
        isInteractive={false}
        enableGridY={false}
        enableLabel={false}
        axisRight={null}
        axisLeft={null}
        axisBottom={null}
        reverse={reverse}
        animate={false}
        minValue={0}
        maxValue={100}
        valueScale={{ type: "symlog" }}
      />
    </div>
  );
};

export default Barchart;
