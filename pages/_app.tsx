import "@vercel/examples-ui/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
console.log('pageProps', pageProps)
  return (
    <div title="Geolocation">
      <Component {...pageProps} />
    </div>
  );
}
