import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import React from 'react';
import {SpeedInsights} from "@vercel/speed-insights/next";
import { SessionProvider } from "next-auth/react"


const MyApp = ({Component, pageProps: { session, ...pageProps}}: AppProps) => {
    return (
        <RecoilRoot>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
            <SpeedInsights/>
        </RecoilRoot>
    );
};

export default MyApp;