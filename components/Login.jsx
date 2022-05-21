import React from "react";
import { Button, Link, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as styles from "../styles/UserAuth.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions/login";
import { useCurrentUser } from "@/lib/user";

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const router = useRouter();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const onSubmit = async (data) => {
    dispatch({ type: LOGIN._REQUEST, data });
  };
  useEffect(() => {
    console.log('user swr', )
    if (isValidating) return;
    if (user) router.replace('/');
  }, [user, router, isValidating]);
  
  useEffect(() => {
    if (loginState.loginError) {
      return setError("email", {
        type: "manual",
        message: loginState.loginError || "Qualcosa è andato storto!",
      });
    }
    if(!loginState.loginError && loginState.success){
      router.replace('/home')
    }
  }, [loginState]);

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
        <Link href="/register">Non hai un account? Registrati</Link>
      </div>
    </form>
  );
};
