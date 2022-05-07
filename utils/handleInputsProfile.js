import { TextField } from "@mui/material";
import * as styles from "../styles/Profile.module.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const handleInputsProfile = (
  input,
  user,
  register,
  handleClickShowPassword,
  values
) => {
  switch (input) {
    case "_id":
    case "session":
    case "expiredAt":
    case "createdAt":
    case "lastLogin":
      break;
    case "lastLogin":
      return (
        <div
          className={styles.wrapperInputs}
          key={new Date().getTime().toString() + input}
        >
          <label className={styles.label} disabled>
            {input}
          </label>
          <TextField
            {...register(input)}
            style={{ width: "65%" }}
            margin={"normal"}
            defaultValue={user[input]}
            disabled
          ></TextField>
        </div>
      );
      break;
    case "password":
      return (
        <div
          className={styles.wrapperInputs}
          key={new Date().getTime().toString() + input}
        >
          <label className={styles.label}>{input}</label>
          <TextField
            {...register(input)}
            style={{ width: "65%" }}
            margin={"normal"}
            type={values.showPassword ? "text" : "password"}
            defaultValue={user[input]}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"

                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          ></TextField>
        </div>
      );
    case "proPic":
      return (
        <div
          className={styles.wrapperInputs}
          key={new Date().getTime().toString() + input}
        >
          <label className={styles.label}>Profile Picture</label>
          <TextField
            {...register(input)}
            style={{ width: "65%" }}
            margin={"normal"}
            // defaultValue={user[input]}
            type="file"
            accept="image/*"
          ></TextField>
        </div>
      );
    default:
      return (
        <div
          className={styles.wrapperInputs}
          key={new Date().getTime().toString() + input}
        >
          <label className={styles.label}>{input}</label>
          <TextField
            {...register(input)}
            style={{ width: "65%" }}
            margin={"normal"}
            defaultValue={user[input]}
          ></TextField>
        </div>
      );
      break;
  }
};
