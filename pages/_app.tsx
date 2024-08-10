import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {RecoilRoot} from "recoil";
import React from 'react';
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Analytics} from "@vercel/analytics/react"

const MyApp = ({Component, pageProps: {session, ...pageProps}}: AppProps) => {
    return (
            <RecoilRoot>
                <Component {...pageProps} />
                <Analytics/>
                <SpeedInsights/>
            </RecoilRoot>
    );
};

export default MyApp;