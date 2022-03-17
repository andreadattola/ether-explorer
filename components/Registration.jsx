import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Link, TextField } from "@mui/material";
import * as styles from "../styles/UserAuth.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { REGISTRATION } from "../redux/actions/registration";
import { LOGIN } from "../redux/actions/login";
export const Registration = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const registrationState = useSelector((state) => state.registration);
  const loginState = useSelector((state) => state.login);
  const onSubmit = async (data) => {
    dispatch({ type: REGISTRATION._REQUEST, data });
  };
  React.useEffect(() => {
    if (!registrationState) return;
    console.log("registrationState.succes", registrationState.success);
    if (registrationState.registrationError) {
      console.log("error");
      return setError("email", {
        type: "manual",
        message:
          registrationState.registrationError || "Qualcosa è andato storto!",
      });
    }
    if (registrationState.success) {
      console.log("registrationState.success", registrationState.success);
      const {
        user: { insertedId },
      } = registrationState;

      if (!insertedId) return;
      const data = { insertedId: insertedId };
      dispatch({ type: LOGIN._REQUEST, data });
    }
    /*   const date = new Date()
    const cookieData = {email: user.email, id : user._id, expiry: date.getDate() + 30}
    document.cookie = `etherLogin=${JSON.stringify(cookieData)}`
    router.push('/apicalling') */
  }, [registrationState]);
  useEffect(() => {
    console.log("selector", loginState);
    if (loginState.loginError) {
      return setError("email", {
        type: "manual",
        message: loginState.loginError || "Qualcosa è andato storto!",
      });
    }
    if (!loginState.loginError && loginState.success) {
      const { user } = loginState;
      const date = new Date();
      const cookieData = {
        email: user.email,
        id: user._id,
        expiry: date.getDate() + 30,
      };
      document.cookie = `etherLogin=${JSON.stringify(cookieData)}`;
      /*  router.push("/apicalling"); */
    }
  }, [loginState]);
  if (loginState.success)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        La registrazione è andata a buon fine, Verrai reindirizzato
        automaticamente alla landing. Se non dovesse succedere{" "}
        <Link href="/apicalling">clicca qua</Link>
      </div>
    );
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
      <TextField
        style={{ width: "65%" }}
        margin={"normal"}
        placeholder="apiKey*"
        type="text"
        error={errors["apiKey"] || false}
        helperText={errors["apiKey"]?.message}
        {...register("apiKey", { required: "This field is required!" })}
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
/* MONGODB_URI=mongodb+srv://andreaunipi:C!8gt_pNdtr.DyD@cluster0.apxyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority */
