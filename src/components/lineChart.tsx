import ReactECharts from "echarts-for-react";
import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import {  useEffect } from "react";

const LineChart = () => {
  const options = {
    grid: { top: 4, right: 0, bottom: 24, left: -100 },
    xAxis: {
      type: "category",
      data: [],
      axisLabel: {
        show: false, // Hide X axis labels
      },
      splitLine: {
        show: false, // Hide X axis grid lines
      },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        show: false, // Hide X axis labels
      },
      splitLine: {
        show: false, // Hide X axis grid lines
      },
    },
    tooltip: {
      trigger: "axis", // Show tooltip when hovering over data points
      // ... other tooltip configurations
    },

    series: [
      {
        animation: true,
        animationDuration: 1000, // Set the animation duration
        animationEasing: "cubicInOut",
        data: [540, 532, 101, 540, 532, 101, 264, 90, 340, 250],
        type: "line",
        showSymbol: false,
        smooth: 0.1,
        lineStyle: {
          color: "white",
          width: 4, // Hide series line
        },
        areaStyle: {
          opacity: 0.8,
          color: "#1DA6BB",
        },
      },
    ],
  };

  const runApp = async () => {
    await Moralis.start({
      apiKey: "YOUR_API_KEY",
      // ...and any other configuration
    });

    const historicalPrice = [];

    const address = "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0";

    const chain = EvmChain.ETHEREUM;

    for (let toBlock = 16323500; toBlock < 16323550; toBlock += 10) {
      const response = await Moralis.EvmApi.token.getTokenPrice({
        address,
        chain,
        toBlock,
      });

      historicalPrice.push(response?.toJSON());
    }

    console.log(historicalPrice)
  };

  useEffect(() => {
    runApp();
  }, []);

  return (
    <ReactECharts
      style={{
        height: 150,
        width: 900,
      }}
      option={options}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default LineChart;
