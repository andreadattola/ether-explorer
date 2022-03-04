import { Input, InputLabel, FormControl, FormHelperText } from "@mui/material";
import * as styles from "../styles/ApiCalling.module.css";

export const ParamInput = (props) => {
  if (!props.param) return <p>This api endpoints not need any param</p>;

  return (
    <>
      <FormControl style={{marginBottom : '1rem'}} fullWidth className={styles.textInput} variant="standard">
        <InputLabel
          className={styles.textInputLabel}
          htmlFor="component-helper"
        >
          {props.name}
        </InputLabel>
        <Input
          className={styles.textInput}
          name={props.name}
          fullWidth
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
