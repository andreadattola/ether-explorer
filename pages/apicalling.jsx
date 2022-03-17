import * as React from "react";
import { useEffect, useState } from "react";
import { config } from "../config/index.config";
import { SelectApi } from "../components/SelectApi";
import { ParamInput } from "../components/ParamInput";
import { Button } from "@mui/material";
import * as styles from "../styles/ApiCalling.module.css";
import axios from "axios";
import { getRightDate } from "../utils/getRightDate";
import Chart from "../components/Chart";
import CustomPieChart from "../components/PieChart";
import { getCookieValue } from "../utils/getCookie";
import { useRouter } from "next/router";
import CsvDownload from "react-json-to-csv";
const ApiCalling = ({ users }) => {
  console.log("users", users);
  const apiEndpoints = Object.keys(config.api);
  const [apiSelected, setApiSelected] = useState("");
  const [requiredParams, setRequiredParams] = useState("");
  const [inputsValue, setInputsValue] = useState("");
  const [inputs, setInputs] = useState("");
  const [res, setRes] = useState("");
  const router = useRouter();
  useEffect(() => {
    const cookie = getCookieValue("etherLogin");
    console.log("cookie", cookie);
    if (!cookie) router.push("/login");
  }, []);
  const renderChart =
    res && apiSelected === "getInternalTransactionsListByAddress";
  const renderCharts = {
    getInternalTransactionsByTransactionHash: <CustomPieChart></CustomPieChart>,
  };
  const handleChange = (event) => {
    setApiSelected(event.target.value);
    setRes("");
  };
  const handleInputs = (event) => {
    const { value, name } = event.target;
    setInputsValue((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    if (!apiSelected) return;
    const objRequiredParams = config.api[apiSelected]()
      .split("&")
      .map((param, i) => {
        const valueAndkey = param.split("=");
        return { [valueAndkey[0]]: valueAndkey[1] };
      });
    const reduced = objRequiredParams.reduce((acc, item) => {
      return {
        ...acc,
        [Object.keys(item)]: Object.values(item).toLocaleString(),
      };
    }, {});
    delete reduced["https://api.etherscan.io/api?module"];
    delete reduced.action;
    setInputsValue(reduced);
    let inputs = Object.keys(reduced).map((paramKey) => (
      <ParamInput
        key={paramKey}
        name={paramKey}
        handleInputs={handleInputs}
        param={reduced[paramKey]}
      ></ParamInput>
    ));
    setInputs(inputs);
  }, [apiSelected]);
  const handleClick = () => {
    const paramValue = Object.keys(inputsValue).map((key) => inputsValue[key]);
    axios.get(config.api[apiSelected](...paramValue)).then((res) => {
      setRes(res.data);
    });
  };
  useEffect(() => {
    if (!res || apiSelected !== "getInternalTransactionsListByAddress") return;
    console.log("res", res);
    const { result: results } = res;
    results.map((res) => (res.timeStamp = getRightDate(+res.timeStamp)));
    console.log("res time stamp", res);
  }, [res]);
  const handleDownload =() =>{
    console.log('dati da scaricare', res)

  }
  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.wrapperInputs}>
          <SelectApi
            handleChange={handleChange}
            apis={apiEndpoints}
            apiSelected={apiSelected || "choose an Api"}
          ></SelectApi>
          {inputs && (
            <div>
              {" "}
              {inputs}
              <Button
                fullWidth
                onClick={handleClick}
                variant="contained"
                disabled={!inputs}
              >
                Invia
              </Button>
            </div>
          )}
        </div>

        {/* {res && <pre>{JSON.stringify(res, undefined, 2)}</pre>} */}
        {renderChart && <Chart data={res} />}

        {res && (
          <div style={{background : 'white'}}>
            {" "}
            <pre>{JSON.stringify(res, undefined, 2)}</pre>
            <CsvDownload data={res.result}>Json to CSV</CsvDownload>
          </div>
        )}
        {renderCharts[apiSelected]}
      </div>
    </React.Fragment>
  );
};
export default ApiCalling;
export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let users = await res.json();

  return {
    props: { users },
  };
}
