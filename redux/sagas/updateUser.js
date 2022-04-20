import { call, put, takeLatest } from "redux-saga/effects";
import { UPDATE_USER } from "../actions/updateUser";
import { setPayloadUpdateUser } from "../payload/updateUser";
import axios from 'axios'

function* UpdateUser({ data }) {
  const user = data;
  try {
    const body = setPayloadUpdateUser(user);
    console.log("body", body);
    const res = yield call((args) => axios.post("/api/updateUser", args), body);
    console.log("res", res);
    if (!res)
      throw new Error({
        error: "CHIAMATA NON VALIDA",
        name: "error",
        message: "chiamata non valida",
      });
    const { data } = res;
    if (data.error) throw data;

    yield put({ type: UPDATE_USER._SUCCESS, data });
  } catch (error) {
    yield put({ type: UPDATE_USER._ERROR, error });

    console.log("sagas > UpdateUser > UpdateUserApi", error);
  } finally {
  }
}

function* UpdateUserWatcher() {
  yield takeLatest(UPDATE_USER._REQUEST, UpdateUser);
}

export default [UpdateUserWatcher()];
