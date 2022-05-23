import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter()
useEffect(()=>{
router.replace('/home')
},[router])
  return (
    <div className={styles.container}>
      <Head>
        <title>EtherExplorer </title>
        <meta name="ether-scan" content="ether scan generetade by next" />
      </Head>

      <Link href={'/home'}>Home</Link>
    </div>
  );
}
