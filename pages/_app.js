import "../styles/globals.css";
import "vis/dist/vis.min.css";
import { Layout } from '@/components/Layout';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import Nav from "@/components/Layout/Nav";
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider> 
       <Layout>
      <Nav />
      <Component {...pageProps} />
      <Toaster />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
