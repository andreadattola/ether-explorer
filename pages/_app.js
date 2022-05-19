import "../styles/globals.css";
import "vis/dist/vis.min.css";
import { Toaster } from 'react-hot-toast';
import { HeaderTab } from "../components/HeaderTab";
function MyApp({ Component, pageProps }) {
  return (
    <>
      <HeaderTab />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
