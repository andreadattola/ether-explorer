import { all } from "redux-saga/effects";
import login from "./login";
import registration from "./registration";
import updateUser from "./updateUser";
export default function* rootSaga() {
  yield all([...login, ...registration, ...updateUser]);
}
