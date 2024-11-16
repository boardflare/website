import "@/styles/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'
import { useRouter } from "next/router";
import Head from "next/head";

export default function App({ Component, pageProps }) {

  const router = useRouter();
  const p = router.asPath.slice(1);
  const canonicalURL = `https://www.boardflare.com/${p}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-8XNNM225DV" />
    </>
  )
}