import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Chart = (props) => {
  
  const [dataChart, setDataCharts] = React.useState({ loading: true });

  useEffect(() => {
    if (!props.data || props.data.result.length < 1) return;
    const data = [];
    const { result: results } = props.data;
    if(!results || results.length === 0) return
    const gas = results?.map((data) => data.gas);
    const timeStamp = results.map((data) => data.timeStamp);
    gas.map((el, i) => {
      if (!timeStamp[i]) return;
      data.push({ date: timeStamp[i], gas: Number(el) });
    });
    setDataCharts(data);
  }, [props.data]);
  if(!props.results || props.data.results === 'Invalid API Key') return <p>{props.results || 'La ricerca non ha prodotto risultati'}</p>
  if (dataChart.loading) return <div>Loading chart...</div>;
  return (
    <div>
      <h2>LineChart</h2>
      <LineChart
        width={600}
        height={300}
        data={dataChart}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line type="monotone" dataKey="gas" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis dataKey='gas'/>
        <Tooltip />
      </LineChart>
    </div>
  );
};
export default Chart;
