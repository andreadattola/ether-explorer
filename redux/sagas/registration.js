import { call, put, takeLatest } from "redux-saga/effects";
import { REGISTRATION } from "../actions/registration";
import { setPayloadRegistration } from "../payload/registration";
import axios from "axios";

function* Registration({ data }) {
  const user = data;
  try {
    const body = setPayloadRegistration(user);
    console.log("body", body);
    const res = yield call((args) => axios.post("/api/register", args), body);
    console.log("res", res);
    if (!res)
      throw new Error({
        error: "CHIAMATA NON VALIDA",
        name: "error",
        message: "chiamata non valida",
      });
    const { data } = res;
    if (data.error) throw data;

    yield put({ type: REGISTRATION._SUCCESS, data });
  } catch (error) {
    yield put({ type: REGISTRATION._ERROR, error });

    console.log("sagas > REGISTRATION > RegistrationApi", error);
  } finally {
  }
}

function* RegistrationWatcher() {
  yield takeLatest(REGISTRATION._REQUEST, Registration);
}

export default [RegistrationWatcher()];
