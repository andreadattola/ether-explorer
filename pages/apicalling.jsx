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
import { WrapperDownloadButtons } from "../components/WrapperDownloadButtons";
import { GraphUI } from "../components/Graph";
import { JsonTable } from "../components/Table";
import { useCurrentUser } from "@/lib/user";

const ApiCalling = ({ users }) => {
  console.log("users", users);
  const apiEndpoints = Object.keys(config.api);
  const [apiSelected, setApiSelected] = useState("");
  const [requiredParams, setRequiredParams] = useState("");
  const [inputsValue, setInputsValue] = useState("");
  const [inputs, setInputs] = useState("");
  const [res, setRes] = useState("");
  const router = useRouter();

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  useEffect(() => {
    if (isValidating) return;
    if (!user) router.replace('/login');
  }, [user, router, isValidating]);
  const renderChart =
    res && apiSelected === "getInternalTransactionsListByAddress";
  const renderCharts = {
    getInternalTransactionsByTransactionHash: <CustomPieChart></CustomPieChart>,
    getListOfERC20TokenTransferEvents: <GraphUI res={res} />,
  };
  const handleChange = (event) => {
    console.log("change", event);
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
      .map((param) => {
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
  
    user?.apiKey ? reduced.apikey = user?.apiKey : null
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
    console.log("paramvalue", paramValue);
    axios.get(config.api[apiSelected](...paramValue)).then((res) => {
      setRes(res.data);
    });
  };
  useEffect(() => {
    if (!res || apiSelected !== "getInternalTransactionsListByAddress") return;

    const { result: results } = res;
    results.map((res) => (res.timeStamp = getRightDate(+res.timeStamp)));
    console.log("res time stamp", res);
  }, [apiSelected, res]);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <div className={styles.wrapperInputs}>
          <SelectApi
            handleChange={handleChange}
            apis={apiEndpoints}
            apiSelected={apiSelected || "choose an EndPoint"}
          ></SelectApi>
          {inputs && (
            <div className="try">
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

        {renderChart && <Chart data={res} />}

        {res && (
          <div style={{ background: "white" }}>
            <JsonTable results={res.result} />
            <WrapperDownloadButtons
              result={res?.result}
              apiSelected={apiSelected}
            />
          </div>
        )}
        {renderCharts[apiSelected]}
      </div>
    </React.Fragment>
  );
};
export default ApiCalling;
/* export async function getServerSideProps() {
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
} */
