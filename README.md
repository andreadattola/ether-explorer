This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



old reg
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Link, TextField } from "@mui/material";
import * as styles from "../styles/UserAuth.module.css";
import toast from 'react-hot-toast';
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { REGISTRATION } from "../redux/actions/registration";
import { useCurrentUser } from "@/lib/user";
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
  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
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
      toast.success('Your account has been created');
      router.replace('/');
    }

  }, [registrationState, mutate]); 
  useEffect(() => {
    if (isValidating) return;
    if (user) router.replace('/home');
  }, [user, router, isValidating]);
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
