import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const data = [
  {
    subject: "Daewoo",
    Daewoo: 123,
    physicsColor: "hsl(205, 70%, 50%)",
  },
  {
    subject: "Kohistan",
    Kohistan: 148,
    chemsitryColor: "hsl(177, 70%, 50%)",
  },
  {
    subject: "Faisal Movers",
    Faisal_Movers: 57,
    biologyColor: "hsl(257, 70%, 50%)",
  },
  {
    subject: "Bilal Travellers",
    Bilal_Travellers: 87,
    englishColor: "hsl(157, 70%, 50%)",
  },
];

const BarChart = () => (
  <div className="bg-main h-60 lg:px-8 py-3 rounded-xl lg:w-1/2">
    <ResponsiveBar
      data={data}
      keys={["Bilal_Travellers", "Faisal_Movers", "Daewoo", "Kohistan"]}
      indexBy="subject"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "dark2" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "physics",
          },
          id: "dots",
        },
        {
          match: {
            id: "english",
          },
          id: "lines",
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Companies",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Buses",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={(e) =>
        e.id + ": " + e.formattedValue + " in subject: " + e.indexValue
      }
    />
  </div>
);

export default BarChart;