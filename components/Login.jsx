import React from 'react';
import { Button, Input, Link, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as styles from "../styles/UserAuth.module.css";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [loginStatus, setLoginStatus] = React.useState("");
  const router = useRouter()
  const onSubmit = async (data) => {
    //chiamata api login
    const isLoggedIn = await axios
      .post("/api/login", data)
      .then((dataRes) => setLoginStatus(dataRes.data))
      .then(() => reset({ ...data }))
      .catch((error) => {
        console.log("error call", error.response?.data);
        const errorMessage = error.response?.data?.message;
        setError("email", {
          type: "manual",
          message: errorMessage || "Qualcosa è andato storto!",
        });
      });
  };
  useEffect(() => {
    if (!loginStatus) return;
    const { success, user } = loginStatus;
    const date = new Date()
    const cookieData = {
      email: user.email,
      id: user._id,
      expiry: date.getDate() + 30,
    };
    document.cookie = `etherLogin=${JSON.stringify(cookieData)}`;
    router.push("/apicalling");
  }, [loginStatus]);
  return (
    <form className={styles.formRegistration} onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <TextField
        placeholder="Email*"
        style={{ width: "65%" }}
        margin={"normal"}
        type="email"
        error={errors["email"] || false}
        helperText={errors["email"]?.message}
        {...register("email", { required: "This field is required!" })}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <TextField
        placeholder="Password*"
        style={{ width: "65%" }}
        margin={"normal"}
        type="password"
        error={errors["password"] || false}
        helperText={errors["password"]?.message}
        {...register("password", { required: "This field is required!" })}
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
          Accedi
        </Button>
        <Link>Non hai un account? Registrati</Link>
      </div>
    </form>
  );
};
