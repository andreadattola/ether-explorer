import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import * as styles from "../styles/ApiCalling.module.css";

export const SelectApi = (props) => {
  const options =
    props.apis &&
    props.apis.map((api, i) => (
      <MenuItem key={api + i} value={api}>
        {api}
      </MenuItem>
    ));
  return (
    <FormControl style={{marginBottom : '1rem'}} fullWidth>
      <InputLabel className={styles.textInputLabel} id="demo-simple-select-label">
        {props.apiSelected}
      </InputLabel>
      <Select
        className={styles.textInput}
        labelId="apiSelect"
        id="apiSelect"
        value={props.apiSelected}
        label="Api too calling"
        onChange={props.handleChange}
      >
        {options}
      </Select>
    </FormControl>
  );
};
