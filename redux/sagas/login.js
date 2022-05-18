import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN } from "../actions/login";
import { setPayloadLogin } from "../payload/login";
import axios from 'axios'

function* Login({ data }) {
  const user = data;
  try {
    const body = setPayloadLogin(user);
    console.log("body", body);
    const res = yield call((args) => axios.post("/api/auth", args), body);
    console.log("res!!", res);
    if (!res)
      throw new Error({
        error: "CHIAMATA NON VALIDA",
        name: "error",
        message: "chiamata non valida",
      });
    const { data } = res;
    if (data.error) throw data;
      
    yield put({ type: LOGIN._SUCCESS, data });
  } catch (error) {
    yield put({ type: LOGIN._ERROR, error });

    console.log("sagas > login > LoginApi", error);
  } finally {
  }
}

function* LoginWatcher() {
  yield takeLatest(LOGIN._REQUEST, Login);
}

export default [LoginWatcher()];
