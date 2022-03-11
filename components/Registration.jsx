import React from "react";
import { useForm } from "react-hook-form";
import { handleInputErrors } from "../utils/handleInputErrors";
import axios from "axios";
import { Button, Input, Link, TextField } from "@mui/material";
import * as styles from "../styles/UserAuth.module.css";

export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [registrationStatus, setRegistrationStatus] = React.useState("");
  const onSubmit = async (data) => {
    //chiamata api login
    const isLoggedIn = await axios
      .post("/api/register", data)
      .then((dataRes) => setRegistrationStatus(dataRes.data))
      .catch((error) => {
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    if (!registrationStatus) return;
    console.log("registrationStatus", registrationStatus);
  }, [registrationStatus]);
  return (
    <form className={styles.formRegistration} onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <TextField
        placeholder="Email*"
        style={{ width: "65%" }}
        margin={"normal"}
        type="email"
        error={handleInputErrors(errors, "email").error}
        helperText={handleInputErrors(errors, "email").message}
        {...register("email", { required: true })}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <TextField
        placeholder="Password*"
        style={{ width: "65%" }}
        margin={"normal"}
        type="password"
        error={handleInputErrors(errors, "password").error}
        helperText={handleInputErrors(errors, "password").message}
        {...register("password", { required: true })}
      />
      <TextField
        style={{ width: "65%" }}
        margin={"normal"}
        placeholder="apiKey*"
        type="text"
        error={handleInputErrors(errors, "apiKey").error}
        helperText={handleInputErrors(errors, "apiKey").message}
        {...register("apiKey", { required: true })}
      />
      {/* errors will return when field validation fails  */}
      <div className={styles.formButtons}>
        <Button
          style={{ width: "65%", marginTop: "16px", marginBottom: "8px" }}
          variant="outlined"
          value="Accedi"
          type="submit"
          color="error"
        >
          Registrati
        </Button>
        <Link>Gia registrato? Accedi</Link>
      </div>
    </form>
  );
};
