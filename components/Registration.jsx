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
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const [registrationStatus, setRegistrationStatus] = React.useState("");
  const onSubmit = async (data) => {
    //chiamata api login
    const isLoggedIn = await axios
      .post("/api/register", data)
      .then((dataRes) => setRegistrationStatus(dataRes.data))
      .then(() => reset({ ...data }))
      .catch((error) => {
        console.log("error call", error);
        setError("email", {
          type: "manual",
          message: error.message,
        });
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
        helperText={errors["email"]?.message}
        {...register("email", { required: "This field is required!" })}
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
          style={{ width: "50%", marginTop: "16px", marginBottom: "8px" }}
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
