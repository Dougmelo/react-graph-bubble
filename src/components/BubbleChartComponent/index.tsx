import BubbleChart from '@weknow/react-bubble-chart-d3';
import { useState } from 'react';
import { Coin } from '../../hooks/useBinanceBubbleContentSocket';

interface BubbleChartComponentProps extends Coin {
  color?: string;
  label?: string;
}

const BubbleChartComponent = ({data}:{data:BubbleChartComponentProps[]}) => {
  function isNegative(value:string){
    return true;
  }
  
  const renderData = data.map((coin:BubbleChartComponentProps) => {
   
    return {
      ...coin,
      value: coin.price,
      label: coin.symbol,
      color: '#61d661', 
    }
  })
  const font = {
    family: 'Arial',
    size: 12,
    color: "#fff",
    weight: "bold",
    lineColor: "transparent",
    lineWeight: 2,
  }
  
  const legendFont = {...font, color:"#000"}

  return <BubbleChart
            graph={{
              zoom: 0.6,
              offsetX: 1.5,
            }}
            width={550}
            height={600}
            padding={0}
            showLegend={false}
            legendPercentage={15}
            legendFont={legendFont}
            valueFont={font}
            labelFont={font}
            data={renderData}
          />
}

export default BubbleChartComponent;
