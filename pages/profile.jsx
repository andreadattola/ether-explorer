import React from "react";
import useLogin from "../utils/isLoggedIn";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { handleInputsProfile } from "../utils/handleInputsProfile";

const Profile = () => {
  const isLoggedIn = useLogin();
  const router = useRouter();
  const [uiInputs, setUiInputs] = React.useState("");
  const createInputsUi = () => {
    const { user } = isLoggedIn;
    console.log("USER", user);
    const uiInputs = Object.keys(user).map((input, index) =>
      handleInputsProfile(input, user)
    );

    setUiInputs(uiInputs);
  };
  React.useEffect(() => {
    if (!isLoggedIn.success) return router.push("/login");
  }, []);
  React.useEffect(() => {
    if (!isLoggedIn.success || !isLoggedIn.user) return;

    createInputsUi();
  }, [isLoggedIn]);

  if (!uiInputs) return <p>Loading...</p>;
  return <div>{uiInputs}</div>;
};

export default Profile;
