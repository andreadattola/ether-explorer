import { all } from "redux-saga/effects";
import login from "./login";
import registration from "./registration";
export default function* rootSaga() {
  yield all([...login, ...registration]);
}
