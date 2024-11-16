import "@/styles/globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function App({ Component, pageProps }) {

  return (
    <>
      <Component {...pageProps} />
      <GoogleAnalytics gaId="G-8XNNM225DV" />
    </>
  )
}