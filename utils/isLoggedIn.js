import React from "react";
import react from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../redux/actions/login";
import { getCookieValue } from "./getCookie";

const useLogin = () => {
  const isLoggedIn = useSelector((state) => state.login);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (isLoggedIn.success) return isLoggedIn;
    const cookie = getCookieValue("etherLogin");
    if (!cookie ) {
      if(window.location.pathname !=='/login') return window.location.href = '/login'
    } else {
      if (JSON.parse(cookie).id)
        dispatch({
          type: LOGIN._REQUEST,
          data: { _id: JSON.parse(cookie).id },
        });
    }
  }, []);
  return isLoggedIn;
};
export default useLogin;
