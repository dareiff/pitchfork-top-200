// import App from 'next/app'
import { AppProps } from "next/app";

import PlausibleProvider from "next-plausible";
import "../src/styles.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider
            domain="https://2010s.online"
            customDomain="https://io.fun-club.xyz"
            selfHosted={true}
        >
            <Component {...pageProps} />
        </PlausibleProvider>
    );
}
