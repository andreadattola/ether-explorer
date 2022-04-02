import React from "react";
import useLogin from "../utils/isLoggedIn";
import { useRouter } from "next/router";

const Profile = () => {
  const isLoggedIn = useLogin();
  const router = useRouter();

  if(!isLoggedIn.success) return router.push('/login')
  return <div>c</div>;
};

export default Profile;
