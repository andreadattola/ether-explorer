import "../styles/globals.css";
import "vis/dist/vis.min.css";


import { Provider } from "react-redux";
import store from "../redux/store/store";
import { HeaderTab } from "../components/HeaderTab";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <HeaderTab></HeaderTab>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
