import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import * as styles from "../styles/select.module.css";
import { getApiName } from "../utils/getApiName";

export const SelectApi = (props) => {
  const options =
    props.apis &&
    props.apis.map((api, i) => (
      <MenuItem key={api + i} value={api}>
        {getApiName(api)} 
      </MenuItem>
    ));
  return (
    <FormControl className={styles.form} fullWidth>
      <InputLabel className={styles.textInputLabel} id="demo-simple-select-label">
        {getApiName(props.apiSelected)}
      </InputLabel>
      <Select
        className={styles.select}
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
