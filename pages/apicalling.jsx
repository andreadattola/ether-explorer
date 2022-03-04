import * as React from "react";
import { useEffect, useState } from "react";
import { config } from "../config/index.config";
import { SelectApi } from "../components/SelectApi";
import { ParamInput } from "../components/ParamInput";
import { Button } from "@mui/material";
import axios from 'axios'
const ApiCalling = () => {
  const apiEndpoints = Object.keys(config.api);
  const [apiSelected, setApiSelected] = useState("");
  const [requiredParams, setRequiredParams] = useState("");
  const [inputsValue, setInputsValue] = useState("");
  const [inputs, setInputs] = useState("");
  const [res, setRes] = useState('')
  const handleChange = (event) => {
    setApiSelected(event.target.value);
  };
  // function for inputs param
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
    delete reduced.action 
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
const handleClick = () =>{
    console.log('inputs value', inputsValue)
   
    const paramValue = Object.keys(inputsValue).map(key => inputsValue[key])
    console.log("🚀 ~ file: ApiCalling.jsx ~ line 55 ~ handleClick ~ paramValue", paramValue)
    console.log('url', config.api[apiSelected](...paramValue))
    axios.get(config.api[apiSelected](...paramValue)).then(res =>{
       setRes(res.data)
    })
}
  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#9c8bd8",
          height: "600px",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "2rem" }}>
          <SelectApi
            handleChange={handleChange}
            apis={apiEndpoints}
            apiSelected={apiSelected || "choose an Api"}
          ></SelectApi>
          {inputs && <div className="container-inputs">{inputs}</div>}
          <div style={{ margin: "1rem auto" }}>
            <Button 
            onClick = {handleClick}
              style={{ width: "480px" }}
              variant="contained"
              disabled={!inputs}
            >
              Invia
            </Button>
          </div>
          {res && <pre>{JSON.stringify(res, undefined, 2)}</pre>}
        </div>
      </div>
    </React.Fragment>
  );
};
export default ApiCalling;
