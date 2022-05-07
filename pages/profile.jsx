import React from "react";
import useLogin from "../utils/isLoggedIn";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { handleInputsProfile } from "../utils/handleInputsProfile";
import * as styles from "../styles/UserAuth.module.css";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";
import { UPDATE_USER } from "../redux/actions/updateUser";

const Profile = () => {
  const isLoggedIn = useLogin();
  const router = useRouter();
  const [uiInputs, setUiInputs] = React.useState("");
  const { user } = isLoggedIn;
  const loginState = useSelector((state) => state.login);
  const [initialRender, setInitialRender] = React.useState(true);
  const updatedUser = useSelector((state) => state.updateUser);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm();
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });
  const handleClickShowPassword = (e) => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const dispatch = useDispatch();


  React.useEffect(() => {
    if (initialRender) return;
   
    if (isLoggedIn.success) {
      const ui = Object.keys(user).map((input, index) =>
        handleInputsProfile(
          input,
          user,
          register,
          handleClickShowPassword,
          values
        )
      );
    }else{
      //router.push('/login')
    }
    
    setUiInputs(ui);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, initialRender]);
  React.useEffect(() => {
    setInitialRender(false);
  }, []);
  React.useEffect(()=>{
    if(!initialRender){
      
      window.location.reload()
    }
  },[updatedUser])
  const onSubmit =  async  (data) => {
    let updateData = {}
    Object.keys(isLoggedIn.user).map((userKey, i)=>{
      isLoggedIn.user[userKey] !== data[userKey] ? updateData = {...updateData, [userKey] : data[userKey]} : null
    })
    Object.keys(updateData).forEach(key => updateData[key] === undefined ? delete updateData[key] : {});
    data ={...updateData, _id: isLoggedIn.user._id}
    console.log('data ups', data)
      dispatch({ type: UPDATE_USER._REQUEST, data });
  };

  return !uiInputs ? (
    <div> Loading...</div>
  ) : (
    <div className="container">
      <div className={styles.loginCard}>
        <div className={styles.leftSideLoginCard}>
          <p className={styles.leftSideLoginCardTitle}>I tuoi Dati</p>
          <p className={styles.leftSideLoginCardText}>
            Puoi cambiare i dati quando vuoi, il tuo ultimo accesso:{" "}
            {isLoggedIn.user.lastLogin}
          </p>
          <li className={(styles.liLoginCard, styles.leftSideLoginCardText)}>
            Create a ...
          </li>
          <li className={(styles.liLoginCard, styles.leftSideLoginCardText)}>
            Create a ...
          </li>
          <li className={(styles.liLoginCard, styles.leftSideLoginCardText)}>
            Create a ...
          </li>
        </div>
        <div className={styles.RightSideLoginCard}>
          <form style={{}} onSubmit={handleSubmit(onSubmit)}>
            {uiInputs}
            <div className={styles.formButtons}>
              <Button
                style={{ width: "50%", marginTop: "16px", marginBottom: "8px" }}
                variant="outlined"
                value="Accedi"
                type="submit"
                color="error"
              >
                Aggiorna i dati
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
