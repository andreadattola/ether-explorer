import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import React from "react";
import useLogin from "../utils/isLoggedIn";
export default function Home() {
  const isLogeddin = useLogin();

  return (
    <div className={styles.container}>
      <Head>
        <title>EtherExplorer </title>
        <meta name="ether-scan" content="ether scan generetade by next" />
      </Head>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
