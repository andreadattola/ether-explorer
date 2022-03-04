import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";


export const SelectApi = (props) => {
 
  const options =
    props.apis &&
    props.apis.map((api, i) => (
      <MenuItem key={api + i} value={api}>
        {api}
      </MenuItem>
    ));
  return (
    <FormControl variant={"standard"} fullWidth style={{ width: "480px" , margin : '0 auto'}}>
      <InputLabel id="demo-simple-select-label">{props.apiSelected}</InputLabel>
      <Select
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
