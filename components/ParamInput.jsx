import { Input, InputLabel, FormControl, FormHelperText } from "@mui/material";

export const ParamInput = (props) => {
  if (!props.param) return <p>This api endpoints not need any param</p>;

  return (
    <>
      <FormControl style={{ display: "block" }} variant="standard">
        <InputLabel
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "rgb(46, 241, 176)",
          }}
          htmlFor="component-helper"
        >
          {props.name}
        </InputLabel>
        <Input
          name={props.name}
          fullWidth
          color="primary"
          style={{ color: "#fff" }}
          id={props.name}
          onChange={props.handleInputs}
          defaultValue={props.param}
        />
        <FormHelperText id="component-helper-text">
          {props.helperText}
        </FormHelperText>
      </FormControl>
    </>
  );
};
