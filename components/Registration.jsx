import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Button, Link, TextField } from "@mui/material";
import * as styles from "../styles/UserAuth.module.css";
import { useRouter } from "next/router";

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
  const router = useRouter()
  const onSubmit = async (data) => {
    //chiamata api login
    const isLoggedIn = await axios
      .post("/api/register", data)
      .then((dataRes) => setRegistrationStatus(dataRes.data))
      .then(() => reset({ ...data }))
      .catch((error) => {
        console.log("error call", error.response?.data);
        const errorMessage = error.response?.data?.message
        setError("email", {
          type: "manual",
          message: errorMessage || 'Qualcosa è andato storto!',
        });
      });
  };
  React.useEffect(() => {
    if (!registrationStatus || !registrationStatus.success) return;
    const {registration, success, user} = registrationStatus
    const date = new Date()
    const cookieData = {email: user.email, id : user._id, expiry: date.getDate() + 30}
    document.cookie = `etherLogin=${JSON.stringify(cookieData)}`
    router.push('/apicalling')
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
        error={errors["password"]|| false}
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
