import { Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const [dataChart, setDataCharts] = React.useState({ loading: true });
  const [isOpen, setIsOpen] = React.useState(false)

  useEffect(() => {
    if (!props.data || props.data.result.length < 1) return;
    const data = [];
    const { result: results } = props.data;
    if (!results || results.length === 0) return;
    const gas = results?.map((data) => data.gas);
    const timeStamp = results.map((data) => data.timeStamp);
    gas.map((el, i) => {
      if (!timeStamp[i]) return;
      data.push({ date: timeStamp[i], gas: Number(el) });
    });
    setDataCharts(data);
  }, [props.data]);
  useEffect(() => {
    console.log("datachart", dataChart);
  }, [dataChart]);
  if (!props.data.result || props.data.result === "Invalid API Key")
    return <p>{props.results || "La ricerca non ha prodotto risultati"}</p>;
  if (dataChart.loading) return <div>Loading chart...</div>;
  return (
    <div style={{marginBottom : '4rem', width: '100%'}}>
      <Button style={{marginBottom: '1rem', margin: '1rem auto', display: 'flex'}} size="large" variant="contained" onClick={()=>setIsOpen(!isOpen)}>LineChart {' '}{!isOpen ? 'Click to Open': 'Click to Close'}</Button>
    {isOpen&&  <LineChart
        width={730}
        height={250}
        data={dataChart}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <Line type="monotone" dataKey="gas" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <Tooltip />
        <YAxis  dataKey="gas" />
        <Tooltip />
      </LineChart>}
    </div>
  );
};
export default Chart;
