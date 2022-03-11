import { Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { handleInputErrors } from "../utils/handleInputErrors";
import axios from "axios";

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    //chiamata api login
    const isLoggedIn = await axios
      .post("/api/login", data)
      .then((dataRes) => console.log("data res", dataRes.data))
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <TextField
        error={handleInputErrors(errors, "username").error}
        helperText={handleInputErrors(errors, "username").message}
        {...register("username", { required: true })}
      />

      {/* include validation with required or other standard HTML validation rules */}
      <TextField
        error={handleInputErrors(errors, "password").error}
        helperText={handleInputErrors(errors, "password").message}
        {...register("password", { required: true })}
      />

      {/* errors will return when field validation fails  */}

      <Input value="Accedi" type="submit" />
    </form>
  );
};
