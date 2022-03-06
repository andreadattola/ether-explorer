import React, { useEffect } from "react";
import{ HorizontalBar } from "react-chartjs-2";
const Chart = (props) => {
  const [dataChart, setDataCharts] = React.useState("");
  
  const { result: results } = props.data;
  const gas = results.map((data) => data.gas);
  const timeStamp = results.map((data) => data.timeStamp);

  const data = {
    labels: timeStamp,
    datasets: [
      {
        label: "Dataset",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgb(11,227,210)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,0,54,0.4)",
        hoverBorderColor: "rgb(0,88,101)",
        data: gas,
      },
    ],
  };
  React.useEffect(() => {
    setDataCharts(data);
  }, []);
  return (
    <div>
      <h2>Horizontal Bar Example</h2>
      <HorizontalBar data={dataChart} width={400} height={400} />
    </div>
  );
};
export default Chart;
